import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import StreakCalendar from '../../components/StreakCalendar';

export default function StreakScreen() {
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMockStreaks = async () => {
      await new Promise((res) => setTimeout(res, 1000)); // Simulate delay
      setDates([
        '2025-07-10',
        '2025-07-11',
        '2025-07-12',
        '2025-07-13',
      ]);
      setLoading(false);
    };

    fetchMockStreaks();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color="silver" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Streak</Text>
      <StreakCalendar wrappedDates={dates} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'silver',
  },
});
