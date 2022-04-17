import React from 'react';
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const History: React.FC = () => {
  const appContext = useAppContext();
  return (
    <ImageBackground style={styles.container} source={{ uri: imageUrl }}>
      <ScrollView>
        {appContext.moodList
          .slice()
          .reverse()
          .map(item => (
            <MoodItemRow key={item.timestamp} item={item} />
          ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
