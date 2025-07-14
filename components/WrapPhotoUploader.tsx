// we-wrappers-app/components/WrapPhotoUploader.tsx
import React from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../context/UserContext';
import { uploadWrapPhoto } from '../firebase/storageHelpers';
import { submitWrap } from '../firebase/wraps';

export default function WrapPhotoUploader() {
  const [image, setImage] = React.useState<string | null>(null);
  const { user } = useUser();

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);

      if (user) {
        try {
          const downloadUrl = await uploadWrapPhoto(uri, user.uid);
          await submitWrap(user.uid, downloadUrl);
          Alert.alert("Wrap Submitted", "Your tefillin wrap has been logged.");
        } catch (error) {
          console.error("Upload error:", error);
          Alert.alert("Error", "Failed to upload wrap photo.");
        }
      }
    }
  };

  return (
    <View>
      <Button title="Take Wrap Photo" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, marginTop: 10, borderRadius: 8 }}
        />
      )}
    </View>
  );
}
