import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../constants/Theme';
import { QuestionBank } from '../constants/Questions';

export const QuestionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discovery Questions</Text>
      <FlatList
        data={QuestionBank}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.text}>{item.questionText}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary[50], paddingTop: 60 },
  title: { fontSize: 24, fontFamily: 'Nunito-ExtraBold', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  emoji: { fontSize: 24, marginRight: 16 },
  text: { fontSize: 16, flex: 1, color: '#333' }
});
