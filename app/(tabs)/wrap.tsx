import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function WrapScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [savingPermission, requestSavingPermission] = MediaLibrary.usePermissions(); // optional for save
  const cameraRef = useRef<CameraView>(null);

  const [facing, setFacing] = useState<'back' | 'front'>('back'); // 👈 flip support
  const [isPreview, setIsPreview] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isTaking, setIsTaking] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // 👈 new

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="silver" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>We need camera access to take your daily wrap photo.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    try {
      setIsTaking(true);
      const result = await cameraRef.current?.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });
      if (result?.uri) {
        setPhotoUri(result.uri);
        setIsPreview(true);
      }
    } catch (e) {
      console.warn('Failed to take picture:', e);
    } finally {
      setIsTaking(false);
    }
  };

  const retake = () => {
    setPhotoUri(null);
    setIsPreview(false);
  };

  const saveToLibrary = async () => {
    try {
      if (!savingPermission?.granted) {
        const { granted } = await requestSavingPermission();
        if (!granted) return;
      }
      if (photoUri) {
        await MediaLibrary.saveToLibraryAsync(photoUri);
      }
    } catch (e) {
      console.warn('Failed to save image:', e);
    }
  };

  const flipCamera = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  // 👇 Mock "upload" flow: show spinner, alert, navigate away
  const uploadMock = async () => {
    if (!photoUri) return;
    try {
      setIsUploading(true);
      // simulate upload
      await new Promise((res) => setTimeout(res, 1500));
      Alert.alert('Wrap submitted!', 'Great job staying consistent today.');
      // "Turn off" camera by leaving screen
      router.replace('/progress');
    } catch (e) {
      console.warn('Upload failed:', e);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take a Picture, It'll Last Longer!</Text>
      <Text style={styles.subtitle}>Please Submit your Photo Using the Camera Below</Text>

      {/* Viewfinder Card (smaller camera area) */}
      {!isPreview ? (
        <View style={styles.viewfinderCard}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            enableTorch={false}
          />

          {/* Flip button overlay in top-right of the viewfinder */}
          <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
            <Ionicons name="camera-reverse-outline" size={22} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.viewfinderCard}>
          {photoUri ? <Image source={{ uri: photoUri }} style={styles.preview} /> : null}
        </View>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        {!isPreview ? (
          <TouchableOpacity
            style={[styles.button, (isTaking || isUploading) && { opacity: 0.6 }]}
            onPress={takePicture}
            disabled={isTaking || isUploading}
          >
            <Text style={styles.buttonText}>{isTaking ? 'Capturing…' : 'Take Photo'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.previewButtons}>
            <TouchableOpacity
              style={[styles.buttonSecondary, (isTaking || isUploading) && { opacity: 0.6 }]}
              onPress={retake}
              disabled={isTaking || isUploading}
            >
              <Text style={styles.buttonTextDark}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonSecondary, (isTaking || isUploading) && { opacity: 0.6 }]}
              onPress={saveToLibrary}
              disabled={isTaking || isUploading}
            >
              <Text style={styles.buttonTextDark}>Save to Photos</Text>
            </TouchableOpacity>

            {/* NEW Upload Button */}
            <TouchableOpacity
              style={[styles.button, isUploading && { opacity: 0.6 }]}
              onPress={uploadMock}
              disabled={isUploading}
            >
              {isUploading ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text style={styles.buttonText}>Upload</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const VIEWFINDER_MAX_WIDTH = 340; // keep the camera smaller
const VIEWFINDER_ASPECT = 3 / 4;  // nice portrait-ish ratio

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', padding: 16 },
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', padding: 16,
  },
  title: {
    marginTop: 75, color: 'silver', fontSize: 25, fontWeight: 'bold', marginBottom: 12, textAlign: 'center',
  },
  subtitle: {
    marginTop: 5, color: 'white', fontSize: 15, fontWeight: '200', marginBottom: 12, textAlign: 'center',
  },
  text: { color: 'silver', textAlign: 'center', marginBottom: 16 },

  viewfinderCard: {
    marginTop: 50,
    alignSelf: 'center',
    width: '92%',
    maxWidth: VIEWFINDER_MAX_WIDTH,
    aspectRatio: VIEWFINDER_ASPECT,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#111',
  },
  camera: { flex: 1 },
  preview: { width: '100%', height: '100%', resizeMode: 'cover' },

  flipButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'silver',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
    opacity: 0.9,
  },

  controls: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',   // allow wrapping on small screens
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'silver',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#ddd',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: { color: 'black', fontWeight: 'bold' },
  buttonTextDark: { color: '#000', fontWeight: 'bold' },
});
