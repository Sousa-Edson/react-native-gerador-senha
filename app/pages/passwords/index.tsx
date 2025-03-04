import { Text, View, StyleSheet,FlatList } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useStorage } from "@/app/hook/useStorage";
import PasswordItem from "./components/passwordItem";

export default function Passwords() {
  const [listPassword, setListPassword] = useState([]);

  const focused = useIsFocused();
  const {getItem,removeItem} = useStorage(); 

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Senhas salvas</Text>
      </View>
      <View style={styles.container}>
        <FlatList 
        style={{flex:1,paddingTop:14}}
          data={listPassword}
          keyExtractor={(item)=>String(item)}
          renderItem={({ item }) => (
          <PasswordItem data={item} removePassword={() => handleDeletePassword(item)}/>
          )} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#392de9",
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
      flex:1,
      paddingLeft: 14,
      paddingRight: 14,
  }
});
