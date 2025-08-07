import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entry } from "../types/Entry";

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <View style={styles.card}>
      <Text style={styles.date}>
        {entry.date} - {entry.mood}
      </Text>
      <Text style={styles.prompt}>{entry.prompt}</Text>
      <Text>{entry.entry}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  date: { fontWeight: "bold" },
  prompt: { fontStyle: "italic", marginBottom: 5 },
});
