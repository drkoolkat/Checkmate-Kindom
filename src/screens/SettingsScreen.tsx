import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, SafeAreaView, ScrollView, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { useSettings } from '../context/SettingsContext';

type RootStackParamList = {
  Home: undefined;
  Game: { mode: 'local' | 'online' | 'ai', timeControl?: 'blitz' | 'tempo' | 'classic' };
  Settings: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { settings, updateSettings, uploadProfilePicture } = useSettings();
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    setUploading(true);
    
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to upload a photo!');
        setUploading(false);
        return;
      }
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      uploadProfilePicture(result.assets[0].uri);
    }
    
    setUploading(false);
  };

  const renderProfilePicture = () => {
    if (!settings.profilePicture) {
      return (
        <View 
          style={[
            styles.profilePlaceholder, 
            settings.profilePictureShape === 'circle' && styles.circleShape,
            settings.profilePictureShape === 'square' && styles.squareShape,
            settings.profilePictureShape === 'star' && styles.starContainer,
          ]}
        >
          <Text style={styles.profilePlaceholderText}>No Image</Text>
        </View>
      );
    }

    if (settings.profilePictureShape === 'circle') {
      return (
        <Image
          source={{ uri: settings.profilePicture }}
          style={[styles.profileImage, styles.circleShape]}
        />
      );
    } else if (settings.profilePictureShape === 'square') {
      return (
        <Image
          source={{ uri: settings.profilePicture }}
          style={[styles.profileImage, styles.squareShape]}
        />
      );
    } else { // Star shape (more complex)
      return (
        <View style={styles.starContainer}>
          <Image
            source={{ uri: settings.profilePicture }}
            style={styles.starImage}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          
          <View style={styles.profileContainer}>
            {renderProfilePicture()}
            
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={pickImage}
              disabled={uploading}
            >
              <Text style={styles.uploadButtonText}>
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.shapeOptions}>
            <Text style={styles.settingText}>Profile Picture Shape:</Text>
            <View style={styles.shapeButtons}>
              <TouchableOpacity 
                style={[
                  styles.shapeButton, 
                  settings.profilePictureShape === 'circle' && styles.selectedShapeButton
                ]}
                onPress={() => updateSettings({ profilePictureShape: 'circle' })}
              >
                <Text style={styles.shapeButtonText}>Circle</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.shapeButton, 
                  settings.profilePictureShape === 'square' && styles.selectedShapeButton
                ]}
                onPress={() => updateSettings({ profilePictureShape: 'square' })}
              >
                <Text style={styles.shapeButtonText}>Square</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.shapeButton, 
                  settings.profilePictureShape === 'star' && styles.selectedShapeButton
                ]}
                onPress={() => updateSettings({ profilePictureShape: 'star' })}
              >
                <Text style={styles.shapeButtonText}>Star</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Settings</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Auto-promote to Queen</Text>
            <Switch
              value={settings.autoPromoteToQueen}
              onValueChange={(value) => updateSettings({ autoPromoteToQueen: value })}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={settings.autoPromoteToQueen ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Show Valid Moves</Text>
            <Switch
              value={settings.showValidMoves}
              onValueChange={(value) => updateSettings({ showValidMoves: value })}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={settings.showValidMoves ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Show Board Coordinates</Text>
            <Switch
              value={settings.showCoordinates}
              onValueChange={(value) => updateSettings({ showCoordinates: value })}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={settings.showCoordinates ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Sound Effects</Text>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSettings({ soundEnabled: value })}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={settings.soundEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Vibration</Text>
            <Switch
              value={settings.vibrationEnabled}
              onValueChange={(value) => updateSettings({ vibrationEnabled: value })}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={settings.vibrationEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={settings.darkMode}
              onValueChange={(value) => updateSettings({ darkMode: value })}
              trackColor={{ false: '#767577', true: '#4a6ea9' }}
              thumbColor={settings.darkMode ? '#f4f3f4' : '#f4f3f4'}
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePlaceholderText: {
    color: '#666',
  },
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  circleShape: {
    borderRadius: 60,
    overflow: 'hidden',
  },
  squareShape: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  starContainer: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  starImage: {
    width: '100%',
    height: '100%',
  },
  uploadButton: {
    backgroundColor: '#4a6ea9',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: 'white',
  },
  shapeOptions: {
    marginTop: 15,
  },
  shapeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  shapeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  selectedShapeButton: {
    backgroundColor: '#4a6ea9',
  },
  shapeButtonText: {
    color: '#333',
  },
});

export default SettingsScreen;
