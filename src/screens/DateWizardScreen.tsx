import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { MoodSelector } from '../components/DateWizard/MoodSelector';
import { Colors } from '../constants/Theme';
import { Button } from '../components/ui/Button';
import { Mood } from '../types';

export const DateWizardScreen = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  
  return (
    <ScrollView style={styles.container}>
      <MoodSelector 
        selectedMood={selectedMood} 
        onSelect={setSelectedMood} 
        isPartner={false} 
      />
      <View style={{ padding: 20 }}>
        <Button 
          title="Continue" 
          onPress={() => {}} 
          disabled={!selectedMood} 
          size="large" 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary[50] }
});
