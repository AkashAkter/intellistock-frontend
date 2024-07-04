import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import OrderInfoScreen from "./OrderInfoScreen";
import { UserType } from "../UserContext";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, setUserId } = useContext(UserType); // Assuming UserType is a context for user information

  // Fetch user ID from AsyncStorage and set in state
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    };
    fetchUser();
  }, []);

  // Fetch user profile data
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.113:8000/profile/${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setUser(json.user);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  // Fetch orders data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.113:8000/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setOrders(json.orders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshOrders = async () => {
    setLoading(true); // Set loading state to true while fetching data

    try {
      const response = await fetch("http://192.168.0.113:8000/orders");

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

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: 50 }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
          }}
        >
          <Image
            source={require("../assets/intellistockLogo.png")}
            style={{
              width: 200,
              height: 100, // Adjust this value to set the desired height
              resizeMode: "contain", // Ensure the image is not cropped
            }}
          />
        </View>

        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
            ORDER PENDING
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {orders
              .filter((order) => order.status === "pending")
              .map((order, index) => (
                <OrderInfoScreen
                  key={index}
                  order={order}
                  refreshOrders={refreshOrders}
                  user={user} // Pass the callback function
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
