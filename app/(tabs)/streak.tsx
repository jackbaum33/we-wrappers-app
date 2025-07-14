import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
// 🔴 Removed: import { useUser } from '../../context/UserContext';
// 🔴 Removed: import { getUserStreakDates } from '../../firebase/streak';
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

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Your Streak</Text>
      <StreakCalendar wrappedDates={dates} />
    </View>
  );
}
