import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
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
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.113:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    // console.log("auth token cleared");
    navigation.replace("Login");
  };
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
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);
  // console.log("orders", orders);
  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      ></View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("ProfileInfo");
          }}
          style={{
            padding: 10,
            backgroundColor: "#69c4c9",
            borderRadius: 2,
            flex: 1,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            CLICK HERE TO SEE PROFILE INFO
          </Text>
        </Pressable>
      </View>

      <ScrollView style={{ margin: 0 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          MY ORDERS
        </Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders
            ?.filter((product) => product.status !== "delivered")
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
                    {/* Adjust the width of the Text component to accommodate longer product names */}
                    <Text style={{ flex: 1 }}>{product.name}</Text>
                  </View>
                ))}
                <Text>PRODUCT STATUS: {order.status}</Text>
                <Text>Rider Name: {order.riderName}</Text>
                <Text>Rider Contact Info: {order.riderEmail}</Text>
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
