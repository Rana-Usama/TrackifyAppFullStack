import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Linking } from "react-native";

//components
import Screen from "../components/Screen";

//config
import Colors from "../config/Colors";

function ViewShipmentScreen({ route, navigation }) {
  const [bottomLine, setBottomLine] = useState("Details");
  const { auth_key, shipment_id } = route.params;
  // console.log("view shipmentscreen", auth_key, shipment_id);
  const [checked, setChecked] = useState(true);

  const handleCheckBox = () => {
    setChecked(!checked);
  };

  const [shipmentData, setShipmentData] = useState([]);

  useEffect(() => {
    const fetchShipmentData = async () => {
      const response = await axios.get("https://app.trackify.net/api/json/view_shipment.php?shipment_id=${shipment_id}", {
        headers: {
          auth_key: auth_key,
        },
        params: {
          shipment_id: shipment_id,
        },
      });
      setShipmentData(response.data);
      console.log("View Shipment result here ===> ", response.data);
    };
    fetchShipmentData();
  }, [shipment_id]);

  return (
    <Screen style={styles.screen}>
      <View style={{ width: "100%", height: RFPercentage(14), backgroundColor: "#010c3f", justifyContent: "flex-start", alignItems: "flex-start" }}>
        <View style={{ width: "96%", marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignSelf: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} style={{ position: "absolute", right: RFPercentage(1) }}>
            <Image style={{ width: RFPercentage(3), height: RFPercentage(3.5) }} source={require("../../assets/Images/location.png")} />
          </TouchableOpacity>
        </View>
        {shipmentData.map((item, index) => (
          <View key={index} style={{ width: "100%", justifyContent: "center", alignItems: "center", position: "absolute", bottom: RFPercentage(0.5) }}>
            <View style={{ width: "96%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomLine("Details")}>
                  <Text style={{ color: Colors.white, fontSize: RFPercentage(2) }}>Details</Text>
                </TouchableOpacity>
                {bottomLine == "Details" ? <View style={{ width: RFPercentage(7), height: RFPercentage(0.2), backgroundColor: "#f77c37" }} /> : null}
              </View>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomLine("Notes")}>
                  <Text style={{ color: Colors.white, fontSize: RFPercentage(2) }}>Notes({item.notes_count})</Text>
                </TouchableOpacity>
                {bottomLine == "Notes" ? <View style={{ width: RFPercentage(8), height: RFPercentage(0.2), backgroundColor: "#f77c37" }} /> : null}
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomLine("Pictures")}>
                  <Text style={{ color: Colors.white, fontSize: RFPercentage(2) }}>Pictures({item.pictures_count}) </Text>
                </TouchableOpacity>
                {bottomLine == "Pictures" ? <View style={{ width: RFPercentage(11), height: RFPercentage(0.2), backgroundColor: "#f77c37" }} /> : null}
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomLine("Call")}>
                  <Text style={{ color: Colors.white, fontSize: RFPercentage(2) }}>Call History</Text>
                </TouchableOpacity>
                {bottomLine == "Call" ? <View style={{ width: RFPercentage(14), height: RFPercentage(0.2), backgroundColor: "#f77c37" }} /> : null}
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setBottomLine("Map")}>
                  <Text style={{ color: Colors.white, fontSize: RFPercentage(2) }}>Map</Text>
                </TouchableOpacity>
                {bottomLine == "Map" ? <View style={{ width: RFPercentage(4), height: RFPercentage(0.2), backgroundColor: "#f77c37" }} /> : null}
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Body */}
      {bottomLine == "Details" ? (
        <>
          {/* Nav Blue Bar */}
          {shipmentData.map((item, index) => (
            <View key={index} style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <View
                style={{
                  marginTop: RFPercentage(3),
                  backgroundColor: "#051441",
                  width: "90%",
                  height: RFPercentage(8),
                  borderRadius: RFPercentage(0.8),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: Colors.white, fontSize: RFPercentage(2.4), fontWeight: "bold" }}>{item.tracking_id}</Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(3) }}>
                <View style={{ backgroundColor: "#00c6ff", width: RFPercentage(2), height: RFPercentage(2), borderRadius: RFPercentage(20) }} />
                <Text style={{ color: "#051441", fontSize: RFPercentage(1.8), marginLeft: RFPercentage(0.8) }}>{item.status_name}</Text>
              </View>

              {/* Info Section */}
              <View
                style={{
                  marginTop: RFPercentage(3),
                  width: "90%",
                  height: RFPercentage(25),
                  backgroundColor: "#f8f8f8",
                  borderRadius: RFPercentage(0.8),
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "90%", marginTop: RFPercentage(2), flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                  <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>Sender</Text>
                  <Text style={{ color: "#051441", fontSize: RFPercentage(2), marginLeft: RFPercentage(6) }}>{item.sender_name == null ? "Null" : null}</Text>
                </View>

                <View style={{ width: "90%", marginTop: RFPercentage(2), flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>
                  <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>Receiver</Text>

                  <View style={{ justifyContent: "center", alignItems: "flex-start", marginLeft: RFPercentage(4.6) }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>Name:</Text>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.8), marginLeft: RFPercentage(1) }}>{item.receiver_name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>Address:</Text>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.8), marginLeft: RFPercentage(1) }}>{item.receiver_address}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>Phone:</Text>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.8), marginLeft: RFPercentage(1) }}>{item.receiver_phone}</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: RFPercentage(1), justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>COD:</Text>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.8), marginLeft: RFPercentage(1) }}>{item.receiver_cod}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Buttons */}
              <View style={{ marginTop: RFPercentage(3), width: "70%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{
                    width: RFPercentage(17),
                    height: RFPercentage(5.8),
                    borderRadius: RFPercentage(0.6),
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: "#009501",
                  }}
                >
                  <Image style={{ width: RFPercentage(2.8), height: RFPercentage(2.8) }} source={require("../../assets/Images/ring.png")} />
                  <Text style={{ color: Colors.white, marginLeft: RFPercentage(1) }}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const message = item.sms_text;
                    const encodedMessage = encodeURIComponent(message);
                    Linking.openURL(`sms:&body=${encodedMessage}`);
                  }}
                  activeOpacity={0.6}
                  style={{
                    width: RFPercentage(17),
                    height: RFPercentage(5.8),
                    borderRadius: RFPercentage(0.6),
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: "#d9443b",
                  }}
                >
                  <Image style={{ width: RFPercentage(2.8), height: RFPercentage(2.8) }} source={require("../../assets/Images/email.png")} />
                  <Text style={{ color: Colors.white, marginLeft: RFPercentage(1) }}>SMS</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: RFPercentage(20),
              backgroundColor: "#051441",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ width: RFPercentage(13), height: RFPercentage(13), backgroundColor: Colors.white, borderRadius: RFPercentage(0.5), justifyContent: "center", alignItems: "center" }}
            >
              <Image style={{ width: RFPercentage(6), height: RFPercentage(5) }} source={require("../../assets/Images/delivery.png")} />
              <Text style={{ color: "#04930b", fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                marginLeft: RFPercentage(3),
                width: RFPercentage(13),
                height: RFPercentage(13),
                backgroundColor: Colors.white,
                borderRadius: RFPercentage(0.5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image style={{ width: RFPercentage(5), height: RFPercentage(5) }} source={require("../../assets/Images/stop.png")} />
              <Text style={{ color: "#d8453e", fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Problematic</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                marginLeft: RFPercentage(3),
                width: RFPercentage(13),
                height: RFPercentage(13),
                backgroundColor: Colors.white,
                borderRadius: RFPercentage(0.5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image style={{ width: RFPercentage(5.5), height: RFPercentage(5) }} source={require("../../assets/Images/add.png")} />
              <Text style={{ color: "#000000", fontSize: RFPercentage(1.8), marginTop: RFPercentage(0.5) }}>Add Pictures</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}

      {bottomLine == "Notes" ? (
        <>
          <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "row", marginTop: RFPercentage(3) }}>
            <View style={{ bottom: RFPercentage(1.7), left: RFPercentage(4) }}>
              <CheckBox checked={checked} onPress={handleCheckBox} checkedColor="#051441" uncheckedColor="#051441" />
            </View>
            <View style={{ marginLeft: RFPercentage(3), justifyContent: "center", alignItems: "flex-start" }}>
              <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>Not answering calls</Text>
              <Text style={{ color: "#051441", fontSize: RFPercentage(2), marginTop: RFPercentage(1) }}>Incorrect Phone Num</Text>
              <Text style={{ color: "#051441", fontSize: RFPercentage(2), marginTop: RFPercentage(1) }}>Hasen't Ordered</Text>
              <Text style={{ color: "#051441", fontSize: RFPercentage(2), marginTop: RFPercentage(1) }}>Not in the Country</Text>
              <Text style={{ color: "#051441", fontSize: RFPercentage(2), marginTop: RFPercentage(1) }}>Rejecting Delivery</Text>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: RFPercentage(0.5) }}>
                <Text style={{ color: "#051441", fontSize: RFPercentage(2), fontWeight: "bold" }}>Other</Text>
                <View
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginLeft: RFPercentage(1),
                    width: RFPercentage(25),
                    borderBottomColor: "#051441",
                    borderBottomWidth: 2,
                  }}
                >
                  <TextInput multiline style={{ width: "100%" }} />
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              marginTop: RFPercentage(3),
              backgroundColor: "#051441",
              width: "80%",
              height: RFPercentage(6),
              borderRadius: RFPercentage(0.5),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image style={{ width: RFPercentage(3), height: RFPercentage(2.8) }} source={require("../../assets/Images/addNote.png")} />
            <Text style={{ color: Colors.white, fontSize: RFPercentage(2), fontWeight: "500", marginLeft: RFPercentage(1) }}>Add Note</Text>
          </TouchableOpacity>

          <View style={{ marginTop: RFPercentage(3), width: "80%", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Image style={{ bottom: RFPercentage(1), width: RFPercentage(3), height: RFPercentage(3) }} source={require("../../assets/Images/man.png")} />
              <View style={{ justifyContent: "center", alignItems: "flex-start", marginLeft: RFPercentage(1) }}>
                <View style={{ justifyContent: "center", alignItems: "center", width: RFPercentage(25), height: RFPercentage(5), borderRadius: RFPercentage(0.5), backgroundColor: "#f2f2f2" }}>
                  <Text style={{ color: "#051441", fontSize: RFPercentage(1.8), fontWeight: "bold" }}>Not answering Calls</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", top: RFPercentage(0.5), left: RFPercentage(0.5) }}>
                  <Image style={{ width: RFPercentage(2.1), height: RFPercentage(2) }} source={require("../../assets/Images/icon.png")} />
                  <Text style={{ color: "#051441", fontSize: RFPercentage(1.6), marginLeft: RFPercentage(1) }}>2023-04-05 10:15:28</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : null}

      {bottomLine == "Pictures" ? (
        <>
          <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: RFPercentage(3) }}>
            <TouchableOpacity activeOpacity={0.8}>
              <Image style={{ width: RFPercentage(15), height: RFPercentage(15), borderRadius: RFPercentage(1) }} source={require("../../assets/Images/p1.jpg")} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Image style={{ width: RFPercentage(15), height: RFPercentage(15), borderRadius: RFPercentage(1) }} source={require("../../assets/Images/p2.jpg")} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Image style={{ width: RFPercentage(15), height: RFPercentage(15), borderRadius: RFPercentage(1) }} source={require("../../assets/Images/p3.jpg")} />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
      {bottomLine == "Call" ? (
        <>
          <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
            <Text style={{ fontSize: RFPercentage(3.5), color: "#051441", fontWeight: "bold" }}>Calls</Text>
          </View>

          <View style={{ marginTop: RFPercentage(0.6), width: "100%", height: RFPercentage(0.2), backgroundColor: "#dfe2e5" }} />
          <ScrollView style={{ flex: 1, width: "100%" }}>
            <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
              {/*  */}
              <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                <Image style={{ width: RFPercentage(3.1), height: RFPercentage(3.1) }} source={require("../../assets/Images/phone.png")} />
                <View style={{ marginLeft: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                    <Text style={{ color: "#051441", fontSize: RFPercentage(2.1) }}>+389 78 123 456</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", right: 0 }}>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.7) }}>2023-04-05 15:33:10</Text>
                      <View
                        style={{
                          width: RFPercentage(2.5),
                          height: RFPercentage(2.5),
                          borderColor: "#051441",
                          borderWidth: RFPercentage(0.1),
                          borderRadius: RFPercentage(30),
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: RFPercentage(1),
                        }}
                      >
                        <MaterialCommunityIcons name="information-variant" style={{ fontSize: RFPercentage(2.3) }} color="#051441" />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: RFPercentage(1), width: "100%", height: RFPercentage(0.2), backgroundColor: "#dfe2e5" }} />
                </View>
              </View>
              {/*  */}
              <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                <Image style={{ width: RFPercentage(3.1), height: RFPercentage(3.1) }} source={require("../../assets/Images/phone.png")} />
                <View style={{ marginLeft: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                    <Text style={{ color: "#051441", fontSize: RFPercentage(2.1) }}>+389 78 123 456</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", right: 0 }}>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.7) }}>2023-04-05 15:33:10</Text>
                      <View
                        style={{
                          width: RFPercentage(2.5),
                          height: RFPercentage(2.5),
                          borderColor: "#051441",
                          borderWidth: RFPercentage(0.1),
                          borderRadius: RFPercentage(30),
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: RFPercentage(1),
                        }}
                      >
                        <MaterialCommunityIcons name="information-variant" style={{ fontSize: RFPercentage(2.3) }} color="#051441" />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: RFPercentage(1), width: "100%", height: RFPercentage(0.2), backgroundColor: "#dfe2e5" }} />
                </View>
              </View>
              {/*  */}
              <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                <Image style={{ width: RFPercentage(3.1), height: RFPercentage(3.1) }} source={require("../../assets/Images/phone.png")} />
                <View style={{ marginLeft: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                    <Text style={{ color: "#051441", fontSize: RFPercentage(2.1) }}>+389 78 123 456</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", right: 0 }}>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.7) }}>2023-04-05 15:33:10</Text>
                      <View
                        style={{
                          width: RFPercentage(2.5),
                          height: RFPercentage(2.5),
                          borderColor: "#051441",
                          borderWidth: RFPercentage(0.1),
                          borderRadius: RFPercentage(30),
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: RFPercentage(1),
                        }}
                      >
                        <MaterialCommunityIcons name="information-variant" style={{ fontSize: RFPercentage(2.3) }} color="#051441" />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: RFPercentage(1), width: "100%", height: RFPercentage(0.2), backgroundColor: "#dfe2e5" }} />
                </View>
              </View>
              {/*  */}
              <View style={{ marginTop: RFPercentage(3), width: "90%", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                <Image style={{ width: RFPercentage(3.1), height: RFPercentage(3.1) }} source={require("../../assets/Images/phone.png")} />
                <View style={{ marginLeft: RFPercentage(2), width: "90%", justifyContent: "center", alignItems: "center" }}>
                  <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "100%" }}>
                    <Text style={{ color: "#051441", fontSize: RFPercentage(2.1) }}>+389 78 123 456</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", position: "absolute", right: 0 }}>
                      <Text style={{ color: "#051441", fontSize: RFPercentage(1.7) }}>2023-04-05 15:33:10</Text>
                      <View
                        style={{
                          width: RFPercentage(2.5),
                          height: RFPercentage(2.5),
                          borderColor: "#051441",
                          borderWidth: RFPercentage(0.1),
                          borderRadius: RFPercentage(30),
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: RFPercentage(1),
                        }}
                      >
                        <MaterialCommunityIcons name="information-variant" style={{ fontSize: RFPercentage(2.3) }} color="#051441" />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: RFPercentage(1), width: "100%", height: RFPercentage(0.2), backgroundColor: "#dfe2e5" }} />
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      ) : null}

      {bottomLine == "Map" ? (
        <>
          <View style={{ marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "center", alignItems: "center", alignSelf: "center", width: "75%" }}>
            <View style={{ position: "absolute", left: RFPercentage(0), justifyContent: "center", alignItems: "center" }}>
              <View style={{ width: RFPercentage(1.3), height: RFPercentage(1.3), borderColor: "#595d5f", borderRadius: RFPercentage(20), borderWidth: RFPercentage(0.2) }} />
              <View style={{ marginTop: RFPercentage(0.8), width: RFPercentage(0.5), height: RFPercentage(0.5), backgroundColor: "#595d5f", borderRadius: RFPercentage(20) }} />
              <View style={{ marginTop: RFPercentage(0.8), width: RFPercentage(0.5), height: RFPercentage(0.5), backgroundColor: "#595d5f", borderRadius: RFPercentage(20) }} />
              <View style={{ marginTop: RFPercentage(0.8), width: RFPercentage(0.5), height: RFPercentage(0.5), backgroundColor: "#595d5f", borderRadius: RFPercentage(20) }} />
              <Octicons name="location" style={{ marginTop: RFPercentage(0.8), fontSize: RFPercentage(2) }} color="red" />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: RFPercentage(30),
                  height: RFPercentage(5),
                  borderRadius: RFPercentage(1.2),
                  borderColor: "#7d8386",
                  borderWidth: RFPercentage(0.1),
                }}
              >
                <TextInput style={{ width: "98%" }} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  marginTop: RFPercentage(0.8),
                  justifyContent: "center",
                  alignItems: "center",
                  width: RFPercentage(30),
                  height: RFPercentage(5),
                  borderRadius: RFPercentage(1.2),
                  borderColor: "#7d8386",
                  borderWidth: RFPercentage(0.1),
                }}
              >
                <TextInput style={{ width: "98%" }} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.5} style={{ justifyContent: "center", alignItems: "center", position: "absolute", right: RFPercentage(0.5) }}>
              <Ionicons name="md-arrow-up-outline" style={{ fontSize: RFPercentage(2) }} color="#051441" />
              <Ionicons name="md-arrow-down-outline" style={{ fontSize: RFPercentage(2), left: RFPercentage(0.6), bottom: RFPercentage(1.2) }} color="#051441" />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>

          <View style={{ width: "90%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: RFPercentage(3) }}>
            <Text style={{ fontSize: RFPercentage(2.4), color: "green", fontWeight: "bold" }}>8 min</Text>
            <Text style={{ fontSize: RFPercentage(2.4), color: "grey", marginLeft: RFPercentage(1) }}>(4.2 Km )</Text>
          </View>
          <View style={{ width: "90%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginTop: RFPercentage(1) }}>
            <Text style={{ fontSize: RFPercentage(2), color: "grey" }}>Via asdas asda</Text>
          </View>

          <View style={{ marginTop: RFPercentage(3), width: "90%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "center" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: RFPercentage(19.5),
                height: RFPercentage(5),
                borderRadius: RFPercentage(20),
                backgroundColor: "#1173e9",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <FontAwesome name="location-arrow" style={{ fontSize: RFPercentage(2.4) }} color="white" />
              <Text style={{ color: Colors.white, fontSize: RFPercentage(1.8), fontWeight: "bold", marginLeft: RFPercentage(1) }}>Navigate in app</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: RFPercentage(12),
                height: RFPercentage(5),
                borderRadius: RFPercentage(20),
                borderColor: "#e1e4e6",
                borderWidth: RFPercentage(0.1),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <MaterialCommunityIcons name="menu" style={{ fontSize: RFPercentage(2.4) }} color="#1173e9" />
              <Text style={{ color: Colors.black, fontSize: RFPercentage(1.8), fontWeight: "bold", marginLeft: RFPercentage(0.5) }}>Steps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: RFPercentage(12),
                height: RFPercentage(5),
                borderRadius: RFPercentage(20),
                borderWidth: RFPercentage(0.1),
                borderColor: "#e1e4e6",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <FontAwesome name="angle-double-right" style={{ fontSize: RFPercentage(2.4) }} color="#1173e9" />
              <Text style={{ color: Colors.black, fontSize: RFPercentage(1.8), fontWeight: "bold", marginLeft: RFPercentage(0.5) }}>Preview</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
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

export default ViewShipmentScreen;
