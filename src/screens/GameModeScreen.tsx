import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DuelGame } from '../components/GameMode/DuelGame';
import { Colors } from '../constants/Theme';
import { useAuthStore } from '../store/authStore';

export const GameModeScreen = () => {
  const { user, coupleId } = useAuthStore();
  
  return (
    <View style={styles.container}>
      <DuelGame coupleId={coupleId || 'demo'} userId={user?.uid || 'user1'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary[50] }
});
