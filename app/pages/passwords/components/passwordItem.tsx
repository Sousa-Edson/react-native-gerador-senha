import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

interface PasswordItemProps {
  data: string;
  removePassword: () => void;
}

export default function PasswordItem({
  data,
  removePassword,
}: PasswordItemProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 15 && Math.abs(gs.dy) < 15,
      onPanResponderMove: (_, gs) => {
        if (gs.dx < 0) {
          translateX.setValue(Math.max(gs.dx, -120));
        }
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dx < -80) {
          Animated.timing(translateX, {
            toValue: -120,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            Alert.alert(
              "Excluir senha",
              "Tem certeza que deseja excluir esta senha?",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                  onPress: () => {
                    Animated.spring(translateX, {
                      toValue: 0,
                      useNativeDriver: true,
                    }).start();
                  },
                },
                {
                  text: "Excluir",
                  style: "destructive",
                  onPress: removePassword,
                },
              ]
            );
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  async function handleCopy() {
    await Clipboard.setStringAsync(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.deleteBackground}>
        <Ionicons name="trash-outline" size={24} color="#fff" />
        <Text style={styles.deleteText}>Excluir</Text>
      </View>

      <Animated.View
        style={[styles.container, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <Pressable onLongPress={handleCopy} style={styles.content}>
          <View style={styles.left}>
            <Ionicons
              name="lock-closed"
              size={18}
              color="#6c63ff"
              style={styles.lockIcon}
            />
            <Text style={styles.text} numberOfLines={1}>
              {isPasswordVisible ? data : "•".repeat(Math.min(data.length, 20))}
            </Text>
            {copied && (
              <View style={styles.copiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#2ed573" />
                <Text style={styles.copiedText}>Copiado</Text>
              </View>
            )}
          </View>
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            hitSlop={8}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#888"
            />
          </Pressable>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  deleteBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 120,
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  container: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a2a40",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  lockIcon: {
    marginRight: 2,
  },
  text: {
    color: "#f0f0f5",
    fontSize: 16,
    fontFamily: "monospace",
    letterSpacing: 1,
    flex: 1,
  },
  copiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(46, 213, 115, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  copiedText: {
    color: "#2ed573",
    fontSize: 12,
    fontWeight: "600",
  },
});
