import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WrapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Your Daily Wrap</Text>

      <View style={styles.uploaderMock}>
        <Text style={styles.uploaderText}>🖼️ Photo uploader goes here (mocked for testing)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'silver',
  },
  uploaderMock: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111', // subtle contrast box
  },
  uploaderText: {
    color: 'silver',
    fontSize: 16,
    textAlign: 'center',
  },
});
