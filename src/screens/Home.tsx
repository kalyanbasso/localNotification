import { View, Text, Button, StyleSheet } from "react-native";
import { navigator } from "../navigation/navigator";
export default function Home() {
  const navigatorObj = navigator();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      <Button
        title="Criar Novo Cadastro"
        onPress={() => navigatorObj.navigateToFormScreen()}
      />
      <Button
        title="Mais funcionalidades"
        onPress={() => navigatorObj.navigateToShowCaseScreen()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
