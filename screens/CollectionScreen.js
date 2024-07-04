import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ProductItem from "../components/ProductItem";
import { useSelector } from "react-redux";

const CollectionScreen = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.113:8000/products");
        const json = await response.json();
        setProducts(json.products);
      } catch (error) {
        console.log("Error message:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
      return;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseSearchTerm) ||
        item.description.toLowerCase().includes(lowercaseSearchTerm) ||
        item.category.toLowerCase().includes(lowercaseSearchTerm)
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: 900,
              color: "#008E97",
            }}
          >
            PRODUCTS
          </Text>
        </View>

        {/* Search input */}
        <TextInput
          style={{
            height: 40,
            margin: 20,
            borderColor: "#008E97",
            borderWidth: 1,
            paddingHorizontal: 10,
          }}
          placeholder="Search products..."
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {filteredProducts.map((item, index) => (
            <View key={index} style={{ margin: 20 }}>
              <ProductItem item={item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CollectionScreen;
