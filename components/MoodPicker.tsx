import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  selectedMood: string;
  onSelect: (mood: string) => void;
};

export default function MoodPicker({ selectedMood, onSelect }: Props) {
  const moods = ["😊", "😐", "😢", "😡", "😴"];

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood}
          onPress={() => onSelect(mood)}
          style={selectedMood === mood ? styles.selected : styles.unselected}
        >
          <Text style={styles.emoji}>{mood}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  emoji: { fontSize: 24 },
  selected: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 10,
    backgroundColor: "#d0e8ff",
  },
  unselected: { padding: 10, borderWidth: 1, borderRadius: 10 },
});
