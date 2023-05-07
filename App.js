import React from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MavenPro_400Regular, MavenPro_500Medium, MavenPro_600SemiBold, MavenPro_700Bold, MavenPro_800ExtraBold, useFonts } from "@expo-google-fonts/maven-pro";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//screens
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import ApprovalScreen from "./app/screens/ApprovalScreen";
import ShipmentsScreen from "./app/screens/ShipmentsScreen";
import ViewShipmentScreen from "./app/screens/ViewShipmentScreen";
import ScanShipmentScreen from "./app/screens/ScanShipmentScreen";

//config
import Colors from "./app/config/Colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // Font
  const [fontsLoaded] = useFonts({
    MavenPro_400Regular,
    MavenPro_500Medium,
    MavenPro_600SemiBold,
    MavenPro_700Bold,
    MavenPro_800ExtraBold,
  });

  if (!fontsLoaded)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={RFPercentage(6)} color={Colors.primary} />
      </View>
    );

  // Bottom Tab
  const HomeTab = ({ route, navigation }) => {
    const { auth_key } = route.params;

    return (
      <Tab.Navigator
        initialRouteName="ShipmentsScreen"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: { height: RFPercentage(10) },
          showLabel: false,
          // style: { height: RFPercentage(20) },
          tabStyle: { backgroundColor: Colors.white },
          // activeTintColor: Colors.primary,
          tabBarActiveTintColor: "#f77c37",
          tabBarInactiveTintColor: "#051441",
        }}
      >
        <Tab.Screen
          name="Shipments"
          // options={{ header: () => null }}
          initialParams={{ auth_key }}
          options={{
            header: () => null,
            tabBarLabelStyle: {
              fontSize: RFPercentage(1.3),
              top: Platform.OS == "android" ? RFPercentage(-2) : RFPercentage(0.2),
            },
            tabBarIcon: ({ color }) => <Feather name="box" color={color} style={{ fontSize: RFPercentage(3.2) }} />,
          }}
          component={ShipmentsScreen}
        />
        <Tab.Screen
          name="View Shipments"
          // options={{ header: () => null }}
          component={ViewShipmentScreen}
          initialParams={{ auth_key }}
          options={{
            header: () => null,
            tabBarLabelStyle: {
              fontSize: RFPercentage(1.3),
              top: Platform.OS == "android" ? RFPercentage(-2) : RFPercentage(0.2),
            },
            tabBarIcon: ({ color }) => <MaterialIcons name="view-in-ar" color={color} style={{ fontSize: RFPercentage(3.2) }} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          // options={{ header: () => null }}
          component={ShipmentsScreen}
          initialParams={{ auth_key }}
          options={{
            header: () => null,
            tabBarLabelStyle: {
              fontSize: RFPercentage(1.3),
              top: Platform.OS == "android" ? RFPercentage(-2) : RFPercentage(0.2),
            },
            tabBarIcon: ({ color }) => <FontAwesome5 name="user-circle" color={color} size={RFPercentage(3.2)} />,
          }}
        />
        <Tab.Screen
          name="Scan Shipments"
          // options={{ header: () => null }}
          component={ScanShipmentScreen}
          initialParams={{ auth_key }}
          options={{
            header: () => null,
            tabBarLabelStyle: {
              fontSize: RFPercentage(1.3),
              top: Platform.OS == "android" ? RFPercentage(-2) : RFPercentage(0.2),
            },
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="qrcode-scan" color={color} size={RFPercentage(3.2)} />,
          }}
        />
        <Tab.Screen
          name="Notifications"
          // options={{ header: () => null }}
          component={ShipmentsScreen}
          initialParams={{ auth_key }}
          options={{
            header: () => null,
            tabBarLabelStyle: {
              fontSize: RFPercentage(1.3),
              top: Platform.OS == "android" ? RFPercentage(-2) : RFPercentage(0.2),
            },
            tabBarIcon: ({ color }) => <Ionicons name="md-notifications-outline" color={color} size={RFPercentage(3.2)} />,
          }}
        />
        <Tab.Screen
          name="More"
          // options={{ header: () => null }}
          component={ShipmentsScreen}
          initialParams={{ auth_key }}
          options={{
            header: () => null,
            tabBarLabelStyle: {
              fontSize: RFPercentage(1.3),
              top: Platform.OS == "android" ? RFPercentage(-2) : RFPercentage(0.2),
            },
            tabBarIcon: ({ color }) => <AntDesign name="infocirlceo" color={color} size={RFPercentage(3.2)} />,
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeScreen">
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ApprovalScreen" component={ApprovalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Happy Coding :)
