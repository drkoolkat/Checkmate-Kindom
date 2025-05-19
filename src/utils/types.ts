
export enum PieceType {
  Pawn = 'p',
  Knight = 'n',
  Bishop = 'b',
  Rook = 'r',
  Queen = 'q',
  King = 'k'
}

export enum PieceColor {
  White = 'w',
  Black = 'b'
}

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface ChessPosition {
  row: number;
  col: number;
}

export interface ChessMove {
  from: ChessPosition;
  to: ChessPosition;
  promotion?: PieceType;
}

export interface GameState {
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  isStalemate: boolean;
  isGameOver: boolean;
  turn: PieceColor;
}
