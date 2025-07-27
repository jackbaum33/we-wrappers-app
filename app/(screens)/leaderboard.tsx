import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

export default function LeaderboardScreen() {
  const [leaders, setLeaders] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🧪 Replace Firebase call with mock data
    const loadLeaders = async () => {
      await new Promise((res) => setTimeout(res, 1000)); // simulate delay
      setLeaders([
        { name: 'Alice', count: 12 },
        { name: 'Bob', count: 10 },
        { name: 'Charlie', count: 8 },
      ]);
      setLoading(false);
    };

    loadLeaders();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>
        Weekly Wrap Rankings
      </Text>
      <FlatList
        data={leaders}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 6,
            }}
          >
            <Text>{index + 1}. {item.name}</Text>
            <Text>{item.count} wraps</Text>
          </View>
        )}
      />
    </View>
  );
}
