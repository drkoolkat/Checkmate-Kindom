import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Settings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  autoPromoteToQueen: boolean;
  showValidMoves: boolean;
  showCoordinates: boolean;
  darkMode: boolean;
  profilePicture: string | null;
  profilePictureShape: 'circle' | 'star' | 'square';
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  uploadProfilePicture: (uri: string) => void;
}

const defaultSettings: Settings = {
  soundEnabled: true,
  vibrationEnabled: true,
  autoPromoteToQueen: true,
  showValidMoves: true,
  showCoordinates: false,
  darkMode: false,
  profilePicture: null,
  profilePictureShape: 'circle',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('chessGameSettings');
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
        setInitialized(true);
      } catch (error) {
        console.error('Failed to load settings:', error);
        setInitialized(true);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    const updatedSettings = {
      ...settings,
      ...newSettings,
    };
    
    setSettings(updatedSettings);
    
    try {
      await AsyncStorage.setItem('chessGameSettings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const uploadProfilePicture = async (uri: string) => {
    updateSettings({ profilePicture: uri });
  };

  if (!initialized) {
    return null;
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, uploadProfilePicture }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
