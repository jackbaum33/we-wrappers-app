import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Bracket } from './types';

type Props = {
  brackets: Bracket[];
  onOpen: (id: string) => void;
  onCreatePress: () => void;
  onSearchPress: () => void;
};

export default function BracketList({ brackets, onOpen, onCreatePress, onSearchPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Brackets</Text>

      <FlatList
        data={brackets}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => onOpen(item.id)}>
            <Text style={styles.rowText}>{item.name}</Text>
            <Text style={styles.countText}>{item.participants.length} players</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={onSearchPress}>
          <Text style={styles.buttonTextDark}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCreatePress}>
          <Text style={styles.buttonText}>New Bracket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  title: { color: 'silver', fontSize: 20, fontWeight: 'bold', margin: 16 },
  row: {
    backgroundColor: '#111', borderWidth: 1, borderColor: 'silver', borderRadius: 10,
    padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  rowText: { color: 'silver', fontSize: 16, fontWeight: '600' },
  countText: { color: 'silver', fontSize: 14, opacity: 0.8 },
  sep: { height: 10 },
  actions: { flexDirection: 'row', gap: 12, padding: 16, justifyContent: 'flex-end' },
  button: {
    backgroundColor: 'silver', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
  },
  buttonSecondary: {
    backgroundColor: '#ddd', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
  },
  buttonText: { color: 'black', fontWeight: 'bold' },
  buttonTextDark: { color: '#000', fontWeight: 'bold' },
});
