import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entry } from "../types/Entry";

const STORAGE_KEY = "journalEntries";

export async function saveEntry(newEntry: Entry, currentEntries: Entry[]) {
  const updated = [newEntry, ...currentEntries];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export async function loadEntries(): Promise<Entry[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
