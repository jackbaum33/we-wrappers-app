// app/(screens)/streak.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Share, Modal, Image } from 'react-native';
import StreakCalendar from '../../components/StreakCalendar';

// Helper: compute current streak ending today (YYYY-MM-DD)
function getCurrentStreak(dates: string[]): number {
  if (!dates?.length) return 0;
  const set = new Set(dates);
  const d = new Date(); // today (device local)
  let count = 0;

  const toKey = (dt: Date) => dt.toISOString().slice(0, 10);

  // Count consecutive days including today going backwards
  const cursor = new Date(d);
  while (set.has(toKey(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return count;
}

export default function StreakScreen() {
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchMockStreaks = async () => {
      await new Promise((res) => setTimeout(res, 700)); // Simulate delay
      setDates([
        '2025-07-10',
        '2025-07-11',
        '2025-07-12',
        '2025-07-13',
        '2025-07-31',
        '2025-07-30',
        '2025-07-29',
        // add today to see streak grow; example:
        // new Date().toISOString().slice(0, 10),
      ]);
      setLoading(false);
    };

    fetchMockStreaks();
  }, []);

  const currentStreak = useMemo(() => getCurrentStreak(dates), [dates]);

  const shareStreak = async () => {
    try {
      await Share.share({
        message: `I currently have a wrap streak of ${currentStreak} on Wrap — can you beat me?`,
      });
    } catch (e) {
      // ignore
    }
  };

  // Mock image URL for a given date
  const selectedImageUri = selectedDate
    ? `https://picsum.photos/seed/${encodeURIComponent(selectedDate)}/800/1200`
    : null;

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} color="silver" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Streak</Text>

      <StreakCalendar
        wrappedDates={dates}
        onDayPress={(dateString) => setSelectedDate(dateString)}
      />

      <View style={styles.footer}>
        <Text style={styles.streakText}>
          Current Streak: <Text style={styles.streakNumber}>{currentStreak}</Text>
        </Text>

        <TouchableOpacity style={styles.shareButton} onPress={shareStreak}>
          <Text style={styles.shareButtonText}>Share Streak</Text>
        </TouchableOpacity>
      </View>

      {/* Mocked day image viewer */}
      <Modal
        transparent={true}
        visible={!!selectedDate}
        animationType="fade"
        onRequestClose={() => setSelectedDate(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedDate}</Text>
            {selectedImageUri ? (
              <Image source={{ uri: selectedImageUri }} style={styles.modalImage} />
            ) : (
              <Text style={styles.modalText}>No image available for this day.</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedDate(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const CARD_RADIUS = 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'silver',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  streakText: {
    color: 'silver',
    fontSize: 16,
    marginBottom: 10,
  },
  streakNumber: {
    color: 'orange',
    fontWeight: 'bold',
  },
  shareButton: {
    marginTop: 4,
    backgroundColor: 'silver',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  shareButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },

  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '88%',
    maxWidth: 420,
    backgroundColor: '#111',
    borderColor: 'silver',
    borderWidth: 1,
    borderRadius: CARD_RADIUS,
    padding: 14,
  },
  modalTitle: {
    color: 'silver',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 360,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  modalText: {
    color: 'silver',
    textAlign: 'center',
    paddingVertical: 12,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 12,
    backgroundColor: 'silver',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
