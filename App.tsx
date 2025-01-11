import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation";
import { NotificationComponent } from "./src/utils/notification";

export default function App() {
  return (
    <NavigationContainer>
      <NotificationComponent />
      <AppNavigator />
    </NavigationContainer>
  );
}
