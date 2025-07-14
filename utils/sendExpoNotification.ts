// we-wrappers-app/utils/sendExpoNotification.ts

type PushMessage = {
    title: string;
    body: string;
  };
  
  /**
   * Sends a push notification using Expo's push notification API.
   */
  export const sendPushNotification = async (
    expoPushToken: string,
    message: PushMessage
  ) => {
    const payload = {
      to: expoPushToken,
      sound: 'default',
      title: message.title,
      body: message.body,
      data: { timestamp: new Date().toISOString() },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  };
  