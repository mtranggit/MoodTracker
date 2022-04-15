import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { theme } from '../theme';
import { MoodOptionType } from '../types';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  onSelectMood: (moodOption: MoodOptionType) => void;
};

const imageSrc = require('../../assets/butterflies.png');

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState(false);

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelectMood, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose another!</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map((option, index) => {
          const isSelected = selectedMood?.emoji === option.emoji;
          return (
            <View key={option.emoji}>
              <Pressable
                onPress={() => setSelectedMood(option)}
                style={[
                  styles.moodItem,
                  isSelected ? styles.selectedMoodItem : undefined,
                ]}>
                <Text key={index}>{option.emoji}</Text>
              </Pressable>
              <Text style={styles.descriptionText}>
                {isSelected ? option.description : null}
              </Text>
            </View>
          );
        })}
      </View>
      <Pressable onPress={handleSelect} style={styles.button}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  moodItem: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMoodItem: {
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
    borderWidth: 2,
  },
  descriptionText: {
    color: theme.colorPurple,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: theme.fontFamilyBold,
  },
  container: {
    height: 250,
    justifyContent: 'space-between',
    margin: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: theme.colorPurple,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
  },
  image: {
    alignSelf: 'center',
  },
});
