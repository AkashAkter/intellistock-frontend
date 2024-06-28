import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const RecievedOrderInfo = ({ order }) => {
  const productDelivered = () => {
    console.log("DELIVERED");
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
          onPress={productDelivered} // Call function to update order status
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Mark as Received
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecievedOrderInfo;

const styles = StyleSheet.create({});
