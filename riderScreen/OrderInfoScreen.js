import React from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";

const OrderInfoScreen = ({ order, user, refreshOrders }) => {
  const deliverThisProduct = async () => {
    try {
      const response = await fetch(
        `https://intelli-stock-server-akash-akters-projects.vercel.app/orders/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "received",
            riderName: user?.name,
            riderEmail: user?.email,
          }),
        }
      );

      // console.log(typeof response.ok);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      Alert.alert("Success", "Order status updated successfully.", [
        {
          text: "OK",
          onPress: () => {
            refreshOrders();
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

      {order.status === "pending" && (
        <TouchableOpacity
          style={{
            backgroundColor: "#007bff",
            padding: 10,
            alignItems: "center",
            marginTop: 10,
            borderRadius: 5,
          }}
          onPress={deliverThisProduct} // Call function to update order status
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Mark as Received
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OrderInfoScreen;
