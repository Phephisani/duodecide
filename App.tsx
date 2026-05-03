import 'react-native-reanimated';
console.log('App.tsx: Root rendering started');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { AppNavigator } from './src/navigation/AppNavigator';
import { auth } from './src/config/firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useAuthStore } from './src/store/authStore';

export default function App() {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);

  const [fontsLoaded] = [true];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => { if (user) { setUser(user); console.log('App.tsx: Auth state changed', user.uid); setLoading(false); } else { try { console.log('App.tsx: No user found, signing in anonymously...'); await signInAnonymously(auth); } catch (error) { console.error('Anonymous auth failed', error); setLoading(false); } } });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdf4f1' }}>
        <ActivityIndicator size="large" color="#d96536" />
      </View>
    );
  }

  return (
    <SafeAreaProvider><GestureHandlerRootView style={{ flex: 1 }}><NavigationContainer>
      <StatusBar style="dark" />
      <AppNavigator />
    </NavigationContainer></GestureHandlerRootView></SafeAreaProvider>
  );
}

