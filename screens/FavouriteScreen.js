import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UserType } from "../UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const FavouriteScreen = () => {
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userId, setUserId } = useContext(UserType);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://intelli-stock-server-akash-akters-projects.vercel.app/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://intelli-stock-server-akash-akters-projects.vercel.app/favourite"
        );
        const json = await response.json();
        setProducts(json.favourite);
      } catch (error) {
        console.log("Error message:", error);
      }
    };

    fetchData();
  }, []);

  const handleRemoveFromFavourites = async (productId) => {
    try {
      const response = await axios.delete(
        `https://intelli-stock-server-akash-akters-projects.vercel.app/favourites/${productId}`
      );
      if (response.status === 200) {
        // Remove the product from the local state
        setProducts(products.filter((product) => product._id !== productId));
      }
    } catch (error) {
      console.error("Error removing from favourites:", error);
    }
  };

  const filteredProducts = products?.filter(
    (product) => product.userId === user?._id
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      <ScrollView>
        <View>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            MY WISHLISTS
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {filteredProducts?.map((product, index) => (
            <View key={index} style={{ margin: 10 }}>
              <Image
                style={{ width: 150, height: 150, resizeMode: "contain" }}
                source={{ uri: product?.image }}
              />
              <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
                {product?.title}
              </Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "#008e97" }}
                >
                  RM {product?.price}
                </Text>
              </View>
              <Pressable
                style={{ backgroundColor: "#ff6347", padding: 5 }}
                onPress={() => handleRemoveFromFavourites(product._id)}
              >
                <Text style={{ color: "white" }}>Remove From Favourite</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteScreen;
