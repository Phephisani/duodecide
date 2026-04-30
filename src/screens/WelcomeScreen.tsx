import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../constants/Theme';
import { Button } from '../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

export const WelcomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} style={styles.illustrationContainer}>
        <View style={styles.illustration}>
          <Text style={styles.emoji}>??</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300)} style={styles.content}>
        <Text style={styles.title}>DuoDecide</Text>
        <Text style={styles.subtitle}>
          Turn "I don't know, what do you want to do?" into fun decisions together
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600)} style={styles.buttons}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('CoupleLink')}
          size="large"
        />
        <Text style={styles.tagline}>
          Made for couples who can't decide • Free to use
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary[50], alignItems: 'center', justifyContent: 'center', padding: 24 },
  illustrationContainer: { marginBottom: 32 },
  illustration: { width: 200, height: 200, backgroundColor: Colors.primary[100], borderRadius: 100, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 80 },
  content: { alignItems: 'center', marginBottom: 48 },
  title: { fontFamily: 'Nunito-ExtraBold', fontSize: 42, color: Colors.primary[600], marginBottom: 16 },
  subtitle: { fontFamily: 'Nunito-Regular', fontSize: 18, color: Colors.secondary[600], textAlign: 'center', lineHeight: 26 },
  buttons: { width: '100%', alignItems: 'center', gap: 16 },
  tagline: { fontFamily: 'Nunito-Regular', fontSize: 12, color: Colors.secondary[500], marginTop: 16 },
});
