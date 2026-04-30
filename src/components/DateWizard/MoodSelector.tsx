import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../constants/Theme';
import { Mood } from '../../types';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
  partnerMood?: Mood | null;
  isPartner: boolean;
}

const moods: { id: Mood; label: string; icon: string; color: string }[] = [
  { id: 'adventurous', label: 'Adventurous', icon: '??', color: '#FF6B6B' },
  { id: 'relaxed', label: 'Relaxed', icon: '?', color: '#4ECDC4' },
  { id: 'romantic', label: 'Romantic', icon: '??', color: '#D96536' },
  { id: 'funny', label: 'Funny', icon: '??', color: '#FFE66D' },
  { id: 'active', label: 'Active', icon: '??', color: '#95E1D3' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelect,
  partnerMood,
  isPartner,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's the vibe today?</Text>
      <Text style={styles.subtitle}>Choose your mood</Text>
      
      <View style={styles.grid}>
        {moods.map((mood, index) => (
          <Animated.View
            key={mood.id}
            entering={FadeInUp.delay(index * 100)}
            style={styles.moodWrapper}
          >
            <TouchableOpacity
              style={[
                styles.moodCard,
                selectedMood === mood.id && styles.selectedCard,
                partnerMood === mood.id && styles.partnerSelected,
              ]}
              onPress={() => onSelect(mood.id)}
              disabled={isPartner}
            >
              <View style={[styles.iconContainer, { backgroundColor: mood.color + '20' }]}>
                <Text style={styles.icon}>{mood.icon}</Text>
              </View>
              <Text style={styles.moodLabel}>{mood.label}</Text>
              
              {partnerMood === mood.id && (
                <View style={styles.partnerBadge}>
                  <Text style={styles.partnerText}>Partner's pick</Text>
                </View>
              )}
              
              {selectedMood === mood.id && partnerMood === mood.id && (
                <View style={styles.matchBadge}>
                  <Text style={styles.matchText}>? Match!</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 28,
    color: Colors.primary[700],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.secondary[500],
    textAlign: 'center',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  moodWrapper: {
    width: '45%',
    aspectRatio: 1,
  },
  moodCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary[700],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 3,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedCard: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  partnerSelected: {
    borderColor: Colors.accent.green[500],
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
  },
  moodLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: Colors.primary[700],
  },
  partnerBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.accent.green[500],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  partnerText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 10,
    color: Colors.white,
  },
  matchBadge: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: Colors.accent.lavender[500],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 10,
    color: Colors.white,
  },
});
