import React, { useContext, useEffect, useState } from "react";
import { Text, View, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { UserType } from "../UserContext";
import axios from "axios";

const ProductItem = ({ item }) => {
  const [user, setUser] = useState();
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  // console.log(item.title);

  const addItemToCart = (item) => {
    // console.log("Adding to cart:", item.title);
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const { userId, setUserId } = useContext(UserType);
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

  // console.log(user._id);
  const addedToFavourite = async (item) => {
    // console.log(item.title);
    try {
      const response = await fetch("http://192.168.0.113:8000/favourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          userId: user._id,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      const data = await response.json();
      // console.log("Added successfully:", data.favourite);
      // Optionally handle the response here if needed
    } catch (error) {
      console.error("Error adding to favourites:", error.message);
      // Handle error state in your UI or display a message to the user
    }
  };

  return (
    <Pressable>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          RM {item?.price}
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",

          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => addedToFavourite(item)}
        style={{
          backgroundColor: "#eddfb9",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Mark As Favourite</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
