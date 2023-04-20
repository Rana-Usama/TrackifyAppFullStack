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

function SignUpScreen(props) {
  const [indicator, showIndicator] = useState(false);

  const [inputField, SetInputField] = useState([
    {
      placeholder: "Full Name",
      icon: "person",
      value: "",
    },
    {
      placeholder: "Mobile",
      icon: "ios-phone-portrait-outline",
      value: "",
    },
    {
      placeholder: "Email",
      icon: "at",
      value: "",
    },
    {
      placeholder: "Password",
      icon: "md-lock-closed-outline",
      secure: true,
      value: "",
    },
    {
      placeholder: "Password Again",
      icon: "md-lock-closed-outline",
      secure: true,
      value: "",
    },
  ]);

  const handleChange = (text, i) => {
    let tempfeilds = [...inputField];
    tempfeilds[i].value = text;
    SetInputField(tempfeilds);
  };

  const registerUser = async () => {
    let tempfeilds = [...inputField];

    if (tempfeilds[0].value === "" || tempfeilds[1].value === "" || tempfeilds[2].value === "" || tempfeilds[3].value === "" || tempfeilds[4].value === "") {
      alert("Please fill all the feilds to proceed");
      showIndicator(false);
      return true;
    }

    if (tempfeilds[3].value !== tempfeilds[4].value) {
      alert("Passowrd and Confirm Password Must be Same!");
      showIndicator(false);
      return true;
    }

    const name = tempfeilds[0].value;
    const phone = tempfeilds[1].value;
    const email = tempfeilds[2].value;
    const password = tempfeilds[3].value;

    // Prepare the request body
    const requestBody = JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      pass: password,
    });

    // Make the POST request
    const response = await fetch("https://app.trackify.net/api/json/register.php", {
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
        // Registration successful
        props.navigation.navigate("ApprovalScreen");
        console.log(data);

        console.log("Registration successful");
      } else {
        // Registration failed
        console.log("Registration failed: " + data.response_text);
      }
    } else {
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
            style={{ width: RFPercentage(45), height: RFPercentage(30), justifyContent: "center", alignItems: "center", marginTop: RFPercentage(15) }}
            source={require("../../assets/Images/background.png")}
          >
            <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
              <Text
                style={{
                  color: "#061541",
                  fontSize: RFPercentage(4),
                  right: RFPercentage(1),
                  fontWeight: "bold",
                  fontFamily: "MavenPro_700Bold",
                }}
              >
                Create Account
              </Text>
            </View>

            {/* Input field */}
            <View style={{ marginTop: RFPercentage(6), justifyContent: "center", alignItems: "center", width: "100%", alignSelf: "center" }}>
              {inputField.map((item, i) => (
                <View key={i} style={{ marginTop: i == 0 ? RFPercentage(0) : RFPercentage(2), alignSelf: "center" }}>
                  <InputField
                    placeholder={item.placeholder}
                    placeholderColor={"#778492"}
                    placeholderAtCenter={false}
                    height={RFPercentage(6.8)}
                    backgroundColor={null}
                    // borderColor={Colors.black}
                    secure={item.secure}
                    borderRadius={RFPercentage(1.4)}
                    color={Colors.black}
                    fontSize={RFPercentage(1.8)}
                    icon={item.icon}
                    handleFeild={(text) => handleChange(text, i)}
                    value={item.value}
                    width={"96%"}
                  />
                </View>
              ))}
            </View>
          </ImageBackground>

          {/* Button */}
          <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(25) }}>
            <MyAppButton
              title="Create account"
              onPress={() => registerUser()}
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

export default SignUpScreen;
