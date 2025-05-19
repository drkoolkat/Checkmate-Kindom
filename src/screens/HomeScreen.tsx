import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Game: { mode: 'local' | 'online' | 'ai' };
  Settings: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chess Game</Text>
        <Text style={styles.subtitle}>Play the classic game of strategy</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Game', { mode: 'local' })}
        >
          <Text style={styles.buttonText}>Play Local</Text>
          <Text style={styles.buttonSubtext}>Two players on one device</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Game', { mode: 'online' })}
        >
          <Text style={styles.buttonText}>Play Online</Text>
          <Text style={styles.buttonSubtext}>Challenge players worldwide</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Game', { mode: 'ai' })}
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

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
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
});

export default HomeScreen;
