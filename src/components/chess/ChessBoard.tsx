import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Chess } from 'chess.js';
import ChessPiece from './ChessPiece';
import { PieceColor, ChessPosition, ChessMove } from '../../utils/types';

interface ChessJsMove {
  color: string;
  from: string;
  to: string;
  flags: string;
  piece: string;
  san: string;
  captured?: string;
  promotion?: string;
}

interface ChessBoardProps {
  onMove?: (move: ChessMove) => void;
  playerColor?: PieceColor;
  gameMode?: 'local' | 'online' | 'ai';
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  onMove, 
  playerColor = PieceColor.White,
  gameMode = 'local'
}) => {
  const [chess] = useState<Chess>(new Chess());
  const [board, setBoard] = useState<any[][]>([]);
  const [selectedPosition, setSelectedPosition] = useState<ChessPosition | null>(null);
  const [validMoves, setValidMoves] = useState<ChessPosition[]>([]);
  const [currentTurn, setCurrentTurn] = useState<PieceColor>(PieceColor.White);
  
  const windowWidth = Dimensions.get('window').width;
  const boardSize = Math.min(windowWidth, 400);
  const squareSize = boardSize / 8;

  useEffect(() => {
    updateBoard();
  }, []);

  const updateBoard = () => {
    const newBoard = chess.board();
    setBoard(newBoard);
    setCurrentTurn(chess.turn() === 'w' ? PieceColor.White : PieceColor.Black);
  };

  const handleSquarePress = (row: number, col: number) => {
    if (gameMode === 'online' && currentTurn !== playerColor) {
      return;
    }
    
    if (selectedPosition) {
      const from = {
        row: selectedPosition.row,
        col: selectedPosition.col
      };
      
      const to = { row, col };
      
      try {
        const moveResult = chess.move({
          from: algebraicNotation(from),
          to: algebraicNotation(to),
          promotion: 'q' // Auto-promote to queen for simplicity
        });
        
        if (moveResult) {
          updateBoard();
          
          if (onMove) {
            onMove({ from, to });
          }
          
          setSelectedPosition(null);
          setValidMoves([]);
        } else {
          const piece = getPieceAt(row, col);
          if (piece && (gameMode === 'local' || piece.color === playerColor)) {
            selectPiece(row, col);
          } else {
            setSelectedPosition(null);
            setValidMoves([]);
          }
        }
      } catch (e) {
        const piece = getPieceAt(row, col);
        if (piece && (gameMode === 'local' || piece.color === playerColor)) {
          selectPiece(row, col);
        } else {
          setSelectedPosition(null);
          setValidMoves([]);
        }
      }
    } else {
      const piece = getPieceAt(row, col);
      if (piece && (gameMode === 'local' || piece.color === playerColor)) {
        selectPiece(row, col);
      }
    }
  };

  const selectPiece = (row: number, col: number) => {
    setSelectedPosition({ row, col });
    
    const moves = chess.moves({ verbose: true }) as ChessJsMove[];
    
    const pieceMoves = moves.filter(move => 
      move.from === algebraicNotation({ row, col })
    );
    
    const validPositions = pieceMoves.map(move => ({
      row: 8 - parseInt(move.to[1]),
      col: move.to.charCodeAt(0) - 'a'.charCodeAt(0)
    }));
    
    setValidMoves(validPositions);
  };

  const getPieceAt = (row: number, col: number) => {
    return board[row] && board[row][col];
  };

  const algebraicNotation = (position: ChessPosition) => {
    const file = String.fromCharCode('a'.charCodeAt(0) + position.col);
    const rank = 8 - position.row;
    return `${file}${rank}`;
  };

  const isValidMove = (row: number, col: number) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  const isSelected = (row: number, col: number) => {
    return selectedPosition?.row === row && selectedPosition?.col === col;
  };

  const getSquareColor = (row: number, col: number) => {
    if (isSelected(row, col)) {
      return '#aaf'; // Selected square
    }
    if (isValidMove(row, col)) {
      return '#afa'; // Valid move
    }
    return (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863'; // Standard chess colors
  };

  const renderBoard = () => {
    const squares = [];
    
    const rows = playerColor === PieceColor.White ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    const cols = playerColor === PieceColor.White ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const row = rows[r];
        const col = cols[c];
        
        squares.push(
          <TouchableOpacity
            key={`${row}-${col}`}
            style={[
              styles.square,
              {
                backgroundColor: getSquareColor(row, col),
                width: squareSize,
                height: squareSize
              }
            ]}
            onPress={() => handleSquarePress(row, col)}
          >
            {board[row] && board[row][col] && (
              <ChessPiece
                type={board[row][col].type}
                color={board[row][col].color}
                size={squareSize * 0.8}
              />
            )}
          </TouchableOpacity>
        );
      }
    }
    
    return squares;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        {renderBoard()}
      </View>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>
          {currentTurn === PieceColor.White ? 'White' : 'Black'}'s turn
        </Text>
        {chess.isCheck() && <Text style={styles.checkText}>CHECK!</Text>}
        {chess.isCheckmate() && <Text style={styles.checkmateText}>CHECKMATE!</Text>}
        {chess.isDraw() && <Text style={styles.drawText}>DRAW!</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: '#000',
  },
  square: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  checkmateText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  drawText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
});

export default ChessBoard;
