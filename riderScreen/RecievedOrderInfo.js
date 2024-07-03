import React from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";

const RecievedOrderInfo = ({ order, user, refreshOrders }) => {
  const productDelivered = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.113:8000/orders/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "delivered",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      Alert.alert("Success", "Order status updated successfully.", [
        {
          text: "OK",
          onPress: () => {
            refreshOrders(); // Call refreshOrders after successful update
          },
        },
      ]);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        marginBottom: 10,
        width: "100%",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Order #{order._id.substring(order._id.length - 5)}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
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
        <Text>PRODUCT STATUS : {order.status}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            alignItems: "center",
            marginTop: 10,
            borderRadius: 5,
          }}
          onPress={productDelivered}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Mark as Delivered
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecievedOrderInfo;
