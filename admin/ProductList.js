import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductListInfo from "./ProductListInfo";

const ProductList = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [refreshProducts, setRefreshProducts] = useState(false);

  // Function to fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://192.168.0.113:8000/products");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      setProducts(json.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshProducts]);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle product deletion and refresh products list
  const handleProductDelete = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate("AddProduct", { setRefreshProducts })
          }
          style={{
            padding: 10,
            backgroundColor: "#12b571",
            borderRadius: 5,
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: 700 }}
          >
            CLICK HERE TO ADD PRODUCT
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate("AddProductWithOffer", { setRefreshProducts })
          }
          style={{
            padding: 10,
            backgroundColor: "#12b571",
            borderRadius: 5,
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: 700 }}
          >
            CLICK HERE TO ADD PRODUCT WITH OFFERS
          </Text>
        </Pressable>

        <View style={{ margin: 20 }}>
          {products.map((product, index) => (
            <ProductListInfo
              key={index}
              product={product}
              onDelete={handleProductDelete}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
