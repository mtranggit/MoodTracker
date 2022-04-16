import React, { useEffect } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataKey = 'my-app-data';

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

const setAppData = async (appData: AppData) => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch {}
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch {}
  return null;
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  updateMoodList: (mood: MoodOptionType) => void;
  deleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const AppContext = React.createContext<AppContextType>({
  moodList: [],
  updateMoodList: () => {},
  deleteMood: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);
  const handleSelectMood = React.useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => {
      const newMoodList = [
        ...current,
        { mood: selectedMood, timestamp: Date.now() },
      ];
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  const handleDeleteMood = React.useCallback(
    (selectedMood: MoodOptionWithTimestamp) => {
      setMoodList(current => {
        const newMoodList = current.filter(
          mood => mood.timestamp !== selectedMood.timestamp,
        );
        setAppData({ moodList: newMoodList });
        return newMoodList;
      });
    },
    [],
  );
  const contextValue: AppContextType = {
    moodList,
    updateMoodList: handleSelectMood,
    deleteMood: handleDeleteMood,
  };

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
