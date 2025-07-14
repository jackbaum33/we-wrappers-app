// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import UserProvider, { useUser } from './context/UserContext';
import Layout from './app/(tabs)/_layout';
import { registerForPushNotificationsAsync } from './utils/notifications';

// Optional: Handle notifications when app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const Stack = createNativeStackNavigator();

function NotificationWrapper() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync(user.uid);
    }
  }, [user]);

  return (
    <NavigationContainer>
      <Layout />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NotificationWrapper />
    </UserProvider>
  );
}
