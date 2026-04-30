import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Colors } from '../../constants/Theme';

interface ConfettiCelebrationProps {
  trigger: boolean;
  onFinish?: () => void;
}

export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({ trigger, onFinish }) => {
  const confettiRef = useRef<any>(null);

  useEffect(() => {
    if (trigger && confettiRef.current) {
      confettiRef.current.start();
    }
  }, [trigger]);

  if (!trigger) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <ConfettiCannon
        ref={confettiRef}
        count={100}
        origin={{ x: -10, y: 0 }}
        autoStart={false}
        fadeOut={true}
        colors={[
          Colors.primary[500],
          Colors.accent.green[500],
          Colors.accent.lavender[500],
          Colors.primary[300],
          Colors.accent.green[300],
        ]}
        onAnimationEnd={onFinish}
      />
      <ConfettiCannon
        count={100}
        origin={{ x: 400, y: 0 }}
        autoStart={trigger}
        fadeOut={true}
        colors={[
          Colors.primary[500],
          Colors.accent.green[500],
          Colors.accent.lavender[500],
          Colors.primary[300],
          Colors.accent.green[300],
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});
