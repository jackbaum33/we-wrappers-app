import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Friend } from './types';

type Props = {
  visible: boolean;
  friends: Friend[];
  onClose: () => void;
  onCreate: (name: string, friendIds: string[]) => void;
};

export default function CreateBracketModal({ visible, friends, onClose, onCreate }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState<string>('New Bracket');

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Create Bracket</Text>

          <View style={styles.inputFake}>
            <Text style={styles.inputText}>{name}</Text>
          </View>
          <Text style={styles.hint}>(Tap name to edit later; using a simple mock input for now)</Text>

          <Text style={styles.sub}>Pick Friends</Text>
          <FlatList
            data={friends}
            keyExtractor={(f) => f.id}
            style={{ maxHeight: 260 }}
            ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
            renderItem={({ item }) => {
              const active = selected.includes(item.id);
              return (
                <TouchableOpacity style={[styles.row, active && styles.rowActive]} onPress={() => toggle(item.id)}>
                  <Text style={styles.rowText}>{item.name}</Text>
                  <Text style={styles.rowTag}>{active ? '✓' : ''}</Text>
                </TouchableOpacity>
              );
            }}
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnGhost} onPress={onClose}>
              <Text style={styles.btnGhostText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                onCreate(name, selected);
                setSelected([]);
              }}
              disabled={selected.length === 0}
            >
              <Text style={styles.btnText}>Create</Text>
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
  inputFake: {
    borderWidth: 1, borderColor: 'silver', borderRadius: 10, padding: 10, marginBottom: 6, backgroundColor: '#000',
  },
  inputText: { color: 'silver' },
  hint: { color: 'silver', opacity: 0.7, marginBottom: 10, fontSize: 12 },
  sub: { color: 'silver', marginBottom: 8, fontWeight: '600' },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#000', borderWidth: 1, borderColor: 'silver', borderRadius: 10, padding: 10,
  },
  rowActive: { backgroundColor: '#1a1a1a' },
  rowText: { color: 'silver' },
  rowTag: { color: 'silver', fontWeight: '700' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 12 },
  btn: { backgroundColor: 'silver', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  btnText: { color: 'black', fontWeight: 'bold' },
  btnGhost: { backgroundColor: '#ddd', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  btnGhostText: { color: '#000', fontWeight: 'bold' },
});
