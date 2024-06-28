import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { useSelector } from "react-redux";

const CollectionScreen = () => {
  const [products, setProducts] = useState([]);

  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.113:8000/products");
        const json = await response.json();
        // console.log("Fetched products:", json.products); // Debug log
        setProducts(json.products);
      } catch (error) {
        console.log("Error message:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {products.map((item, index) => (
              <View key={index} style={{ margin: 20 }}>
                <ProductItem item={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CollectionScreen;

const styles = StyleSheet.create({});
