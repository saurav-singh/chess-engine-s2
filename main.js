let game = new Chess();

$(document).ready(() => start());

// Change Difficulty | Depth 
const changeDepth = () => start(parseInt($('#depth').find(":selected").text()));

// Reset Game
const resetGame = () => start();

// Start Game
const start = (depth = 2, AI_color = "b") => {
  let board = null;
  let game = new Chess();
  let $status = $('#status');
  let $fen = $('#fen');
  let $pgn = $('#pgn');

  const onDragStart = (source, piece, position, orientation) => {
    if (game.game_over() ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1))
      return false
  }



  const onSnapEnd = () => board.position(game.fen());

  const onDrop = (source, target) => {

    let move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
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

    const current_board = ChessBoard.fenToObj(game.fen());
    const eval = evaluation(current_board, game);
    console.log(eval);

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
    $pgn.html(game.pgn())
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
