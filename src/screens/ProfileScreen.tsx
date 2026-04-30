import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Theme';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

export const ProfileScreen = () => {
  const { logout, user } = useAuthStore();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 40 }}>??</Text>
        </View>
        <Text style={styles.name}>{user?.displayName || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>0</Text>
          <Text style={styles.statLabel}>Dates</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>0</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
      </View>
      
      <Button title="Logout" onPress={logout} variant="danger" style={{ marginTop: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary[50], padding: 20, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  name: { fontSize: 24, fontFamily: 'Nunito-Bold' },
  email: { color: '#666' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', padding: 20, borderRadius: 16 },
  statBox: { alignItems: 'center' },
  statVal: { fontSize: 20, fontFamily: 'Nunito-ExtraBold', color: Colors.primary[500] },
  statLabel: { color: '#666' }
});
