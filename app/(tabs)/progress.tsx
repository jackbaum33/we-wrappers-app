import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import StreakScreen from '../(screens)/streak';
import LeaderboardScreen from '../(screens)/leaderboard';

export default function ProgressScreen() {
  const [view, setView] = useState<'streak' | 'leaderboard'>('streak');

  return (
    <View style={styles.container}>
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

      <ScrollView style={styles.scroll}>
        {view === 'streak' ? <StreakScreen /> : <LeaderboardScreen />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    marginTop: 50,
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
