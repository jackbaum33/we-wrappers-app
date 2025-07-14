// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'index':
              return <AntDesign name="home" size={size} color={color} />;
            case 'wrap':
              return <Ionicons name="camera-outline" size={size} color={color} />;
            case 'bracket':
              return <AntDesign name="Trophy" size={size} color={color} />;
            case 'chain':
              return <AntDesign name="team" size={size} color={color} />;
            case 'streak':
              return <Ionicons name="calendar-outline" size={size} color={color} />;
            case 'leaderboard':
              return <Ionicons name="stats-chart-outline" size={size} color={color} />;
            case 'admin':
              return <AntDesign name="setting" size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="wrap" options={{ title: 'Wrap' }} />
      <Tabs.Screen name="bracket" options={{ title: 'Bracket' }} />
      <Tabs.Screen name="chain" options={{ title: 'Chain' }} />
      <Tabs.Screen name="streak" options={{ title: 'Streak' }} />
      <Tabs.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />
      <Tabs.Screen name="admin" options={{ title: 'Admin' }} />
    </Tabs>
  );
}
