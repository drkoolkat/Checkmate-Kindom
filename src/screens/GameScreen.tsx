import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChessBoard from '../components/chess/ChessBoard';
import { PieceColor, ChessMove } from '../utils/types';
import { useSettings } from '../context/SettingsContext';

type RootStackParamList = {
  Home: undefined;
  Game: { mode: 'local' | 'online' | 'ai', timeControl?: 'blitz' | 'tempo' | 'classic' };
  Settings: undefined;
};

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;
type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const navigation = useNavigation<GameScreenNavigationProp>();
  const { mode, timeControl = 'blitz' } = route.params;
  const { settings } = useSettings();
  
  const [playerColor, setPlayerColor] = useState<PieceColor>(PieceColor.White);
  const [whiteTime, setWhiteTime] = useState(0);
  const [blackTime, setBlackTime] = useState(0);
  const [currentTurn, setCurrentTurn] = useState<PieceColor>(PieceColor.White);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    let initialTime = 0;
    
    switch (timeControl) {
      case 'blitz':
        initialTime = 3 * 60; // 3 minutes in seconds
        break;
      case 'tempo':
        initialTime = 20; // 20 seconds per move
        break;
      case 'classic':
        initialTime = 60; // 60 seconds per move
        break;
    }
    
    setWhiteTime(initialTime);
    setBlackTime(initialTime);
    setGameStarted(true);
    startTimer();
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeControl]);
  
  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      if (currentTurn === PieceColor.White) {
        setWhiteTime(prev => Math.max(0, prev - 1));
        if (whiteTime <= 1) {
          handleTimeOut();
        }
      } else {
        setBlackTime(prev => Math.max(0, prev - 1));
        if (blackTime <= 1) {
          handleTimeOut();
        }
      }
    }, 1000);
  };
  
  const handleTimeOut = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    Alert.alert(
      'Time Out',
      `${currentTurn === PieceColor.White ? 'White' : 'Black'} ran out of time!`,
      [
        { 
          text: 'Back to Menu', 
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleMove = (move: ChessMove) => {
    console.log('Move made:', move);
    
    const now = Date.now();
    
    if (timeControl === 'blitz') {
      if (currentTurn === PieceColor.White) {
        setWhiteTime(prev => prev + 3); // Add 3 seconds
      } else {
        setBlackTime(prev => prev + 3); // Add 3 seconds
      }
    } else if (timeControl === 'tempo' || timeControl === 'classic') {
      const initialTime = timeControl === 'tempo' ? 20 : 60;
      if (currentTurn === PieceColor.White) {
        setBlackTime(initialTime); // Reset next player's time
      } else {
        setWhiteTime(initialTime); // Reset next player's time
      }
    }
    
    setLastMoveTime(now);
    setCurrentTurn(currentTurn === PieceColor.White ? PieceColor.Black : PieceColor.White);
    
    if (mode === 'online') {
    } else if (mode === 'ai') {
    }
  };
  
  const handleResign = () => {
    Alert.alert(
      'Resign Game',
      'Are you sure you want to resign?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Resign', 
          style: 'destructive',
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };
  
  const handleDrawOffer = () => {
    if (mode === 'local') {
      Alert.alert(
        'Draw Offer',
        'Do you accept the draw offer?',
        [
          { text: 'Decline', style: 'cancel' },
          { 
            text: 'Accept', 
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    } else if (mode === 'online') {
      Alert.alert('Draw offer sent to opponent');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'local' ? 'Local Game' : mode === 'online' ? 'Online Game' : 'Game vs AI'}
        </Text>
        <Text style={styles.subtitle}>
          {timeControl === 'blitz' ? 'Blitz (3+3)' : 
           timeControl === 'tempo' ? 'Tempo (20s/move)' : 
           'Classic (60s/move)'}
        </Text>
      </View>
      
      <View style={styles.boardContainer}>
        <ChessBoard 
          onMove={handleMove}
          playerColor={playerColor}
          gameMode={mode}
        />
      </View>
      
      {/* Timer in bottom right corner */}
      <View style={styles.timerContainer}>
        <View style={styles.timer}>
          <Text style={[
            styles.timerText, 
            currentTurn === PieceColor.White && styles.activeTimerText
          ]}>
            W: {formatTime(whiteTime)}
          </Text>
          <Text style={[
            styles.timerText, 
            currentTurn === PieceColor.Black && styles.activeTimerText
          ]}>
            B: {formatTime(blackTime)}
          </Text>
        </View>
      </View>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleResign}>
          <Text style={styles.controlButtonText}>Resign</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={handleDrawOffer}>
          <Text style={styles.controlButtonText}>Offer Draw</Text>
        </TouchableOpacity>
        
        {mode === 'local' && (
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={() => setPlayerColor(
              playerColor === PieceColor.White ? PieceColor.Black : PieceColor.White
            )}
          >
            <Text style={styles.controlButtonText}>Flip Board</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Profile Picture Display */}
      {settings.profilePicture && (
        <View style={[
          styles.profileDisplay,
          settings.profilePictureShape === 'circle' && styles.circleShape,
          settings.profilePictureShape === 'square' && styles.squareShape,
          settings.profilePictureShape === 'star' && styles.starShape,
        ]}>
          <Image 
            source={{ uri: settings.profilePicture }} 
            style={styles.profileImage} 
          />
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Back to Menu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#4a6ea9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    margin: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
  },
  timerContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 10,
  },
  timer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 2,
  },
  activeTimerText: {
    color: '#4a6ea9',
  },
  profileDisplay: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  circleShape: {
    borderRadius: 20,
  },
  squareShape: {
    borderRadius: 5,
  },
  starShape: {
    borderRadius: 5,
    backgroundColor: '#4a6ea9',
  },
});

export default GameScreen;
