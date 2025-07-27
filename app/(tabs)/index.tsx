// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  //const { user } = useUser();
  const router = useRouter();
 // const name = user?.displayName?.split(' ')[0] || 'Wrapper';

  return (
    <ImageBackground
      source={{ uri: 'https://source.unsplash.com/800x1200/?nature,blur' }}
      style={styles.background}
      blurRadius={4}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Hi Wrapper!</Text>
        <Text style={styles.subtitle}>
          Are you ready? It's time to Wrap. Save this moment and share it with your friends.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/wrap')}>
          <Text style={styles.buttonText}>Submit Your Wrap</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'silver',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'silver',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'silver',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 24,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});