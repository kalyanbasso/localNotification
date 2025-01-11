import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./index";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, "Home">;

export function navigator() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return {
    navigateToFormScreen: () => navigation.navigate("FormScreen"),
    navigateToHomeScreen: () => navigation.navigate("Home"),
    navigateToShowCaseScreen: () => navigation.navigate("ShowCaseScreen"),
    goBack: () => navigation.goBack(),
  };
}
