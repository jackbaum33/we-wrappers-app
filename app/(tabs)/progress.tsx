import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import StreakScreen from '../(screens)/streak';
import LeaderboardScreen from '../(screens)/leaderboard';

export default function ProgressScreen() {
  const [view, setView] = useState<'streak' | 'leaderboard'>('streak');

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Progress Dashboard</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.button, view === 'streak' && styles.activeButton]}
          onPress={() => setView('streak')}
        >
          <Text style={[styles.buttonText, view === 'streak' && styles.activeText]}>
            Streak
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, view === 'leaderboard' && styles.activeButton]}
          onPress={() => setView('leaderboard')}
        >
          <Text style={[styles.buttonText, view === 'leaderboard' && styles.activeText]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>

      {view === 'streak' ? (
        // Streak content can scroll if it needs to
        <ScrollView style={styles.scroll}>
          <StreakScreen />
        </ScrollView>
      ) : (
        // Leaderboard uses FlatList internally; don't wrap in ScrollView
        <View style={styles.scroll}>
          <LeaderboardScreen />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title:
  {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'silver',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    backgroundColor: '#111',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#222',
  },
  activeButton: {
    backgroundColor: 'silver',
  },
  buttonText: {
    color: 'silver',
    fontWeight: 'bold',
  },
  activeText: {
    color: 'black',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'black',
  },
});
