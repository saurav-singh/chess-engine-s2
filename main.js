$(document).ready(() => start());

// Change Difficulty | Depth 
const changeDepth = () => start(parseInt($('#depth').find(":selected").text()));

// Reset Game
const resetGame = () => start();

// Update evaluation bar
const updateEvalBar = (score) => {
  const $evalBar = $('#eval-bar');
  const $evalValue = $('#eval-value');

  // Clamp score to reasonable range for display
  const clampedScore = Math.max(-10, Math.min(10, score / 100));

  // Convert score to percentage (0-100%)
  // Score of 0 = 50%, positive favors white, negative favors black
  const percentage = 50 + (clampedScore * 5);

  $evalBar.css('width', percentage + '%');

  // Format display value
  let displayValue;
  if (Math.abs(score) > 900) {
    displayValue = score > 0 ? 'White winning' : 'Black winning';
  } else {
    displayValue = (score / 100).toFixed(1);
  }

  $evalValue.html(displayValue);
}

// Update move history display
const updateMoveHistory = (pgn) => {
  const $moveHistory = $('#move-history');
  const moves = pgn.split(/\d+\./).filter(m => m.trim());

  let html = '';
  moves.forEach((movePair, index) => {
    const [whiteMove, blackMove] = movePair.trim().split(/\s+/);
    html += `<div class="move-pair">`;
    html += `<span class="move-number">${index + 1}.</span>`;
    html += `<span class="move">${whiteMove || ''}</span>`;
    html += `<span class="move">${blackMove || ''}</span>`;
    html += `</div>`;
  });

  $moveHistory.html(html);
  // Auto-scroll to bottom
  $moveHistory.scrollTop($moveHistory[0].scrollHeight);
}

// Start Game
const start = (depth = 2, AI_color = "b") => {
  let board = null;
  let game = new Chess();
  let $status = $('#status');
  let $fen = $('#fen');

  const onDragStart = (source, piece, position, orientation) => {
    if (game.game_over() ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1))
      return false
  }



  const onSnapEnd = () => board.position(game.fen());

  const onDrop = (source, target) => {

    // Check if this is a pawn promotion
    const piece = game.get(source);
    let promotionPiece = 'q'; // Default to queen

    if (piece && piece.type === 'p' &&
        ((piece.color === 'w' && target[1] === '8') ||
         (piece.color === 'b' && target[1] === '1'))) {
      // Ask user for promotion piece
      promotionPiece = prompt('Promote to (q/r/b/n):', 'q') || 'q';
      promotionPiece = promotionPiece.toLowerCase();
      if (!['q', 'r', 'b', 'n'].includes(promotionPiece)) {
        promotionPiece = 'q'; // Default to queen for invalid input
      }
    }

    let move = game.move({
      from: source,
      to: target,
      promotion: promotionPiece
    });

    // Illegal Move
    if (move === null) return 'snapback'

    updateStatus();

    // AI moves
    window.setTimeout(aiMove, 250);

  }

  const aiMove = () => {
    if (game.turn() == AI_color) {
      let d = minimax(game, depth);
      game.move(d.move);
      onSnapEnd();
      updateStatus();
    }

    // Update evaluation display
    const current_board = ChessBoard.fenToObj(game.fen());
    const eval = evaluation(current_board, game, AI_color);
    updateEvalBar(eval.score);

  }

  const updateStatus = () => {
    let status = ''

    let moveColor = 'White'
    if (game.turn() === 'b') {
      moveColor = 'Black'
    }

    // checkmate?
    if (game.in_checkmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.'
    }

    // draw?
    else if (game.in_draw()) {
      status = 'Game over, drawn position'
    }

    // game still on
    else {
      status = moveColor + ' to move'

      // check?
      if (game.in_check()) {
        status += ', ' + moveColor + ' is in check'
      }
    }

    $status.html(status)
    $fen.html(game.fen())

    // Update move history
    updateMoveHistory(game.pgn());

    // Update evaluation
    const current_board = ChessBoard.fenToObj(game.fen());
    const eval = evaluation(current_board, game, AI_color);
    updateEvalBar(eval.score);
  }

  var onMouseoutSquare = function (square, piece) {
    removeGreySquares();
  };

  var onMouseoverSquare = function (square, piece) {
    var moves = game.moves({
      square: square,
      verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
      greySquare(moves[i].to);
    }
  };

  const removeGreySquares = () => {
    $('#myBoard .square-55d63').css('background', '');
  }

  const greySquare = (square) => {
    var squareEl = $('#myBoard .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
      background = '#696969';
    }

    squareEl.css('background', background);
  }

  let config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd,
  }

  board = ChessBoard('myBoard', config)

  updateStatus()
}
