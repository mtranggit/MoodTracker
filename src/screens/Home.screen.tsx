import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { useAppContext } from '../App.provider';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home: React.FC = () => {
  const appContext = useAppContext();

  return (
    <ImageBackground style={styles.container} source={{ uri: imageUrl }}>
      <MoodPicker onSelectMood={appContext.updateMoodList} />
    </ImageBackground>
  );

  // return (
  //   <View style={styles.container}>
  //     <Image source={{ uri: imageUrl }} style={{ flex: 1 }} />
  //     <View style={[StyleSheet.absoluteFill, { justifyContent: 'center' }]}>
  //       <MoodPicker onSelectMood={appContext.updateMoodList} />
  //     </View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
