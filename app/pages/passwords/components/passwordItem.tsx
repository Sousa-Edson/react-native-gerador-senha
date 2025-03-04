import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PasswordItemProps {
  data: string;
  removePassword: () => void;
}

export default function PasswordItem({ data, removePassword }: PasswordItemProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Pressable onLongPress={removePassword} style={styles.container}>
      
      <Text style={styles.text}>{isPasswordVisible ? data : "********"}</Text>

      <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        <Ionicons 
          name={isPasswordVisible ? "eye-off" : "eye"} 
          size={24} 
          color="#fff" 
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
