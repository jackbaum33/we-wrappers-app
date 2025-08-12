// app/(tabs)/groups.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChainScreen from '../(screens)/chain';
import BracketTree from '../../components/BracketTree';

type Friend = { id: string; name: string };
type SeriesScores = {
  // roundIndex -> array of [scoreA, scoreB] for each matchup in that round
  [roundIndex: number]: Array<[number, number]>;
};
type Bracket = {
  id: string;
  name: string;
  participants: Friend[];
  rounds: Friend[][];
  scores?: SeriesScores;
};

export default function GroupsScreen() {
  const [activeTab, setActiveTab] = useState<'bracket' | 'chain'>('bracket');

  // Mock friends
  const friends: Friend[] = useMemo(
    () => [
      { id: 'u1', name: 'Alice' },
      { id: 'u2', name: 'Bob' },
      { id: 'u3', name: 'Charlie' },
      { id: 'u4', name: 'You' },
      { id: 'u5', name: 'Dana' },
      { id: 'u6', name: 'Eli' },
      { id: 'u7', name: 'Noam' },
      { id: 'u8', name: 'Ruth' },
    ],
    []
  );

  // Mock brackets with live scores
  const [brackets, setBrackets] = useState<Bracket[]>([
    {
      id: 'b1',
      name: 'Morning Hustle',
      participants: [friends[0], friends[1], friends[2], friends[3], friends[4], friends[5], friends[6], friends[7]],
      rounds: [
        [friends[0], friends[1], friends[2], friends[3], friends[4], friends[5], friends[6], friends[7]], // R8
        [friends[0], friends[2], friends[4], friends[6]], // R4
        [friends[0], friends[4]], // Final
        [friends[0]], // Champ
      ],
      // Each entry is a pair's series score [A,B] for that round.
      scores: {
        0: [
          [2, 1], // Alice vs Bob
          [3, 0], // Charlie vs You
          [1, 2], // Dana vs Eli
          [2, 0], // Noam vs Ruth
        ],
        1: [
          [1, 0], // (Alice) vs (Charlie)
          [0, 1], // (Dana) vs (Noam)
        ],
        2: [[2, 1]], // Final: Alice vs Dana (example)
      },
    },
    {
      id: 'b2',
      name: 'Night Owls',
      participants: [friends[0], friends[1], friends[2], friends[3]],
      rounds: [
        [friends[0], friends[1], friends[2], friends[3]], // R4
        [friends[1], friends[3]], // Final
        [friends[1]], // Champ
      ],
      scores: {
        0: [
          [0, 2],
          [2, 1],
        ],
        1: [[2, 0]],
      },
    },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedBracket = useMemo(
    () => brackets.find((b) => b.id === selectedId) || null,
    [brackets, selectedId]
  );

  // Create modal
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState('New Bracket');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const toggleFriend = (id: string) =>
    setSelectedFriends((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleCreate = () => {
    const chosen = friends.filter((f) => selectedFriends.includes(f.id));
    if (chosen.length === 0) return;

    const pow2 = (n: number) => 2 ** Math.floor(Math.log2(Math.max(1, n)));
    const firstRoundSize = pow2(chosen.length);
    const r1 = chosen.slice(0, firstRoundSize);

    const rounds: Friend[][] = [];
    rounds.push(r1);
    let size = firstRoundSize / 2;
    let current = r1;
    while (size >= 1) {
      const next: Friend[] = [];
      for (let i = 0; i < size; i++) next.push(current[i * 2]); // placeholder winner
      rounds.push(next);
      current = next;
      size = size / 2;
    }

    const newBracket: Bracket = {
      id: `b${Date.now()}`,
      name: createName || 'New Bracket',
      participants: r1,
      rounds,
      scores: {}, // start empty
    };

    setBrackets((prev) => [newBracket, ...prev]);
    setCreateOpen(false);
    setCreateName('New Bracket');
    setSelectedFriends([]);
  };

  // Search modal
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brackets;
    return brackets.filter((b) => b.name.toLowerCase().includes(q));
  }, [query, brackets]);

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Progress Dashboard</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('bracket')}
          style={[styles.tabButton, activeTab === 'bracket' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'bracket' && styles.activeTabText]}>Bracket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('chain')}
          style={[styles.tabButton, activeTab === 'chain' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'chain' && styles.activeTabText]}>Chain</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'bracket' ? (
        selectedBracket ? (
          <BracketDetail bracket={selectedBracket} onBack={() => setSelectedId(null)} />
        ) : (
          <BracketList
            brackets={brackets}
            onOpen={(id) => setSelectedId(id)}
            onCreatePress={() => setCreateOpen(true)}
            onSearchPress={() => setSearchOpen(true)}
          />
        )
      ) : (
        <ChainScreen />
      )}

      {/* Create Modal */}
      <Modal visible={createOpen} transparent animationType="fade" onRequestClose={() => setCreateOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.card}>
            <Text style={styles.modalTitle}>Create Bracket</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              value={createName}
              onChangeText={setCreateName}
              placeholder="Bracket name"
              placeholderTextColor="#888"
              style={styles.input}
            />

            <Text style={[styles.label, { marginTop: 8 }]}>Pick Friends</Text>
            <FlatList
              data={friends}
              keyExtractor={(f) => f.id}
              style={{ maxHeight: 280 }}
              ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
              renderItem={({ item }) => {
                const active = selectedFriends.includes(item.id);
                return (
                  <TouchableOpacity
                    style={[styles.friendRow, active && styles.friendRowActive]}
                    onPress={() => toggleFriend(item.id)}
                  >
                    <Text style={styles.friendText}>{item.name}</Text>
                    <Text style={styles.friendTag}>{active ? '✓' : ''}</Text>
                  </TouchableOpacity>
                );
              }}
            />

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.btnGhost} onPress={() => setCreateOpen(false)}>
                <Text style={styles.btnGhostText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, selectedFriends.length === 0 && { opacity: 0.6 }]}
                disabled={selectedFriends.length === 0}
                onPress={handleCreate}
              >
                <Text style={styles.btnText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Search Modal */}
      <Modal visible={searchOpen} transparent animationType="fade" onRequestClose={() => setSearchOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.card}>
            <Text style={styles.modalTitle}>Search Brackets</Text>

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name"
              placeholderTextColor="#888"
              style={styles.input}
            />

            <FlatList
              data={searchResults}
              keyExtractor={(b) => b.id}
              style={{ maxHeight: 300 }}
              ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultRow}
                  onPress={() => {
                    setSearchOpen(false);
                    setSelectedId(item.id);
                  }}
                >
                  <Text style={styles.resultText}>{item.name}</Text>
                  <Text style={styles.resultCount}>{item.participants.length} players</Text>
                </TouchableOpacity>
              )}
            />

            <View style={styles.actionsRowRight}>
              <TouchableOpacity style={styles.btn} onPress={() => setSearchOpen(false)}>
                <Text style={styles.btnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ---------- Bracket List ---------- */
function BracketList({
  brackets,
  onOpen,
  onCreatePress,
  onSearchPress,
}: {
  brackets: Bracket[];
  onOpen: (id: string) => void;
  onCreatePress: () => void;
  onSearchPress: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={styles.sectionTitle}>Your Brackets</Text>

      <FlatList
        data={brackets}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bracketRow} onPress={() => onOpen(item.id)}>
            <Text style={styles.bracketName}>{item.name}</Text>
            <Text style={styles.bracketCount}>{item.participants.length} players</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footerActions}>
        <TouchableOpacity style={styles.btnGhost} onPress={onSearchPress}>
          <Text style={styles.btnGhostText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onCreatePress}>
          <Text style={styles.btnText}>New Bracket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------- Bracket Detail with top-left Back + score labels ---------- */
function BracketDetail({ bracket, onBack }: { bracket: Bracket; onBack: () => void }) {
  const insets = useSafeAreaInsets();

  // Build display rounds with score labels like "Alice (2-1)"
  const displayRounds: Friend[][] = useMemo(() => {
    if (!bracket.scores) return bracket.rounds;

    // Deep clone + mutate names for rounds that have scores
    return bracket.rounds.map((roundPlayers, rIdx) => {
      const scoresForRound = bracket.scores?.[rIdx];
      if (!scoresForRound) return roundPlayers;

      const out: Friend[] = [];
      for (let i = 0; i < roundPlayers.length; i += 2) {
        const a = roundPlayers[i];
        const b = roundPlayers[i + 1];
        // For odd leftover (final single), just push as-is
        if (!b || !scoresForRound[Math.floor(i / 2)]) {
          out.push(a);
          if (b) out.push(b);
          continue;
        }
        const [sa, sb] = scoresForRound[Math.floor(i / 2)];
        out.push({ ...a, name: `${a.name} (${sa}-${sb})` });
        out.push({ ...b, name: `${b.name} (${sb}-${sa})` });
      }
      return out;
    });
  }, [bracket.rounds, bracket.scores]);

  return (
    
    <View style={{ flex: 1, backgroundColor: 'black' }}>
          <TouchableOpacity
          onPress={onBack}
          style={[
            styles.backFloating,
            { paddingTop: Platform.select({ ios: 4, android: 8 }), paddingLeft: 8, marginTop: insets.top ? 0 : 8 },
          ]}
        >
          <Text style={styles.backFloatingText}>‹ Back</Text>
        </TouchableOpacity>
      <View style={{ height: 15}} />

      <Text style={styles.detailTitle}>{bracket.name}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {/* Pass the decorated rounds with score labels */}
        <BracketTree rounds={displayRounds} />
      </ScrollView>

      <Text style={styles.meta}>
        Players: {bracket.participants.map((p) => p.name).join(', ')}
      </Text>
    </View>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  title: {
    textAlign: 'center',
    marginTop: 70,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'silver',
  },

  // Tabs
  tabContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 0,
  },
  tabButton: {
    marginHorizontal: 20,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: { borderColor: 'silver' },
  tabText: { color: 'gray', fontSize: 16 },
  activeTabText: { color: 'silver', fontWeight: 'bold' },

  // List
  sectionTitle: { color: 'silver', fontSize: 20, fontWeight: 'bold', margin: 16, textAlign: 'center' },
  bracketRow: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bracketName: { color: 'silver', fontSize: 16, fontWeight: '600' },
  bracketCount: { color: 'silver', fontSize: 14, opacity: 0.85 },
  footerActions: { flexDirection: 'row', gap: 12, padding: 16, justifyContent: 'center' },

  // Detail
  detailTitle: { color: 'silver', fontSize: 20, fontWeight: 'bold', marginLeft: 16, marginBottom: 12, textAlign: 'center'},
  meta: { color: 'silver', opacity: 0.8, padding: 16 },

  // Modals (unchanged)
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '88%',
    maxWidth: 420,
    backgroundColor: '#111',
    borderColor: 'silver',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  modalTitle: { color: 'silver', fontWeight: '700', fontSize: 18, marginBottom: 10, textAlign: 'center' },
  label: { color: 'silver', fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: '#000',
    color: 'silver',
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  friendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 10,
    padding: 10,
  },
  friendRowActive: { backgroundColor: '#1a1a1a' },
  friendText: { color: 'silver' },
  friendTag: { color: 'silver', fontWeight: '700' },
  resultRow: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultText: { color: 'silver' },
  resultCount: { color: 'silver', opacity: 0.85 },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 12 },
  actionsRowRight: { alignItems: 'flex-end', marginTop: 12 },
  btn: { backgroundColor: 'silver', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  btnText: { color: 'black', fontWeight: 'bold' },
  btnGhost: { backgroundColor: '#ddd', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  btnGhostText: { color: '#000', fontWeight: 'bold' },

  // Top-left floating back
  backFloating: {
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  backFloatingText: {
    color: 'silver',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10
  },
});
