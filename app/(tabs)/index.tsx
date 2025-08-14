// app/(tabs)/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [showBrachot, setShowBrachot] = useState(false);

  const brachot: { title: string; he: string; en: string }[] = [
    {
      title: 'Upon putting on your arm Tefillin',
      he: 'ברוך אתה ה׳, אלוהינו מלך העולם, אשר קדשנו במצוותיו וציוונו להניח תפילין',
      en: 'Boruch Ato Ado-noy Elo-hay-nu Melech Ha-olam asher kid’shonu b’mitzvosov v’tzi-vonoo l’hani’ach tefillin.',
    },
    {
      title: 'Upon putting on your head Tefillin',
      he: 'ברוך אתה ה׳, אלוהינו מלך העולם, אשר קדשנו במצוותיו וציוונו על מצוות תפילין',
      en: 'Boruch Ato Ado-noy Elo-hay-nu Melech Ha-olam asher kid’shonu b’mitzvosov v’tzi-vonoo al mitzvas tefillin.',
    },
    {
      title: 'After putting on your head Tefillin',
      he: 'ברוך שם כבוד מלכותו לעולם ועד',
      en: 'Baruch Shem Kevod Malchuto Le’olam Va’ed.',
    },
  ];

  return (
    <ImageBackground
      source={{ uri: 'https://source.unsplash.com/1200x1800/?abstract,texture' }}
      style={styles.background}
      blurRadius={6}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Hi Wrapper!</Text>
        <Text style={styles.subtitle}>
          Are you ready? It’s time to Wrap. Save this moment and share it with your friends.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/wrap')}>
          <Text style={styles.buttonText}>Submit Your Wrap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={() => setShowBrachot(true)}>
          <Text style={styles.buttonText}>View Brachot</Text>
        </TouchableOpacity>
      </View>

      {/* Brachot Modal */}
      <Modal transparent visible={showBrachot} animationType="fade" onRequestClose={() => setShowBrachot(false)}>
        {/* Backdrop - tap to close */}
        <Pressable style={styles.backdrop} onPress={() => setShowBrachot(false)}>
          {/* Card wrapper: prevent outer press from closing */}
          <Pressable onPress={() => {}} style={styles.cardWrapper}>
            <View style={styles.card}>
              {/* Header */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>Brachot for Tefillin</Text>
              </View>

              {/* Scrollable content area */}
              <ScrollView
                style={styles.cardScroll}
                contentContainerStyle={styles.cardScrollContent}
                showsVerticalScrollIndicator={false}
              >
                {brachot.map((b, i) => (
                  <View key={i} style={styles.pair}>
                    <Text style={styles.pairTitle}>{b.title}</Text>
                    <Text style={styles.hebrew}>{b.he}</Text>
                    <Text style={styles.english}>{b.en}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Sticky footer */}
              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.button} onPress={() => setShowBrachot(false)}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </ImageBackground>
  );
}

/* ---------------- styles ---------------- */

const MAX_CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.8, 640);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'silver',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'silver',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'silver',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 24,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  /* modal */
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 540,
  },
  card: {
    width: '100%',
    maxHeight: MAX_CARD_HEIGHT, // cap the card, not the content
    backgroundColor: '#111',
    borderColor: 'silver',
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(192,192,192,0.35)',
  },
  cardHeaderText: {
    color: 'silver',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  cardScroll: {
    maxHeight: MAX_CARD_HEIGHT - 120, // leaves room for header + footer
  },
  cardScrollContent: {
    padding: 16,
    gap: 12,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(192,192,192,0.35)',
    alignItems: 'center',
    backgroundColor: '#111',
  },

  pair: {
    backgroundColor: '#000',
    borderColor: 'silver',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  pairTitle: {
    color: 'silver',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  hebrew: {
    color: 'silver',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'right',
    marginBottom: 6,
    writingDirection: 'rtl', // helps iOS
  },
  english: {
    color: 'silver',
    opacity: 0.9,
    fontSize: 14,
    lineHeight: 20,
  },
});
