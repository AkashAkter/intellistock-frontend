import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import RecievedOrderInfo from "./RecievedOrderInfo";

const RiderProfileScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("authRole");
    // console.log("auth token cleared");
    navigation.replace("Login");
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://intelli-stock-server-akash-akters-projects.vercel.app/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://intelli-stock-server-akash-akters-projects.vercel.app/orders"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setOrders(json.orders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const refreshOrders = async () => {
    setLoading(true); // Set loading state to true while fetching data

    try {
      const response = await fetch(
        "https://intelli-stock-server-akash-akters-projects.vercel.app/orders"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setOrders(json.orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false); // Set loading state to false after fetching data
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        ></View>
        <View>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            NAME : {user?.name}
          </Text>
        </View>

        <View style={{ marginVertical: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            PRODUCT IS YET TO DELIVERED
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <View style={{}}>
              {orders
                ?.filter(
                  (order) =>
                    order.riderName === user.name && order.status === "received"
                )
                .map((order, index) => (
                  <RecievedOrderInfo
                    key={index}
                    order={order}
                    user={user}
                    refreshOrders={refreshOrders}
                  />
                ))}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 12,
          }}
        >
          <Pressable
            onPress={logout}
            style={{
              padding: 10,
              backgroundColor: "#daf5f5",
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text
              style={{ textAlign: "center", color: "#69c4c9", fontWeight: 900 }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RiderProfileScreen;

const styles = StyleSheet.create({});
