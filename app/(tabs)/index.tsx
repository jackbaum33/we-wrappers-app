// we-wrappers-app/app/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>We Wrappers</Text>
      <Button title="Submit Wrap" onPress={() => navigation.navigate('Wrap')} />
      <Button title="Bracket" onPress={() => navigation.navigate('Bracket')} />
      <Button title="Chain" onPress={() => navigation.navigate('Chain')} />
      <Button title="Streak" onPress={() => navigation.navigate('Streak')} />
      <Button title="Leaderboard" onPress={() => navigation.navigate('Leaderboard')} />
      <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
    </View>
  );
}
