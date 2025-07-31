// app/(tabs)/groups.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BracketScreen from '../(screens)/bracket';
import ChainScreen from '../(screens)/chain';

export default function GroupsScreen() {
  const [activeTab, setActiveTab] = useState<'bracket' | 'chain'>('bracket');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('bracket')}
          style={[styles.tabButton, activeTab === 'bracket' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'bracket' && styles.activeTabText]}>Bracket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('chain')}
          style={[styles.tabButton, activeTab === 'chain' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'chain' && styles.activeTabText]}>Chain</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'bracket' ? <BracketScreen /> : <ChainScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 20,
  },
  tabContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  tabButton: {
    marginHorizontal: 20,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: 'silver',
  },
  tabText: {
    color: 'gray',
    fontSize: 16,
  },
  activeTabText: {
    color: 'silver',
    fontWeight: 'bold',
  },
});
