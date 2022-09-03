import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

export function Home() {
  const [userName, setUserName] = useState("");
  const [repositories, setRepositories] = useState([]);

  async function handleFetchRepositories() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${userName}/repos`
      );
      const data = await response.json();
      const formattedData = data.map((repo) => repo.name);

      setRepositories(formattedData);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível encontrar um usuário com este nome");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Repositórios GitHub</Text>

        <View style={styles.form}>
          <Text style={styles.inputText}>
            Digite o nome do usuário do GitHub
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="nome"
              autoCorrect={false}
              placeholderTextColor="#9D9D9D"
              onChangeText={setUserName}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleFetchRepositories}
            >
              <Feather name="search" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.repositoriosTitle}>Lista de Repositórios</Text>

        <FlashList
          data={repositories}
          keyExtractor={(repo) => repo}
          renderItem={({ item }) => <Text style={styles.repo}>{item}</Text>}
          estimatedItemSize={30}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFBF3",

    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#79B4B7",
  },
  form: {
    marginTop: 30,
  },
  inputText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#9D9D9D",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 4,

    paddingHorizontal: 20,
    height: 50,
    flex: 1,

    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  button: {
    backgroundColor: "#79B4B7",
    height: 50,
    width: 50,
    borderRadius: 5,

    alignItems: "center",
    justifyContent: "center",

    marginLeft: 6,
  },
  content: {
    marginTop: 30,
    flex: 1,
  },
  repositoriosTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#9D9D9D",

    marginBottom: 10,
  },
  repo: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",

    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});
