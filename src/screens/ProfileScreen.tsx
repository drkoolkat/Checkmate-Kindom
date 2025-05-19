import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { useSettings } from '../context/SettingsContext';

type RootStackParamList = {
  Home: undefined;
  Game: { mode: 'local' | 'online' | 'ai', timeControl?: 'blitz' | 'tempo' | 'classic' | 'none' };
  Settings: undefined;
  Profile: undefined;
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { settings, updateSettings, uploadProfilePicture } = useSettings();
  const [username, setUsername] = useState(settings.username || 'Chess Player');
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
  
  const saveUsername = () => {
    updateSettings({ username });
    alert('Username saved!');
  };
  
  const toggleAvatarType = () => {
    updateSettings({ useDefaultAvatar: !settings.useDefaultAvatar });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Profile</Text>
        </View>
        
        <View style={styles.section}>
          <View style={styles.profileContainer}>
            {settings.profilePicture ? (
              <Image 
                source={{ uri: settings.profilePicture }} 
                style={[
                  styles.profileImage,
                  settings.profilePictureShape === 'circle' && styles.circleShape,
                  settings.profilePictureShape === 'square' && styles.squareShape,
                  settings.profilePictureShape === 'star' && styles.starContainer,
                ]}
              />
            ) : (
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
            )}
            
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={pickImage}
              disabled={uploading}
            >
              <Text style={styles.uploadButtonText}>
                {uploading ? 'Uploading...' : 'Change Photo'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              maxLength={20}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveUsername}>
              <Text style={styles.saveButtonText}>Save Username</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Use Default Avatar</Text>
            <TouchableOpacity 
              style={[styles.toggleButton, settings.useDefaultAvatar && styles.toggleButtonActive]} 
              onPress={toggleAvatarType}
            >
              <Text style={styles.toggleButtonText}>
                {settings.useDefaultAvatar ? 'ON' : 'OFF'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
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
  circleShape: {
    borderRadius: 60,
    overflow: 'hidden',
  },
  squareShape: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  starContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#4a6ea9',
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#4a6ea9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  toggleButton: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  toggleButtonActive: {
    backgroundColor: '#4a6ea9',
  },
  toggleButtonText: {
    fontWeight: 'bold',
    color: '#333',
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

export default ProfileScreen;
