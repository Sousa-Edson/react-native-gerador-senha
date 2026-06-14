import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useStorage } from "@/app/hook/useStorage";
import { Ionicons } from "@expo/vector-icons";

interface ModalPasswordProps {
  password: string;
  handleClose: () => void;
}

export default function ModalPassword({
  password,
  handleClose,
}: ModalPasswordProps) {
  const { saveItem } = useStorage();

  async function handleCopyPassword() {
    await Clipboard.setStringAsync(password);
    await saveItem("@pass", password);
    handleClose();
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="key" size={32} color="#6c63ff" />
        </View>
        <Text style={styles.title}>Senha gerada</Text>

        <View style={styles.passwordBox}>
          <Text style={styles.passwordText} selectable>
            {password}
          </Text>
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleCopyPassword}
          >
            <Ionicons
              name="copy-outline"
              size={18}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.buttonSaveText}>Copiar e salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  content: {
    backgroundColor: "#1a1a2e",
    width: "85%",
    padding: 24,
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2a2a40",
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(108, 99, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f0f0f5",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  passwordBox: {
    backgroundColor: "#0d0d1a",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a40",
  },
  passwordText: {
    color: "#6c63ff",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "monospace",
    letterSpacing: 2,
  },
  buttonArea: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a40",
  },
  buttonText: {
    color: "#888",
    fontSize: 15,
    fontWeight: "600",
  },
  buttonSave: {
    backgroundColor: "#6c63ff",
    borderColor: "#6c63ff",
    flexDirection: "row",
  },
  buttonSaveText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
