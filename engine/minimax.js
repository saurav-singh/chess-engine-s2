const POS_INF = Number.POSITIVE_INFINITY;
const NEG_INF = Number.NEGATIVE_INFINITY;

// Move ordering: prioritize captures and checks for better pruning
const orderMoves = (game) => {
    const moves = game.moves({ verbose: true });

    // Score each move for ordering
    const scoredMoves = moves.map(move => {
        let score = 0;

        // Prioritize captures (MVV-LVA: Most Valuable Victim - Least Valuable Attacker)
        if (move.captured) {
            const victimValue = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0 };
            const attackerValue = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0 };
            score += 10 * victimValue[move.captured] - attackerValue[move.piece];
        }

        // Prioritize promotions
        if (move.promotion) {
            score += 8;
        }

        // Add slight randomness to break ties
        score += Math.random() * 0.1;

        return { move: move.san, score };
    });

    // Sort by score descending
    scoredMoves.sort((a, b) => b.score - a.score);
    return scoredMoves.map(m => m.move);
}

// Iterative deepening - search progressively deeper
const minimax = (game, targetDepth = 2) => {
    targetDepth = Math.min(targetDepth, 3); // Limit to depth 3 (quiescence adds more depth)

    let bestResult = { move: "", value: 0 };

    // Search depth 1, then 2, then 3, etc.
    for (let depth = 1; depth <= targetDepth; depth++) {
        const result = maximize(game, depth, NEG_INF, POS_INF);

        // Only update if we found a move
        if (result.move) {
            bestResult = result;
        }

        // If we found a forced mate, no need to search deeper
        if (Math.abs(result.value) > 9000) {
            break;
        }
    }

    return bestResult;
}


// Quiescence search - search captures until position is quiet
// Maximum depth for quiescence to avoid performance issues
const MAX_QUIESCENCE_DEPTH = 6;

const quiescence_maximize = (game, alpha, beta, depth = 0) => {
    // Evaluate current position
    const current_board = ChessBoard.fenToObj(game.fen());
    const standPat = evaluation(current_board, game).score;

    // Stand pat (don't make any capture)
    if (standPat >= beta || depth >= MAX_QUIESCENCE_DEPTH) {
        return standPat;
    }
    if (alpha < standPat) {
        alpha = standPat;
    }

    // Only search captures
    const captureMoves = game.moves({ verbose: true }).filter(m => m.captured);

    // Order captures by MVV-LVA
    const victimValue = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9 };
    captureMoves.sort((a, b) => {
        const scoreA = victimValue[a.captured] || 0;
        const scoreB = victimValue[b.captured] || 0;
        return scoreB - scoreA;
    });

    for (let move of captureMoves) {
        game.move(move);
        const score = quiescence_minimize(game, alpha, beta, depth + 1);
        game.undo();

        if (score >= beta) {
            return beta;
        }
        if (score > alpha) {
            alpha = score;
        }
    }

    return alpha;
}

const quiescence_minimize = (game, alpha, beta, depth = 0) => {
    // Evaluate current position
    const current_board = ChessBoard.fenToObj(game.fen());
    const standPat = evaluation(current_board, game).score;

    // Stand pat
    if (standPat <= alpha || depth >= MAX_QUIESCENCE_DEPTH) {
        return standPat;
    }
    if (beta > standPat) {
        beta = standPat;
    }

    // Only search captures
    const captureMoves = game.moves({ verbose: true }).filter(m => m.captured);

    // Order captures by MVV-LVA
    const victimValue = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9 };
    captureMoves.sort((a, b) => {
        const scoreA = victimValue[a.captured] || 0;
        const scoreB = victimValue[b.captured] || 0;
        return scoreB - scoreA;
    });

    for (let move of captureMoves) {
        game.move(move);
        const score = quiescence_maximize(game, alpha, beta, depth + 1);
        game.undo();

        if (score <= alpha) {
            return alpha;
        }
        if (score < beta) {
            beta = score;
        }
    }

    return beta;
}

const maximize = (game, depth, alpha, beta) => {

    let R = { move: "", value: NEG_INF };

    // Check endgame state
    if (game.game_over()) {
        const current_board = ChessBoard.fenToObj(game.fen());
        const eval = evaluation(current_board, game);
        R.value = eval.score;
        return R;
    }

    // At depth 0, enter quiescence search
    if (depth == 0) {
        R.value = quiescence_maximize(game, alpha, beta);
        return R;
    }

    // Use move ordering for better pruning
    let actions = orderMoves(game);

    for (let i = 0; i < actions.length; i++) {

        const move = actions[i];
        game.move(move);
        let d = minimize(game, depth - 1, alpha, beta);
        game.undo();

        if (d.value > R.value) {
            R.move = move;
            R.value = d.value;
            alpha = Math.max(alpha, R.value);
        }

        // Alpha-beta pruning
        if (beta <= alpha) break;
    }

    return R;
}

const minimize = (game, depth, alpha, beta) => {

    let R = { move: "", value: POS_INF };

    // Check endgame state
    if (game.game_over()) {
        const current_board = ChessBoard.fenToObj(game.fen());
        const eval = evaluation(current_board, game);
        R.value = eval.score;
        return R;
    }

    // At depth 0, enter quiescence search
    if (depth == 0) {
        R.value = quiescence_minimize(game, alpha, beta);
        return R;
    }

    // Use move ordering for better pruning
    let actions = orderMoves(game);

    // Compute minimax for each action
    for (let i = 0; i < actions.length; i++) {

        const move = actions[i];
        game.move(move);
        let d = maximize(game, depth - 1, alpha, beta);
        game.undo();

        if (d.value < R.value) {
            R.move = move;
            R.value = d.value;
            beta = Math.min(beta, R.value);
        }

        // Alpha-beta pruning
        if (beta <= alpha) break;
    }

    return R;
}