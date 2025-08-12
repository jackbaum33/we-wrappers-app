import React, { useMemo, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { Bracket } from './types';

type Props = {
  visible: boolean;
  allBrackets: Bracket[];
  onClose: () => void;
  onOpen: (id: string) => void;
};

export default function SearchBracketModal({ visible, allBrackets, onClose, onOpen }: Props) {
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    if (!q.trim()) return allBrackets;
    const lower = q.toLowerCase();
    return allBrackets.filter((b) => b.name.toLowerCase().includes(lower));
  }, [q, allBrackets]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Search Brackets</Text>

          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search by name"
            placeholderTextColor="#888"
            style={styles.input}
          />

          <FlatList
            data={results}
            keyExtractor={(b) => b.id}
            style={{ maxHeight: 300 }}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.row} onPress={() => onOpen(item.id)}>
                <Text style={styles.rowText}>{item.name}</Text>
                <Text style={styles.rowCount}>{item.participants.length} players</Text>
              </TouchableOpacity>
            )}
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btn} onPress={onClose}>
              <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '88%', maxWidth: 420, backgroundColor: '#111', borderColor: 'silver', borderWidth: 1, borderRadius: 14, padding: 14,
  },
  title: { color: 'silver', fontWeight: '700', fontSize: 18, marginBottom: 10, textAlign: 'center' },
  input: {
    backgroundColor: '#000', color: 'silver', borderWidth: 1, borderColor: 'silver',
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 10,
  },
  row: {
    backgroundColor: '#000', borderWidth: 1, borderColor: 'silver', borderRadius: 10, padding: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  rowText: { color: 'silver' },
  rowCount: { color: 'silver', opacity: 0.8 },
  actions: { marginTop: 12, alignItems: 'flex-end' },
  btn: { backgroundColor: 'silver', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  btnText: { color: 'black', fontWeight: 'bold' },
});
