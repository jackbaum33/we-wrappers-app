// app/(screens)/leaderboard.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

type Leader = { name: string; count: number; isYou?: boolean };

/** Count how many wrapped dates fall within the last 7 calendar days (today inclusive). */
function countWrapsLast7Days(dates: string[]): number {
  if (!dates?.length) return 0;

  // Normalize to midnight for consistent comparisons
  const toMidnight = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const today = new Date();
  const todayMid = toMidnight(today);

  const start = new Date(today);
  start.setDate(today.getDate() - 6); // last 7 days => today and previous 6 days
  const startMid = toMidnight(start);

  let count = 0;
  for (const ds of dates) {
    const d = new Date(ds);
    const mid = toMidnight(d);
    if (mid >= startMid && mid <= todayMid) count += 1;
  }
  return count;
}

export default function LeaderboardScreen() {
  const [loading, setLoading] = useState(true);
  const [leaders, setLeaders] = useState<Leader[]>([]);

  // 🔧 Replace with the signed-in user's real wrapped dates (YYYY-MM-DD) when ready
  const wrappedDatesMock = useMemo(
    () => [
      // some older (outside last 7 days)
      '2025-07-10',
      '2025-07-11',
      '2025-07-12',
      '2025-07-13',
      // some within last 7 days (adjust to your current date for testing)
      '2025-07-26',
      '2025-07-28',
      '2025-07-30',
      // Uncomment to simulate today:
      // new Date().toISOString().slice(0, 10),
    ],
    []
  );

  // Compute the user's weekly count from recent streak dates
  const yourWeeklyCount = useMemo(
    () => countWrapsLast7Days(wrappedDatesMock),
    [wrappedDatesMock]
  );

  useEffect(() => {
    const loadLeaders = async () => {
      setLoading(true);
      // 🧪 Replace with Firestore call later: friends and their weekly counts
      await new Promise((res) => setTimeout(res, 600));

      const friendsWeekly: Leader[] = [
        { name: 'Alice', count: 12 },
        { name: 'Bob', count: 10 },
        { name: 'Charlie', count: 8 },
      ];

      // Merge "You" into list and sort descending by count (then name for stability)
      const combined = [
        ...friendsWeekly,
        { name: 'You', count: yourWeeklyCount, isYou: true },
      ].sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name);
      });

      setLeaders(combined);
      setLoading(false);
    };

    loadLeaders();
  }, [yourWeeklyCount]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="silver" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Wrap Rankings</Text>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={leaders}
        keyExtractor={(item, index) => `${item.name}-${item.count}-${index}`}
        renderItem={({ item, index }) => (
          <View style={[styles.row, item.isYou && styles.youRow]}>
            <Text style={[styles.text, item.isYou && styles.youText]}>
              {index + 1}. {item.name}
            </Text>
            <Text style={[styles.text, item.isYou && styles.youText]}>
              {item.count} wraps
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    flex: 1, backgroundColor: 'black',
  },
  title: {
    color: 'silver',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  list: {
    flex: 1,
    backgroundColor: 'black',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  text: {
    color: 'silver',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#222',
  },

  // Highlight "You"
  youRow: {
    borderWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#111',
  },
  youText: {
    fontWeight: '700',
  },
});
