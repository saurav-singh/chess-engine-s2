// Weights for pieces
const weights = { 'p': 10, 'n': 30, 'b': 30, 'r': 50, 'q': 90, 'k': 1, 'k_e': 1 };

// Weights for white position
const pos_white = {
    'p': [
        [100, 100, 100, 100, 105, 100, 100, 100],
        [78, 83, 86, 73, 102, 82, 85, 90],
        [7, 29, 21, 44, 40, 31, 44, 7],
        [-17, 16, -2, 15, 14, 0, 15, -13],
        [-26, 3, 10, 9, 6, 1, 0, -23],
        [-22, 9, 5, -11, -10, -2, 3, -19],
        [-31, 8, -7, -37, -36, -14, 3, -31],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    'n': [
        [-66, -53, -75, -75, -10, -55, -58, -70],
        [-3, -6, 100, -36, 4, 62, -4, -14],
        [10, 67, 1, 74, 73, 27, 62, -2],
        [24, 24, 45, 37, 33, 41, 25, 17],
        [-1, 5, 31, 21, 22, 35, 2, 0],
        [-18, 10, 13, 22, 18, 15, 11, -14],
        [-23, -15, 2, 0, 2, 0, -23, -20],
        [-74, -23, -26, -24, -19, -35, -22, -69]
    ],
    'b': [
        [-59, -78, -82, -76, -23, -107, -37, -50],
        [-11, 20, 35, -42, -39, 31, 2, -22],
        [-9, 39, -32, 41, 52, -10, 28, -14],
        [25, 17, 20, 34, 26, 25, 15, 10],
        [13, 10, 17, 23, 17, 16, 0, 7],
        [14, 25, 24, 15, 8, 25, 20, 15],
        [19, 20, 11, 6, 7, 6, 20, 16],
        [-7, 2, -15, -12, -14, -15, -10, -10]
    ],
    'r': [
        [35, 29, 33, 4, 37, 33, 56, 50],
        [55, 29, 56, 67, 55, 62, 34, 60],
        [19, 35, 28, 33, 45, 27, 25, 15],
        [0, 5, 16, 13, 18, -4, -9, -6],
        [-28, -35, -16, -21, -13, -29, -46, -30],
        [-42, -28, -42, -25, -25, -35, -26, -46],
        [-53, -38, -31, -26, -29, -43, -44, -53],
        [-30, -24, -18, 5, -2, -18, -31, -32]
    ],
    'q': [
        [6, 1, -8, -104, 69, 24, 88, 26],
        [14, 32, 60, -10, 20, 76, 57, 24],
        [-2, 43, 32, 60, 72, 63, 43, 2],
        [1, -16, 22, 17, 25, 20, -13, -6],
        [-14, -15, -2, -5, -1, -10, -20, -22],
        [-30, -6, -13, -11, -16, -11, -16, -27],
        [-36, -18, 0, -19, -15, -15, -21, -38],
        [-39, -30, -31, -13, -31, -36, -34, -42]
    ],
    'k': [
        [4, 54, 47, -99, -99, 60, 83, -62],
        [-32, 10, 55, 56, 56, 55, 10, 3],
        [-62, 12, -57, 44, -67, 28, 37, -31],
        [-55, 50, 11, -4, -19, 13, 0, -49],
        [-55, -43, -52, -28, -51, -47, -8, -50],
        [-47, -42, -43, -79, -64, -32, -29, -32],
        [-4, 3, -14, -50, -57, -18, 13, 4],
        [17, 30, -3, -14, 6, -1, 40, 18]
    ],

    // Endgame King Table
    'k_e': [
        [-50, -40, -30, -20, -20, -30, -40, -50],
        [-30, -20, -10, 0, 0, -10, -20, -30],
        [-30, -10, 20, 30, 30, 20, -10, -30],
        [-30, -10, 30, 40, 40, 30, -10, -30],
        [-30, -10, 30, 40, 40, 30, -10, -30],
        [-30, -10, 20, 30, 30, 20, -10, -30],
        [-30, -30, 0, 0, 0, 0, -30, -30],
        [-50, -30, -30, -30, -30, -30, -30, -50]
    ]
};

// Weights for black position
const pos_black = {
    'p': pos_white['p'].slice().reverse(),
    'n': pos_white['n'].slice().reverse(),
    'b': pos_white['b'].slice().reverse(),
    'r': pos_white['r'].slice().reverse(),
    'q': pos_white['q'].slice().reverse(),
    'k': pos_white['k'].slice().reverse(),
    'k_e': pos_white['k_e'].slice().reverse()
}

// Map chessboard position to array
const boardToArray = {
    a8: [0, 0], b8: [0, 1], c8: [0, 2], d8: [0, 3], e8: [0, 4], f8: [0, 5], g8: [0, 6], h8: [0, 7],
    a7: [1, 0], b7: [1, 1], c7: [1, 2], d7: [1, 3], e7: [1, 4], f7: [1, 5], g7: [1, 6], h7: [1, 7],
    a6: [2, 0], b6: [2, 1], c6: [2, 2], d6: [2, 3], e6: [2, 4], f6: [2, 5], g6: [2, 6], h6: [2, 7],
    a5: [3, 0], b5: [3, 1], c5: [3, 2], d5: [3, 3], e5: [3, 4], f5: [3, 5], g5: [3, 6], h5: [3, 7],
    a4: [4, 0], b4: [4, 1], c4: [4, 2], d4: [4, 3], e4: [4, 4], f4: [4, 5], g4: [4, 6], h4: [4, 7],
    a3: [5, 0], b3: [5, 1], c3: [5, 2], d3: [5, 3], e3: [5, 4], f3: [5, 5], g3: [5, 6], h3: [5, 7],
    a2: [6, 0], b2: [6, 1], c2: [6, 2], d2: [6, 3], e2: [6, 4], f2: [6, 5], g2: [6, 6], h2: [6, 7],
    a1: [7, 0], b1: [7, 1], c1: [7, 2], d1: [7, 3], e1: [7, 4], f1: [7, 5], g1: [7, 6], h1: [7, 7],
}
// Helper function to calculate Manhattan distance between two squares
const getManhattanDistance = (pos1, pos2) => {
    const p1 = boardToArray[pos1];
    const p2 = boardToArray[pos2];
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

// Helper function to get distance from center (for pushing king to edges)
const getDistanceFromCenter = (pos) => {
    const px = boardToArray[pos];
    const centerRow = 3.5;
    const centerCol = 3.5;
    return Math.abs(px[0] - centerRow) + Math.abs(px[1] - centerCol);
}

// Evaluate pawn structure
const evaluatePawnStructure = (board) => {
    let whiteScore = 0;
    let blackScore = 0;

    // Track pawns by file
    const whitePawns = {};
    const blackPawns = {};

    // Collect all pawns
    for (let pos in board) {
        const piece = board[pos];
        if (piece[1].toLowerCase() === 'p') {
            const file = pos[0];
            const rank = parseInt(pos[1]);

            if (piece[0] === 'w') {
                if (!whitePawns[file]) whitePawns[file] = [];
                whitePawns[file].push({ pos, rank });
            } else {
                if (!blackPawns[file]) blackPawns[file] = [];
                blackPawns[file].push({ pos, rank });
            }
        }
    }

    // Evaluate white pawns
    for (let file in whitePawns) {
        const pawns = whitePawns[file];

        // Doubled pawns penalty
        if (pawns.length > 1) {
            whiteScore -= 10 * (pawns.length - 1);
        }

        pawns.forEach(pawn => {
            // Check if passed pawn (no enemy pawns ahead on same or adjacent files)
            const adjacentFiles = [String.fromCharCode(file.charCodeAt(0) - 1),
                                   file,
                                   String.fromCharCode(file.charCodeAt(0) + 1)];

            let isPassed = true;
            for (let adjFile of adjacentFiles) {
                if (blackPawns[adjFile]) {
                    for (let enemyPawn of blackPawns[adjFile]) {
                        if (enemyPawn.rank > pawn.rank) {
                            isPassed = false;
                            break;
                        }
                    }
                }
                if (!isPassed) break;
            }

            if (isPassed) {
                // Bonus increases as pawn gets closer to promotion
                whiteScore += (pawn.rank - 1) * 10;
            }

            // Check if isolated pawn (no friendly pawns on adjacent files)
            const leftFile = String.fromCharCode(file.charCodeAt(0) - 1);
            const rightFile = String.fromCharCode(file.charCodeAt(0) + 1);
            if (!whitePawns[leftFile] && !whitePawns[rightFile]) {
                whiteScore -= 8; // Isolated pawn penalty
            }
        });
    }

    // Evaluate black pawns
    for (let file in blackPawns) {
        const pawns = blackPawns[file];

        // Doubled pawns penalty
        if (pawns.length > 1) {
            blackScore -= 10 * (pawns.length - 1);
        }

        pawns.forEach(pawn => {
            // Check if passed pawn
            const adjacentFiles = [String.fromCharCode(file.charCodeAt(0) - 1),
                                   file,
                                   String.fromCharCode(file.charCodeAt(0) + 1)];

            let isPassed = true;
            for (let adjFile of adjacentFiles) {
                if (whitePawns[adjFile]) {
                    for (let enemyPawn of whitePawns[adjFile]) {
                        if (enemyPawn.rank < pawn.rank) {
                            isPassed = false;
                            break;
                        }
                    }
                }
                if (!isPassed) break;
            }

            if (isPassed) {
                // Bonus increases as pawn gets closer to promotion
                blackScore += (8 - pawn.rank) * 10;
            }

            // Check if isolated pawn
            const leftFile = String.fromCharCode(file.charCodeAt(0) - 1);
            const rightFile = String.fromCharCode(file.charCodeAt(0) + 1);
            if (!blackPawns[leftFile] && !blackPawns[rightFile]) {
                blackScore -= 8; // Isolated pawn penalty
            }
        });
    }

    return { white: whiteScore, black: blackScore };
}

// Evaluation Function
const evaluation = (board, game = null, ai_color = "b") => {

    // Handle game over states first
    if (game && game.game_over()) {
        if (game.in_checkmate()) {
            // If it's our turn and we're in checkmate, we lost
            if (game.turn() === ai_color) {
                return { score: -10000 };
            } else {
                // Opponent is in checkmate, we won
                return { score: 10000 };
            }
        }
        // Draw
        return { score: 0 };
    }

    let score_white = 0;
    let score_black = 0;

    // Track material and piece positions
    let totalPieces = 0;
    let whiteMaterial = 0;
    let blackMaterial = 0;
    let whiteKingPos = null;
    let blackKingPos = null;
    let hasWhiteQueen = false;
    let hasBlackQueen = false;

    // Evaluate material and position for each piece
    for (let pos in board) {
        const piece = board[pos];
        const type = piece[1].toLowerCase();
        const pieceValue = weights[type];
        const px = boardToArray[pos];

        totalPieces++;

        // Track kings and queens
        if (type === 'k') {
            if (piece[0] === 'b') blackKingPos = pos;
            else whiteKingPos = pos;
        }
        if (type === 'q') {
            if (piece[0] === 'b') hasBlackQueen = true;
            else hasWhiteQueen = true;
        }

        // Use correct piece-square table for each piece type
        if (piece[0] === 'b') {
            blackMaterial += pieceValue;
            score_black += pieceValue;
            score_black += (pieceValue * pos_black[type][px[0]][px[1]]) / 100;
        } else {
            whiteMaterial += pieceValue;
            score_white += pieceValue;
            score_white += (pieceValue * pos_white[type][px[0]][px[1]]) / 100;
        }
    }

    // Detect endgame: queens traded or low material
    const isEndgame = !hasWhiteQueen && !hasBlackQueen || totalPieces <= 10;

    // ENDGAME BONUSES - Critical for checkmate ability
    if (isEndgame && game) {
        // Determine who is winning
        const materialDiff = whiteMaterial - blackMaterial;

        if (Math.abs(materialDiff) > 3) { // Someone has significant material advantage
            const winningColor = materialDiff > 0 ? 'w' : 'b';
            const losingColor = materialDiff > 0 ? 'b' : 'w';
            const losingKingPos = losingColor === 'b' ? blackKingPos : whiteKingPos;

            // 1. Push losing king to edge/corner
            const edgeBonus = (7 - getDistanceFromCenter(losingKingPos)) * 10;

            // 2. Bring winning pieces closer to losing king
            let proximityBonus = 0;
            for (let pos in board) {
                const piece = board[pos];
                if (piece[0] === winningColor && piece[1].toLowerCase() !== 'k') {
                    const distance = getManhattanDistance(pos, losingKingPos);
                    proximityBonus += (14 - distance) * 2; // Reward pieces being close
                }
            }

            // 3. King opposition bonus (bring winning king closer)
            const winningKingPos = winningColor === 'b' ? blackKingPos : whiteKingPos;
            const kingDistance = getManhattanDistance(winningKingPos, losingKingPos);
            const kingProximityBonus = (14 - kingDistance) * 5;

            const totalEndgameBonus = edgeBonus + proximityBonus + kingProximityBonus;

            if (winningColor === 'w') {
                score_white += totalEndgameBonus;
            } else {
                score_black += totalEndgameBonus;
            }
        }
    }

    // Mobility bonus: reward having more legal moves
    if (game) {
        const moves = game.moves();
        const mobilityBonus = moves.length * 0.1;

        if (game.turn() === 'b') {
            score_black += mobilityBonus;
        } else {
            score_white += mobilityBonus;
        }

        // Add check penalty
        if (game.in_check()) {
            if (game.turn() === 'b') {
                score_black -= 50;
            } else {
                score_white -= 50;
            }
        }
    }

    // Bonus for controlling center squares in opening/middlegame
    if (!isEndgame && totalPieces > 12) {
        const centerSquares = ['d4', 'd5', 'e4', 'e5'];
        centerSquares.forEach(sq => {
            if (board[sq]) {
                const bonus = 5;
                if (board[sq][0] === 'b') {
                    score_black += bonus;
                } else {
                    score_white += bonus;
                }
            }
        });
    }

    // Evaluate pawn structure
    const pawnStructure = evaluatePawnStructure(board);
    score_white += pawnStructure.white;
    score_black += pawnStructure.black;

    // Calculate final score from AI perspective
    let finalScore;
    if (ai_color === "b") {
        finalScore = score_black - score_white;
    } else {
        finalScore = score_white - score_black;
    }

    return {
        score: finalScore,
    }
}