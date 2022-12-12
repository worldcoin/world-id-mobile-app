/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Image } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AppsScreen from "../screens/AppsScreen";
import CredentialScreen from "../screens/CredentialScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import QRScannerScreen from "../screens/QRScannerScreen";
import WorldIDScreen from "../screens/WorldIDScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

// Tab bar icons
const CredentialsIcon = require(`../assets/images/credentials.png`);
const CredentialsIconFocused = require(`../assets/images/credentials-focused.png`);
const AppsIcon = require(`../assets/images/apps.png`);
const AppsIconFocused = require(`../assets/images/apps-focused.png`);

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          headerShown: false,
        }}
      >
        <Stack.Screen name="Credential" component={CredentialScreen} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="WorldID"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="WorldID"
        component={WorldIDScreen}
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              style={tabIconStyle}
              source={focused ? CredentialsIconFocused : CredentialsIcon}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Apps"
        component={AppsScreen}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Image
              style={tabIconStyle}
              source={focused ? AppsIconFocused : AppsIcon}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const tabIconStyle = {
  width: 24,
  height: 24,
  marginTop: 18,
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
