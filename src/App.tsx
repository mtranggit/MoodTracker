import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Hello, world!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});
