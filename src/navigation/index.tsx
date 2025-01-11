import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import FormScreen from "../screens/FormScreen";
import ShowCaseScreen from "../screens/ShowCaseScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  FormScreen: undefined;
  ShowCaseScreen: undefined;
};

export default function AppNavigator() {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="FormScreen" component={FormScreen} />
      <Screen name="ShowCaseScreen" component={ShowCaseScreen} />
    </Navigator>
  );
}
