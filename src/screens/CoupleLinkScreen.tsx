import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Share } from 'react-native';
import { Colors } from '../constants/Theme';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

export const CoupleLinkScreen = ({ navigation }: any) => {
  const [partnerCode, setPartnerCode] = useState('');
  const user = useAuthStore((state) => state.user);

  const shareCode = async () => {
    try {
      if (user) {
        await Share.share({
          message: "Join me on DuoDecide! My pairing code is: " + user.uid,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partner Up! ??</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Your Code</Text>
        <Text style={styles.code}>{user?.uid || 'Loading...'}</Text>
        <Button title="Share Code" onPress={shareCode} variant="secondary" />
      </View>

      <Text style={styles.or}>- OR -</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Enter Partner's Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste code here"
          value={partnerCode}
          onChangeText={setPartnerCode}
        />
        <Button 
          title="Link Accounts" 
          onPress={() => navigation.navigate('MainApp')} 
          disabled={!partnerCode} 
        />
      </View>
      <View style={{marginTop: 20}}>
        <Button title="Skip for now" onPress={() => navigation.navigate('MainApp')} variant="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary[50], padding: 24, justifyContent: 'center' },
  title: { fontSize: 32, fontFamily: 'Nunito-ExtraBold', textAlign: 'center', marginBottom: 40, color: Colors.primary[600] },
  card: { backgroundColor: 'white', padding: 24, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 2 },
  label: { fontSize: 16, color: Colors.secondary[500], marginBottom: 12, fontFamily: 'Nunito-SemiBold' },
  code: { fontSize: 24, fontFamily: 'Nunito-Bold', color: Colors.primary[500], textAlign: 'center', marginBottom: 20, letterSpacing: 2 },
  or: { textAlign: 'center', marginVertical: 24, color: Colors.secondary[400], fontFamily: 'Nunito-SemiBold' },
  input: { backgroundColor: Colors.secondary[50], padding: 16, borderRadius: 12, fontSize: 16, fontFamily: 'Nunito-Regular', marginBottom: 20 },
});
