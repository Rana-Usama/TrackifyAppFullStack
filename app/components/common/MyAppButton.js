import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

function MyAppButton({
  title,
  onPress,
  bold = true,
  borderRadius = RFPercentage(30),
  fontSize = RFPercentage(2.2),
  backgroundColor,
  fontFamily = null,
  padding = RFPercentage(2),
  width = "100%",
  color,
  borderWidth = null,
  borderColor = null,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
        width: width,
        borderRadius: borderRadius,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center", //most important
        padding: padding,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
          color: color,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default MyAppButton;
