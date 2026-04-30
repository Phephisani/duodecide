import { useEffect, useState, useCallback } from 'react';
import { ref, onValue, set, update, off } from 'firebase/database';
import { rtdb } from '../config/firebase';
import { GameSession } from '../types';

export const useRealtimeGame = (coupleId: string, userId: string) => {
  const [gameState, setGameState] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const gameRef = ref(rtdb, "games/" + coupleId);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        setGameState(snapshot.val() as GameSession);
      } else {
        setGameState(null);
      }
    });

    return () => off(gameRef, 'value', unsubscribe);
  }, [coupleId]);

  const createGame = useCallback(async (optionA: string, optionB: string) => {
    setLoading(true);
    try {
      const gameRef = ref(rtdb, "games/" + coupleId);
      const newGame: GameSession = {
        gameId: coupleId,
        coupleId,
        gameType: 'duel',
        status: 'active',
        options: { optionA, optionB, suggestedBy: userId },
        votes: { partner1: null, partner2: null },
      };
      await set(gameRef, newGame);
    } catch (err) {
      setError('Failed to create game');
    } finally {
      setLoading(false);
    }
  }, [coupleId, userId]);

  const submitVote = useCallback(async (vote: 'A' | 'B') => {
    if (!gameState) return;
    setLoading(true);
    try {
      const gameRef = ref(rtdb, "games/" + coupleId);
      const isPartner1 = gameState.options?.suggestedBy === userId;
      const voteKey = isPartner1 ? 'partner1' : 'partner2';
      const updatedVotes = { ...gameState.votes, [voteKey]: vote };
      
      if (updatedVotes.partner1 && updatedVotes.partner2) {
        let winner: 'A' | 'B' | 'tie' = updatedVotes.partner1 === updatedVotes.partner2 ? updatedVotes.partner1 : 'tie';
        await update(gameRef, { votes: updatedVotes, status: 'completed', winner });
      } else {
        await update(gameRef, { votes: updatedVotes });
      }
    } catch (err) {
      setError('Failed to submit vote');
    } finally {
      setLoading(false);
    }
  }, [coupleId, gameState, userId]);

  return { gameState, loading, error, createGame, submitVote };
};
