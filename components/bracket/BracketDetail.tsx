import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Bracket } from './types';

type Props = {
  bracket: Bracket;
  onBack: () => void;
};

export default function BracketDetail({ bracket, onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{bracket.name}</Text>
      </View>

      {/* Simple round columns */}
      <ScrollView horizontal contentContainerStyle={styles.rounds} showsHorizontalScrollIndicator={false}>
        {bracket.rounds.map((round, idx) => (
          <View key={idx} style={styles.roundCol}>
            <Text style={styles.roundLabel}>Round {idx + 1}</Text>
            {round.map((p, i) => (
              <View key={`${p.id}-${i}`} style={styles.slot}>
                <Text style={styles.slotText}>{p.name}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Text style={styles.meta}>
        Players: {bracket.participants.map((p) => p.name).join(', ')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backBtn: { paddingRight: 8, paddingVertical: 6 },
  backText: { color: 'silver', fontSize: 16 },
  title: { color: 'silver', fontSize: 20, fontWeight: 'bold', marginLeft: 6 },
  rounds: { paddingHorizontal: 16, paddingBottom: 16 },
  roundCol: { marginRight: 16, minWidth: 180 },
  roundLabel: { color: 'silver', marginBottom: 8, fontWeight: '600' },
  slot: {
    backgroundColor: '#111', borderWidth: 1, borderColor: 'silver',
    borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 10,
  },
  slotText: { color: 'silver', fontSize: 16 },
  meta: { color: 'silver', opacity: 0.8, padding: 16 },
});
