import Slider from "@react-native-community/slider";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import ModalPassword from "@/app/components/modal";
import { Ionicons } from "@expo/vector-icons";

const charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

export default function Home() {
  const [size, setSize] = useState(12);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  function generatePassword() {
    let password = "";
    for (let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setPasswordValue(password);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/logo.png")}
        />
        <Text style={styles.appName}>Gerador de Senhas</Text>
        <Text style={styles.appDesc}>Crie senhas fortes e seguras</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Comprimento: {size} caracteres</Text>

        <Slider
          style={{ height: 40, width: "100%" }}
          minimumValue={6}
          maximumValue={30}
          maximumTrackTintColor="#2a2a40"
          minimumTrackTintColor="#6c63ff"
          thumbTintColor="#6c63ff"
          value={size}
          onValueChange={(value) => setSize(parseInt(value.toFixed(0)))}
        />

        <View style={styles.sizeRow}>
          <Text style={styles.sizeLimit}>6</Text>
          <Text style={styles.sizeLimit}>30</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Ionicons name="flash" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword
          password={passwordValue}
          handleClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0d0d1a",
    paddingHorizontal: 24,
  },
  logoArea: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    marginBottom: 16,
    tintColor: "#6c63ff",
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#f0f0f5",
    letterSpacing: 0.5,
  },
  appDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  card: {
    width: "100%",
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2a2a40",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f0f0f5",
    marginBottom: 12,
  },
  sizeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  sizeLimit: {
    fontSize: 12,
    color: "#666",
  },
  button: {
    backgroundColor: "#6c63ff",
    width: "100%",
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    shadowColor: "#6c63ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
