import React from 'react';
import { View, Text } from 'react-native';

export default function WrapScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Submit Your Daily Wrap
      </Text>

      <View
        style={{
          padding: 20,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>🖼️ Photo uploader goes here (mocked for testing)</Text>
      </View>
    </View>
  );
}
