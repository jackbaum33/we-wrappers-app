// we-wrappers-app/components/ChainCard.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type ChainMember = {
  uid: string;
  name: string;
  wrappedToday: boolean;
};

type Props = {
  chain: {
    id: string;
    members: ChainMember[];
    complete: boolean;
  };
};

export default function ChainCard({ chain }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Chain ID: {chain.id}</Text>
      <FlatList
        data={chain.members}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={{ color: item.wrappedToday ? 'green' : 'red' }}>
              {item.wrappedToday ? '✅ Wrapped' : '❌ Not Wrapped'}
            </Text>
          </View>
        )}
      />
      {chain.complete && (
        <Text style={styles.complete}>🎉 This chain is complete for today!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: {
    fontSize: 15,
  },
  complete: {
    marginTop: 12,
    fontWeight: '600',
    color: '#4ADE80',
  },
});
