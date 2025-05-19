import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PieceType, PieceColor } from '../../utils/types';
import { useSettings } from '../../context/SettingsContext';
import { BlurView } from 'expo-blur';

interface ChessPieceProps {
  type: string;
  color: string;
  size: number;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ type, color, size }) => {
  const { settings } = useSettings();
  const useImages = true;
  const getPiecePath = () => {
    const pieceColor = color === 'w' ? '#fff' : '#000';
    const strokeColor = color === 'w' ? '#000' : '#fff';
    
    switch (type) {
      case 'p': // Pawn
        return (
          <Svg width={size} height={size} viewBox="0 0 45 45">
            <Path
              d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        );
      case 'r': // Rook
        return (
          <Svg width={size} height={size} viewBox="0 0 45 45">
            <Path
              d="M9 39h27v-3H9v3zm3-3v-4h21v4H12zm-1-22V9h4v2h5V9h5v2h5V9h4v5"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M34 14l-3 3H14l-3-3"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M31 17v12.5H14V17"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M31 29.5l1.5 2.5h-20l1.5-2.5"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        );
      case 'n': // Knight
        return (
          <Svg width={size} height={size} viewBox="0 0 45 45">
            <Path
              d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 1 1 1 0z"
              fill={strokeColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        );
      case 'b': // Bishop
        return (
          <Svg width={size} height={size} viewBox="0 0 45 45">
            <Path
              d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2z"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        );
      case 'q': // Queen
        return (
          <Svg width={size} height={size} viewBox="0 0 45 45">
            <Path
              d="M8 12a2 2 0 1 1 4 0 2 2 0 1 1-4 0zm16.5-4.5a2 2 0 1 1 4 0 2 2 0 1 1-4 0zM41 12a2 2 0 1 1 4 0 2 2 0 1 1-4 0zM16 8.5a2 2 0 1 1 4 0 2 2 0 1 1-4 0zM33 9a2 2 0 1 1 4 0 2 2 0 1 1-4 0z"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-14V25L7 14l2 12z"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        );
      case 'k': // King
        return (
          <Svg width={size} height={size} viewBox="0 0 45 45">
            <Path
              d="M22.5 11.63V6M20 8h5"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-3.5-7.5-13-10.5-16-4-3 6 5 10 5 10V37z"
              fill={pieceColor}
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        );
      default:
        return null;
    }
  };

  const renderImagePiece = () => {
    let pieceSource = require('../../../assets/icon.png');
    
    return (
      <View style={styles.pieceContainer}>
        {/* Shadow effect */}
        <View style={[styles.shadow, { width: size, height: size * 0.1 }]}></View>
        
        {/* The piece itself */}
        <Image 
          source={pieceSource} 
          style={{ 
            width: size, 
            height: size,
            position: 'absolute',
            tintColor: color === 'w' ? '#ffffff' : '#000000',
          }}
          resizeMode="contain"
        />
        
        {/* Highlight effect for pseudo-3D */}
        <View style={[styles.highlight, { width: size * 0.7, height: size * 0.2 }]}></View>
      </View>
    );
  };

  if (useImages) {
    return renderImagePiece();
  }

  return <View>{getPiecePath()}</View>;
};

const styles = StyleSheet.create({
  pieceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    transform: [{ scaleY: 0.1 }],
    position: 'absolute',
    bottom: -5,
  },
  highlight: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    transform: [{ scaleX: 0.8 }],
  }
});

export default ChessPiece;
