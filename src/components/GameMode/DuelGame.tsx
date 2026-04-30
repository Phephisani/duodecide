import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';
import { Colors } from '../../constants/Theme';
import { Button } from '../ui/Button';
import { useRealtimeGame } from '../../hooks/useRealtimeGame';

interface DuelGameProps {
  coupleId: string;
  userId: string;
}

export const DuelGame: React.FC<DuelGameProps> = ({ coupleId, userId }) => {
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [gamePhase, setGamePhase] = useState<'setup' | 'waiting' | 'voting' | 'result'>('setup');
  
  const { gameState, createGame, submitVote, loading } = useRealtimeGame(coupleId, userId);
  const rotation = useSharedValue(0);
  
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    if (gamePhase === 'waiting') {
      rotation.value = withRepeat(
        withSequence(
          withSpring(360, { duration: 1000 }),
          withSpring(0, { duration: 0 })
        ),
        -1,
        false
      );
    } else {
      rotation.value = 0;
    }
  }, [gamePhase]);

  useEffect(() => {
    if (gameState) {
      if (gameState.status === 'active') setGamePhase('voting');
      else if (gameState.status === 'completed') setGamePhase('result');
    }
  }, [gameState]);

  const handleCreateGame = async () => {
    if (optionA.trim() && optionB.trim()) {
      await createGame(optionA.trim(), optionB.trim());
      setGamePhase('waiting');
    }
  };

  const handleVote = async (vote: 'A' | 'B') => {
    await submitVote(vote);
  };

  if (gamePhase === 'setup') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>The Duel ??</Text>
        <Text style={styles.subtitle}>Can't decide? Let fate choose!</Text>
        <TextInput
          style={styles.input}
          placeholder="Option A"
          value={optionA}
          onChangeText={setOptionA}
        />
        <Text style={styles.vsText}>VS</Text>
        <TextInput
          style={styles.input}
          placeholder="Option B"
          value={optionB}
          onChangeText={setOptionB}
        />
        <Button title="Start Duel!" onPress={handleCreateGame} isLoading={loading} style={{ marginTop: 24 }} />
      </View>
    );
  }

  if (gamePhase === 'waiting') {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.spinner, spinStyle]}>
          <Text style={{ fontSize: 64 }}>??</Text>
        </Animated.View>
        <Text style={styles.waitingText}>Waiting for partner...</Text>
      </View>
    );
  }

  if (gamePhase === 'voting') {
    return (
      <View style={styles.container}>
        <Text style={styles.voteTitle}>Cast Your Vote!</Text>
        <TouchableOpacity style={[styles.voteCard, { backgroundColor: Colors.accent.lavender[500] }]} onPress={() => handleVote('A')}>
          <Text style={styles.voteCardText}>{gameState?.options?.optionA}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.voteCard, { backgroundColor: Colors.accent.green[500] }]} onPress={() => handleVote('B')}>
          <Text style={styles.voteCardText}>{gameState?.options?.optionB}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultTitle}>{gameState?.winner === 'tie' ? 'Tie!' : 'Winner!'}</Text>
      <Text style={styles.winnerText}>{gameState?.winner === 'A' ? gameState.options?.optionA : gameState?.options?.optionB}</Text>
      <Button title="Duel Again" onPress={() => setGamePhase('setup')} variant="secondary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1 },
  title: { fontSize: 32, fontFamily: 'Nunito-ExtraBold', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  vsText: { textAlign: 'center', fontSize: 24, marginVertical: 10 },
  spinner: { alignSelf: 'center', marginVertical: 60 },
  waitingText: { textAlign: 'center', fontSize: 20 },
  voteTitle: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  voteCard: { padding: 24, borderRadius: 20, marginBottom: 16 },
  voteCardText: { color: 'white', fontSize: 18, textAlign: 'center' },
  resultTitle: { fontSize: 36, textAlign: 'center' },
  winnerText: { fontSize: 24, textAlign: 'center', marginVertical: 20 }
});
