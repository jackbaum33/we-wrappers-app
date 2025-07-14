// we-wrappers-app/components/BracketMatchup.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Matchup = {
  id: string;
  user1: { uid: string; name: string };
  user2: { uid: string; name: string };
  user1Time?: string;
  user2Time?: string;
  winner?: string;
};

type Props = {
  matchup: Matchup;
  currentUserId: string;
};

export default function BracketMatchup({ matchup, currentUserId }: Props) {
  const { user1, user2, user1Time, user2Time, winner } = matchup;

  const getStatus = () => {
    if (!user1Time || !user2Time) return '⏳ Waiting for both submissions...';
    if (winner === currentUserId) return '✅ You won!';
    if (winner && winner !== currentUserId) return '❌ You lost.';
    return '🟰 Draw';
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        {user1.name} vs {user2.name}
      </Text>
      <Text style={styles.time}>
        {user1.name}: {user1Time || '–'} | {user2.name}: {user2Time || '–'}
      </Text>
      <Text style={styles.status}>{getStatus()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
    marginBottom: 12,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    marginBottom: 6,
  },
  status: {
    fontWeight: '600',
    fontSize: 14,
  },
});
