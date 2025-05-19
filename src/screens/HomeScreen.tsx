import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';

type RootStackParamList = {
  Home: undefined;
  Game: { mode: 'local' | 'online' | 'ai', timeControl?: 'blitz' | 'tempo' | 'classic' };
  Settings: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { settings } = useSettings();
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'local' | 'online' | 'ai'>('local');

  const handleGameModePress = (mode: 'local' | 'online' | 'ai') => {
    setSelectedMode(mode);
    setShowTimerModal(true);
  };

  const handleTimerSelect = (timeControl: 'blitz' | 'tempo' | 'classic') => {
    setShowTimerModal(false);
    navigation.navigate('Game', { mode: selectedMode, timeControl });
  };

  const handleCancelTimer = () => {
    setShowTimerModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chess Game</Text>
        <Text style={styles.subtitle}>Play the classic game of strategy</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleGameModePress('local')}
        >
          <Text style={styles.buttonText}>Play Local</Text>
          <Text style={styles.buttonSubtext}>Two players on one device</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleGameModePress('online')}
        >
          <Text style={styles.buttonText}>Play Online</Text>
          <Text style={styles.buttonSubtext}>Challenge players worldwide</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => handleGameModePress('ai')}
        >
          <Text style={styles.buttonText}>Play vs AI</Text>
          <Text style={styles.buttonSubtext}>Challenge the computer</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Timer Selection Modal */}
      <Modal
        visible={showTimerModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelTimer}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Time Control</Text>
            
            <TouchableOpacity 
              style={styles.timerOption} 
              onPress={() => handleTimerSelect('blitz')}
            >
              <Text style={styles.timerOptionTitle}>Blitz</Text>
              <Text style={styles.timerOptionDesc}>3 min + 3 sec per move</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.timerOption} 
              onPress={() => handleTimerSelect('tempo')}
            >
              <Text style={styles.timerOptionTitle}>Tempo</Text>
              <Text style={styles.timerOptionDesc}>20 seconds per move</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.timerOption} 
              onPress={() => handleTimerSelect('classic')}
            >
              <Text style={styles.timerOptionTitle}>Classic</Text>
              <Text style={styles.timerOptionDesc}>60 seconds per move</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleCancelTimer}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
      
      {/* Profile Picture Display */}
      {settings.profilePicture && (
        <View style={[
          styles.profileDisplay,
          settings.profilePictureShape === 'circle' && styles.circleShape,
          settings.profilePictureShape === 'square' && styles.squareShape,
          settings.profilePictureShape === 'star' && styles.starContainer,
        ]}>
          <Image 
            source={{ uri: settings.profilePicture }} 
            style={styles.profileImage} 
          />
        </View>
      )}
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
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4a6ea9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  settingsButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#333',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  timerOption: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  timerOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerOptionDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#4a6ea9',
    fontSize: 16,
  },
  profileDisplay: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  circleShape: {
    borderRadius: 25,
  },
  squareShape: {
    borderRadius: 5,
  },
  starContainer: {
    borderRadius: 5,
    backgroundColor: '#4a6ea9',
  },
});

export default HomeScreen;
