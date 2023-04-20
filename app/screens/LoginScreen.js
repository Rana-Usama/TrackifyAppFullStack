import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Crypto from "expo-crypto";

//components
import Screen from "../components/Screen";
import InputField from "../components/common/InputField";
import MyAppButton from "../components/common/MyAppButton";

//config
import Colors from "../config/Colors";

function LoginScreen({ navigation }) {
  const [indicator, showIndicator] = useState(false);

  const [inputField, SetInputField] = useState([
    {
      placeholder: "Email or Username",
      icon: "at",
      value: "",
    },
    {
      placeholder: "Password",
      icon: "md-lock-closed-outline",
      value: "",
      secure: true,
    },
  ]);

  const handleChange = (text, i) => {
    let tempfeilds = [...inputField];
    tempfeilds[i].value = text;
    SetInputField(tempfeilds);
  };

  const loginUser = async () => {
    let tempfeilds = [...inputField];

    if (tempfeilds[0].value === "" || tempfeilds[1].value === "") {
      alert("Please fill all the feilds to proceed");
      showIndicator(false);
      return true;
    }

    const name = tempfeilds[0].value;
    const password = tempfeilds[1].value;

    // Prepare the request body
    const requestBody = JSON.stringify({
      user: name,
      pass: password,
    });

    // Make the POST request
    const response = await fetch("https://app.trackify.net/api/json/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    // Check if the response was successful
    if (response.status === 200) {
      const data = await response.json();
      if (data.success === 1) {
        // Login successful
        console.log(data);
        console.log(data.auth_key);
        navigation.navigate("HomeTab", { auth_key: data.auth_key });
        console.log("Login successful");
      } else {
        console.log(data);
        alert("Wrong Login Credentails!");
        console.log("Login Failed: " + data.response_text);
      }
    } else {
      console.log(data);
      alert("Request failed with status error!");
      // Request failed
      console.log("Request failed with status: " + response.status);
    }
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
          {/* Logo */}
          <Image style={{ width: RFPercentage(35), height: RFPercentage(10), marginTop: RFPercentage(6) }} source={require("../../assets/Images/logo.png")} />

          <ImageBackground
            style={{ width: RFPercentage(45), height: RFPercentage(30), justifyContent: "center", alignItems: "center", marginTop: RFPercentage(10) }}
            source={require("../../assets/Images/background.png")}
          >
            <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <Text
                style={{
                  color: "#061541",
                  fontSize: RFPercentage(4),
                  fontWeight: "bold",
                  fontFamily: "MavenPro_700Bold",
                }}
              >
                Login
              </Text>
            </View>

            {/* Input field */}
            <View style={{ marginTop: RFPercentage(0), justifyContent: "center", alignItems: "center", width: "100%", alignSelf: "center" }}>
              {inputField.map((item, i) => (
                <View key={i} style={{ marginTop: RFPercentage(2), alignSelf: "center" }}>
                  <InputField
                    placeholder={item.placeholder}
                    placeholderColor={"#778492"}
                    placeholderAtCenter={false}
                    height={RFPercentage(6.8)}
                    backgroundColor={null}
                    secure={item.secure}
                    borderRadius={RFPercentage(1.4)}
                    color={Colors.black}
                    fontSize={RFPercentage(2)}
                    icon={item.icon}
                    handleFeild={(text) => handleChange(text, i)}
                    value={item.value}
                    width={"96%"}
                  />
                </View>
              ))}
            </View>
          </ImageBackground>

          <View style={{ width: "71%", justifyContent: "flex-end", alignItems: "center", flexDirection: "row" }}>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={{ color: "#061541", fontSize: RFPercentage(1.7), fontWeight: "bold", fontFamily: "MavenPro_500Medium" }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Button */}
          <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(8) }}>
            <MyAppButton
              title="Login"
              onPress={() => loginUser()}
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
      </ScrollView>
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

export default LoginScreen;
