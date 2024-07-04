import React, { useContext, useEffect, useState } from "react";
import { Text, View, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { UserType } from "../UserContext";
import axios from "axios";

const ProductItem = ({ item }) => {
  const [user, setUser] = useState();
  const [addedToCart, setAddedToCart] = useState(false);
  const [favouriteDisabled, setFavouriteDisabled] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
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
  }, [userId]);

  const addedToFavourite = async (item) => {
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
    } catch (error) {
      // console.error("Error adding to favourites:", error.message);
    }
  };

  return (
    <Pressable>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text
        numberOfLines={1}
        style={{ width: 150, marginTop: 10, fontWeight: 700 }}
      >
        {item?.title}
      </Text>
      <Text numberOfLines={2} style={{ width: 150, marginTop: 5 }}>
        {item?.description}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#008e97" }}>
          RM {item?.price}
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#008E97",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text style={{ color: "white" }}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={{ color: "white" }}>Add to Cart</Text>
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          addedToFavourite(item);
          setFavouriteDisabled(true);
        }}
        disabled={favouriteDisabled}
        style={{
          backgroundColor: "#c0edf0",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
          opacity: favouriteDisabled ? 0.5 : 1,
        }}
      >
        <Text>Mark As Favourite</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
