import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  AppState,
  AppStateStatus,
} from "react-native";
import notifee, { EventType } from "@notifee/react-native";
import { navigator } from "../navigation/navigator";
import { scheduleNotification } from "../utils/notification";

export default function FormScreen() {
  const navigatorObj = navigator();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const appStateRef = useRef(AppState.currentState);

  async function handleAppStateChange(nextAppState: AppStateStatus) {
    const currentState = appStateRef.current;

    if (nextAppState === "background") {
      if (!name || !email) {
        console.log("Schedule notification");
        await handleScheduleNotification();
      }
    }
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleScheduleNotification = async () => {
    scheduleNotification({
      title: "Preencha os campos",
      body: "Nome e email são obrigatórios",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Voltar para Home" onPress={() => navigatorObj.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
