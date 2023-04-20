import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground, TextInput, FlatList, ActivityIndicator } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

//components
import Screen from "../components/Screen";
import MyAppButton from "../components/common/MyAppButton";

//config
import Colors from "../config/Colors";

function ShipmentsScreen({ route }, props) {
  const navigation = useNavigation();
  const { auth_key } = route.params;

  const [bottomLine, setBottomLine] = useState("1");

  //  State and function to apply search through search input field
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCODQuery, setSearchCODQuery] = useState("");

  // Shipment API Integration
  const [shipments, setShipments] = useState([]);
  useEffect(() => {
    async function fetchShipments() {
      const url = "https://app.trackify.net/api/json/my_shipments.php";
      const authKey = auth_key;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth_key: authKey,
          },
        });

        const data = await response.json();
        setShipments(data.shipments);
        console.log("Shipment Result :", data.shipments);
      } catch (error) {
        console.error(error);
      }
    }

    fetchShipments();
  }, []);

  const filteredShipments = shipments.filter((item) => item.tracking_id.includes(searchQuery));

  // COD Collected API Integration
  const [cod, setCOD] = useState([]);
  useEffect(() => {
    async function fetchDeliveredShipments() {
      const url = "https://app.trackify.net/api/json/my_delivered_shipments.php";
      const authKey = "9d20e86cabcf684a47b5c468071aef6d";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth_key: authKey,
          },
        });

        const data = await response.json();
        setCOD(data.shipments);
        console.log("COD Result :", data.shipments);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDeliveredShipments();
  }, []);

  const filteredCODShipments = cod.filter((item) => item.tracking_id.includes(searchCODQuery));

  // Total COD Amount calculation Function
  const totalPayment = cod.reduce((total, currentValue) => (total = total + Number(currentValue.receiver_cod)), 0);

  return (
    <Screen style={styles.screen}>
      <View style={{ width: "100%", height: RFPercentage(14), backgroundColor: "#010c3f", justifyContent: "flex-start", alignItems: "flex-start" }}>
        <View style={{ width: "96%", marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.6}>
            <Image style={{ width: RFPercentage(3), height: RFPercentage(3.5) }} source={require("../../assets/Images/location.png")} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Image style={{ width: RFPercentage(3.5), height: RFPercentage(3.5), marginLeft: RFPercentage(2) }} source={require("../../assets/Images/container.png")} />
          </TouchableOpacity>
        </View>

        <View style={{ width: "84%", position: "absolute", bottom: RFPercentage(2), flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
          <View style={{ justifyContent: "center", alignItems: "center", position: "absolute", left: 0 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomLine("1")}>
              <Text style={{ color: Colors.white, fontSize: RFPercentage(2.1) }}>My Shipments</Text>
            </TouchableOpacity>
            {bottomLine == "1" ? <View style={{ width: RFPercentage(14), height: RFPercentage(0.2), backgroundColor: "#f77c37" }} /> : null}
          </View>

          <View style={{ justifyContent: "center", alignItems: "center", position: "absolute", right: 0 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomLine("2")}>
              <Text style={{ color: Colors.white, fontSize: RFPercentage(2.1) }}>COD Collected</Text>
            </TouchableOpacity>
            {bottomLine == "2" ? <View style={{ width: RFPercentage(15), height: RFPercentage(0.2), backgroundColor: "#f77c37" }} /> : null}
          </View>
        </View>
      </View>

      {/* Body */}
      {bottomLine == "1" ? (
        <>
          <View
            style={{
              marginTop: RFPercentage(2),
              borderRadius: RFPercentage(2),
              width: "86%",
              height: RFPercentage(5),
              backgroundColor: "#f2f2f2",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <AntDesign name="search1" style={{ marginLeft: RFPercentage(2), fontSize: RFPercentage(2.5) }} color="#5f5f5f" />
            <TextInput
              style={{ marginLeft: RFPercentage(1), width: "100%", color: Colors.black, fontSize: RFPercentage(1.8) }}
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              placeholderTextColor="#5f5f5f"
              placeholder="Search by Tracking ID"
            />
          </View>

          {/* Data */}
          <FlatList
            data={filteredShipments}
            style={{ width: "96%" }}
            keyExtractor={(item) => item.shipment_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={(e) => navigation.navigate("View Shipments", { shipment_id: item.shipment_id, auth_key: auth_key })}
                style={{ width: "97%", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginTop: RFPercentage(3), alignSelf: "center" }}
              >
                <View style={{ justifyContent: "center", aligneItems: "flex-start", width: "40%" }}>
                  <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), fontWeight: "bold" }}>{item.tracking_id}</Text>
                  <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), marginTop: RFPercentage(0.5) }}>{item.receiver_name}</Text>
                  <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), marginTop: RFPercentage(0.5) }}>{item.receiver_address}</Text>
                </View>

                <View style={{ justifyContent: "flex-start", alignItems: "flex-start", width: "30%" }}>
                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ backgroundColor: item.bg_color, width: RFPercentage(1), height: RFPercentage(1), borderRadius: RFPercentage(20) }} />
                    <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), fontWeight: "bold", marginLeft: RFPercentage(1) }}>{item.status_name}</Text>
                  </View>
                  <Text style={{ color: "#051441", fontSize: RFPercentage(1.5), marginTop: RFPercentage(0.5), left: RFPercentage(2) }}>{item.shipment_id}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", right: 0 }}>
                  <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: RFPercentage(2) }}>
                    <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={require("../../assets/Images/comment.png")} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: RFPercentage(1.8) }}>
                    <Image style={{ width: RFPercentage(3.3), height: RFPercentage(2.9) }} source={require("../../assets/Images/sms.png")} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: RFPercentage(1.8) }}>
                    <Image style={{ width: RFPercentage(3.1), height: RFPercentage(3.2) }} source={require("../../assets/Images/phone.png")} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        //   COD Collected
        <>
          <View
            style={{
              marginTop: RFPercentage(2),
              borderRadius: RFPercentage(10),
              width: "86%",
              height: RFPercentage(6),
              backgroundColor: "#f2f2f2",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <AntDesign name="search1" style={{ marginLeft: RFPercentage(2), fontSize: RFPercentage(2.5) }} color="#5f5f5f" />
            <TextInput
              style={{ marginLeft: RFPercentage(1), width: "100%", color: Colors.black, fontSize: RFPercentage(1.8) }}
              onChangeText={(text) => setSearchCODQuery(text)}
              value={searchCODQuery}
              placeholderTextColor="#5f5f5f"
              placeholder="Search by Tracking ID"
            />
          </View>
          {/* Data */}
          <FlatList
            data={filteredCODShipments}
            style={{ width: "96%" }}
            keyExtractor={(item) => item.shipment_id}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={(e) => navigation.navigate("View Shipments", { shipment_id: item.shipment_id, auth_key: auth_key })}
                  style={{ width: "97%", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginTop: RFPercentage(3) }}
                >
                  <View style={{ justifyContent: "center", alignItems: "flex-start", width: "45%" }}>
                    <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), fontWeight: "bold" }}>{item.tracking_id}</Text>
                    <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), marginTop: RFPercentage(0.5) }}>{item.receiver_name}</Text>
                    <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), marginTop: RFPercentage(0.5) }}>{item.receiver_address}</Text>
                  </View>

                  <View style={{ justifyContent: "flex-end", alignItems: "flex-start", width: "25%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <View style={{ backgroundColor: "#39b54a", width: RFPercentage(1), height: RFPercentage(1), borderRadius: RFPercentage(20) }} />
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), fontWeight: "bold", marginLeft: RFPercentage(1) }}>{item.status_name}</Text>
                    </View>
                    <Text style={{ left: RFPercentage(2), color: "#051441", fontSize: RFPercentage(1.5), marginTop: RFPercentage(0.5) }}>{item.shipment_id}</Text>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", right: RFPercentage(2) }}>
                    <TouchableOpacity activeOpacity={0.6}>
                      <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={require("../../assets/Images/comment.png")} />
                    </TouchableOpacity>
                    <Text style={{ color: "#051441", fontSize: RFPercentage(1.7), fontFamily: "MavenPro_700Bold", left: RFPercentage(1) }}>{item.receiver_cod}</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          />

          {/* Total */}
          <View style={{ top: RFPercentage(-2), width: "90%", justifyContent: "center", alignItems: "flex-start", alignSelf: "center" }}>
            <Text style={{ color: "#051441", fontSize: RFPercentage(1.8) }}>Amount to be reconciled</Text>
            <View style={{ width: "100%", height: RFPercentage(0.2), marginTop: RFPercentage(1), backgroundColor: "#051441" }} />
            <View style={{ marginTop: RFPercentage(2), width: "80%", flexDirection: "row", alignSelf: "center" }}>
              <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>Total</Text>
              <Text style={{ position: "absolute", right: 0, color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>{totalPayment} MKD</Text>
            </View>
          </View>
        </>
      )}
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

export default ShipmentsScreen;
