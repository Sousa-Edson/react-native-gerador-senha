import { Text, View, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useStorage } from "@/app/hook/useStorage";
import PasswordItem from "./components/passwordItem";
import { Ionicons } from "@expo/vector-icons";

export default function Passwords() {
  const [listPassword, setListPassword] = useState([]);

  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();

  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem("@pass");
      setListPassword(passwords);
    }
    loadPasswords();
  }, [focused]);

  async function handleDeletePassword(item: string) {
    const passwords = await removeItem("@pass", item);
    setListPassword(passwords);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas senhas</Text>
        <Text style={styles.headerSubtitle}>
          {listPassword.length}{" "}
          {listPassword.length === 1 ? "senha salva" : "senhas salvas"}
        </Text>
      </View>

      {listPassword.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="lock-open-outline" size={64} color="#333" />
          <Text style={styles.emptyTitle}>Nenhuma senha salva</Text>
          <Text style={styles.emptyText}>
            Gere e salve suas senhas na tela inicial
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={listPassword}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem
              data={item}
              removePassword={() => handleDeletePassword(item)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0d0d1a",
  },
  header: {
    backgroundColor: "#1a1a2e",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a40",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f0f0f5",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6c63ff",
    marginTop: 4,
    fontWeight: "500",
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },
  emptyText: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    lineHeight: 20,
  },
});
