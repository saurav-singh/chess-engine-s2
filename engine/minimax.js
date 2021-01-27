const REDUCER = 1;
const POS_INF = Number.POSITIVE_INFINITY;
const NEG_INF = Number.NEGATIVE_INFINITY;

const minimax = (game, depth = 2) => {
    depth = Math.min(depth, 3);
    return maximize(game, depth, NEG_INF, POS_INF);
}


const maximize = (game, depth, alpha, beta) => {

    let R = { move: "", value: NEG_INF };

    // Check endgame state
    if (depth == 0 || game.game_over()) {
        const current_board = ChessBoard.fenToObj(game.fen());
        const eval = evaluation(current_board, game);
        // R.value = (eval.black_pieces - eval.white_pieces) * REDUCER;
        R.value = eval.score * REDUCER; 
        return R;
    }

    let actions = game.moves().sort((a, b) => 0.5 - Math.random());

    for (let i = 0; i < actions.length; i++) {

        const move = actions[i];
        game.move(move);
        let d = minimize(game, depth - 1, alpha, beta);
        game.undo();

        if (d.value > R.value) {
            R.move = move;
            R.value = d.value * REDUCER;
            alpha = Math.max(alpha, R.value);
        }

        if (beta <= alpha) break;
    }

    return R;
}

const minimize = (game, depth, alpha, beta) => {

    let R = { move: "", value: POS_INF };

    // Check endgame state
    if (depth == 0 || game.game_over()) {
        const current_board = ChessBoard.fenToObj(game.fen());
        const eval = evaluation(current_board, game);
        // R.value = (eval.black_pieces - eval.white_pieces) * REDUCER;
        R.value = eval.score * REDUCER; 
        return R;
    }

    let actions = game.moves().sort((a, b) => 0.5 - Math.random());

    // Compute minimax for each action
    for (let i = 0; i < actions.length; i++) {

        const move = actions[i];
        game.move(move);
        let d = maximize(game, depth - 1, alpha, beta);
        game.undo();

        if (d.value < R.value) {
            R.move = move;
            R.value = d.value * REDUCER;
            beta = Math.min(beta, R.value);
        }

        if (beta <= alpha) break;
    }

    return R;
}