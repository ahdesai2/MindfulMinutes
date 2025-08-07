import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { Entry } from "./types/Entry";
import { getRandomPrompt } from "./utils/prompts";
import { loadEntries, saveEntry } from "./utils/storage";
import MoodPicker from "./components/MoodPicker";
import EntryCard from "./components/EntryCard";

export default function App() {
  const [mood, setMood] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [entry, setEntry] = useState<string>("");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    setPrompt(getRandomPrompt());
    (async () => setEntries(await loadEntries()))();
  }, []);

  const handleSave = async () => {
    if (!mood || !entry.trim()) {
      Alert.alert("Missing info", "Please select a mood and write something.");
      return;
    }
    const newEntry: Entry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      mood,
      entry,
      prompt,
    };
    const updated = await saveEntry(newEntry, entries);
    setEntries(updated);
    setEntry("");
    setMood("");
    setPrompt(getRandomPrompt());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mindful Minutes</Text>
      <Text style={styles.prompt}>📝 {prompt}</Text>

      <Text style={styles.label}>How do you feel?</Text>
      <MoodPicker selectedMood={mood} onSelect={setMood} />

      <TextInput
        style={styles.input}
        placeholder="Write something short..."
        value={entry}
        onChangeText={setEntry}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EntryCard entry={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  prompt: { fontSize: 16, marginBottom: 10 },
  label: { fontSize: 18, marginVertical: 10 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    height: 100,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
