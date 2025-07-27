import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  return (
    <>
    <StatusBar style="light" />
    <Tabs
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: 'silver',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: {
        backgroundColor: '#000',
        borderTopColor: '#222',
      },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'index':
              return <AntDesign name="home" size={size} color={color} />;
            case 'wrap':
              return <Ionicons name="camera-outline" size={size} color={color} />;
            case 'groups':
              return <Ionicons name="people-outline" size={size} color={color} />;
            case 'progress':
              return <MaterialIcons name="bar-chart" size={size} color={color} />;
            case 'me':
              return <Ionicons name="person-outline" size={size} color={color} />;
            default:
              return null;
          }
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="groups" options={{ title: 'Groups' }} />
      <Tabs.Screen name="wrap" options={{ title: 'Wrap' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="me" options={{ title: 'Me' }} />
    </Tabs>
    </>
  );
}
