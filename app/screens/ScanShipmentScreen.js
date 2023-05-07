import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, Platform } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Linking } from "react-native";
import MyAppButton from "../components/common/MyAppButton";

//components
import Screen from "../components/Screen";

//config
import Colors from "../config/Colors";

function ScanShipmentScreen({ route, navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={{ width: "100%", height: RFPercentage(14), backgroundColor: "#010c3f", justifyContent: "center", alignItems: "flex-start" }}>
        <View style={{ width: "96%", flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6} style={{ position: "absolute", left: RFPercentage(1) }}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ color: Colors.white, fontSize: RFPercentage(2.5) }}>Scan Shipments</Text>
          <TouchableOpacity activeOpacity={0.6} style={{ position: "absolute", right: RFPercentage(1) }}>
            <Image style={{ width: RFPercentage(3), height: RFPercentage(3.5) }} source={require("../../assets/Images/location.png")} />
          </TouchableOpacity>
        </View>
      </View>

      <MaterialCommunityIcons name="qrcode-scan" color={Colors.black} style={{ fontSize: RFPercentage(18), marginTop: RFPercentage(20) }} />

      <Text style={{ color: Colors.black, fontSize: RFPercentage(2), top: RFPercentage(1.6), marginTop: RFPercentage(2), fontWeight: "400" }}>Scan Qr Code and BarCode 28</Text>

      {/* Button */}
      <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(20) }}>
        <MyAppButton
          title="Scan"
          //   onPress={() => loginUser()}
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
  container: {
    width: "90%",
    borderRadius: RFPercentage(1),
    overflow: "hidden",
    marginTop: RFPercentage(3),
    height: RFPercentage(40),
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ScanShipmentScreen;
