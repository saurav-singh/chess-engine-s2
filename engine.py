import chess

FEN = "rnbqkbnr/pppppppp/8/8/3P4/3P4/PPP2PPP/RN1B1BNR"

board = chess.Board()

board.set_board_fen(FEN)

print(board)

print(board.is_valid())