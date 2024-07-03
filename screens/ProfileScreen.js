import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { userId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1",
      },
      headerLeft: () => <></>,
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        ></View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.113:8000/profile/${userId}`
        );
        const { user } = response.data;
        // Assuming `setUser` is properly implemented in your context
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.113:8000/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleRemoveOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://192.168.0.113:8000/orders/${orderId}`
      );
      if (response.status === 200) {
        // Remove the order from local state
        setOrders(orders.filter((order) => order._id !== orderId));
        Alert.alert("Success", "Order removed successfully!");
      }
    } catch (error) {
      console.error("Error removing order:", error);
      Alert.alert("Error", "Failed to remove order.");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  };

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      {/* Other UI components */}

      <ScrollView style={{ margin: 0 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          MY ORDERS
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders
            .filter((order) => order.status !== "delivered")
            .map((order, index) => (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: "gray",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}
                >
                  Order #{index + 1}
                </Text>
                {order.products?.map((product, productIndex) => (
                  <View
                    key={productIndex}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 50, height: 50, marginRight: 10 }}
                    />
                    <Text style={{ flex: 1 }}>{product.name}</Text>
                  </View>
                ))}
                <Text>PRODUCT STATUS: {order.status}</Text>
                <Text>Rider Name: {order.riderName}</Text>
                <Text>Rider Contact Info: {order.riderEmail}</Text>
                <Pressable
                  onPress={() => handleRemoveOrder(order._id)}
                  style={{
                    backgroundColor: "#008E97",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>Cancel Order</Text>
                </Pressable>
              </View>
            ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>

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
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
