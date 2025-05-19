import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Game: { mode: 'local' | 'online' | 'ai' };
  Settings: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [autoPromoteToQueen, setAutoPromoteToQueen] = useState(true);
  const [showValidMoves, setShowValidMoves] = useState(true);
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Settings</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Auto-promote to Queen</Text>
            <Switch
              value={autoPromoteToQueen}
              onValueChange={setAutoPromoteToQueen}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={autoPromoteToQueen ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Show Valid Moves</Text>
            <Switch
              value={showValidMoves}
              onValueChange={setShowValidMoves}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={showValidMoves ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Show Board Coordinates</Text>
            <Switch
              value={showCoordinates}
              onValueChange={setShowCoordinates}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={showCoordinates ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Sound Effects</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={soundEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Vibration</Text>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={vibrationEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>Chess Game v1.0.0</Text>
          <Text style={styles.aboutText}>A mobile chess application for iOS and Android</Text>
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Save & Return</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  backButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#4a6ea9',
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;
