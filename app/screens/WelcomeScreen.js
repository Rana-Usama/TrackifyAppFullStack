import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, BackHandler, Platform, Modal, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import MyAppButton from "../components/common/MyAppButton";

//components
import Screen from "../components/Screen";

//config
import Colors from "../config/Colors";

function WelcomeScreen(props) {
  return (
    <Screen style={styles.screen}>
      {/* Logo */}
      <Image style={{ width: RFPercentage(35), height: RFPercentage(10), marginTop: RFPercentage(6) }} source={require("../../assets/Images/logo.png")} />

      <Text style={{ color: "#061541", fontSize: RFPercentage(1.9), fontWeight: "bold", marginTop: RFPercentage(8), fontFamily: "MavenPro_800ExtraBold" }}>The Next Generation of</Text>
      <Text style={{ color: "#061541", fontSize: RFPercentage(3.2), fontWeight: "bold", marginTop: RFPercentage(0.5), fontFamily: "MavenPro_700Bold" }}>Courier Services</Text>

      <Image style={{ width: "90%", height: RFPercentage(30), marginTop: RFPercentage(5) }} source={require("../../assets/Images/background.png")} />

      {/* Button */}
      <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(12) }}>
        <MyAppButton
          title="Get Started"
          onPress={() => props.navigation.navigate("SignUpScreen")}
          padding={RFPercentage(2)}
          backgroundColor={Colors.orange}
          borderColor={Colors.orange}
          borderWidth={RFPercentage(0.2)}
          color={Colors.white}
          bold={false}
          fontSize={RFPercentage(2.3)}
          fontFamily={"MavenPro_600SemiBold"}
          borderRadius={RFPercentage(1)}
          width={"85%"}
        />
      </View>

      <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate("LoginScreen")}>
        <Text style={{ color: "#061541", fontSize: RFPercentage(2.4), fontWeight: "bold", marginTop: RFPercentage(3), fontFamily: "MavenPro_800ExtraBold" }}>Login</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});

export default WelcomeScreen;
