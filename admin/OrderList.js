import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
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
      }
    };

    fetchData();
  }, []);

  // console.log(orders);

  return (
    <View>
      <ScrollView>
        {orders.map((order, index) => (
          <View
            key={index}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              padding: 10,
              margin: 10,
              marginBottom: 0, // Adjust margin bottom to avoid extra space between items
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Order #{order._id.substring(order._id.length - 5)}
            </Text>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Order Price: {order.totalPrice}
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {order.products?.map((product, productIndex) => (
                <View
                  key={productIndex}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                    width: "50%",
                  }}
                >
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <Text style={{ flex: 1 }}>{product.name}</Text>
                </View>
              ))}
            </View>

            <View>
              <Text style={{ fontWeight: "bold" }}>
                PRODUCT STATUS: {order.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({});
