import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//components
import Screen from "../components/Screen";
import MyAppButton from "../components/common/MyAppButton";

//config
import Colors from "../config/Colors";

function ApprovalScreen(props) {
  return (
    <Screen style={styles.screen}>
      {/* Logo */}
      <Image style={{ width: RFPercentage(35), height: RFPercentage(10), marginTop: RFPercentage(6) }} source={require("../../assets/Images/logo.png")} />

      <ImageBackground
        style={{ width: RFPercentage(56), height: RFPercentage(45), justifyContent: "center", alignItems: "center", marginTop: RFPercentage(10) }}
        source={require("../../assets/Images/background.png")}
      >
        {/* Modal */}
        <View
          style={{
            marginTop: RFPercentage(8),
            width: RFPercentage(44),
            height: RFPercentage(48),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: RFPercentage(1),
            overflow: "hidden",
          }}
        >
          {/* For transparent layer */}
          <View style={{ position: "absolute", top: 0, right: 0, left: 0, bottom: 0, opacity: 0.9, backgroundColor: "#051441" }} />
          <Text style={{ color: Colors.white, fontSize: RFPercentage(3.5), fontFamily: "MavenPro_800ExtraBold" }}>Account Approval</Text>

          <View style={{ width: "80%", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(4) }}>
            <Text style={{ color: Colors.white, fontSize: RFPercentage(2.1), fontFamily: "MavenPro_400Regular", textAlign: "center", lineHeight: RFPercentage(3) }}>
              Dear courier, your account is being successfully created and is waiting to be approved from the administrators.
            </Text>
          </View>

          {/* Button */}
          <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(8) }}>
            <MyAppButton
              title="Continue"
              onPress={() => props.navigation.navigate("LoginScreen")}
              padding={RFPercentage(1.8)}
              backgroundColor={Colors.orange}
              borderColor={Colors.orange}
              borderWidth={RFPercentage(0.2)}
              color={Colors.white}
              bold={false}
              fontFamily={"MavenPro_600SemiBold"}
              borderRadius={RFPercentage(1.2)}
              width={RFPercentage(30)}
            />
          </View>
        </View>
      </ImageBackground>
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

export default ApprovalScreen;
