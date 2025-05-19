import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ChessBoard from '../components/chess/ChessBoard';
import { PieceColor, ChessMove } from '../utils/types';

type RootStackParamList = {
  Home: undefined;
  Game: { mode: 'local' | 'online' | 'ai' };
  Settings: undefined;
};

type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;
type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const navigation = useNavigation<GameScreenNavigationProp>();
  const { mode } = route.params;
  
  const [playerColor, setPlayerColor] = useState<PieceColor>(PieceColor.White);
  
  const handleMove = (move: ChessMove) => {
    console.log('Move made:', move);
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
      </View>
      
      <View style={styles.boardContainer}>
        <ChessBoard 
          onMove={handleMove}
          playerColor={playerColor}
          gameMode={mode}
        />
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
});

export default GameScreen;
