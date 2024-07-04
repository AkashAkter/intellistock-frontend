import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";

const HomeScreen = () => {
  const trendingProducts = [
    {
      id: 5,
      title: "Spiral Notebook",
      price: "8.00",
      description: "100-page college-ruled spiral notebook.",
      category: "Stationery",
      image: "https://i.ibb.co/kKbrHpb/5.jpg",
    },
    {
      id: 6,
      title: "3-Ring Binder",
      price: "14.00",
      description: "Durable 1-inch binder with pockets.",
      category: "Stationery",
      image: "https://i.ibb.co/xMNW08F/6.jpg",
    },
    {
      id: 7,
      title: "Highlighter Set",
      price: "6.00",
      description: "Set of 4 neon highlighters for marking text.",
      category: "Stationery",
      image: "https://i.ibb.co/znXMMyV/7.jpg",
    },
    {
      id: 8,
      title: "12-inch Ruler",
      price: "4.00",
      description:
        "Clear plastic ruler with both metric and imperial measurements.",
      category: "Stationery",
      image: "https://i.ibb.co/tpjN1ZG/8.jpg",
    },
    {
      id: 9,
      title: "Glue Stick",
      price: "4.00",
      description: "Non-toxic glue stick for paper and crafts.",
      category: "Stationery",
      image: "https://i.ibb.co/pR0kTV0/9.jpg",
    },
    {
      id: 10,
      title: "Safety Scissors",
      price: "8.00",
      description: "Blunt-tip scissors for safe cutting.",
      category: "Stationery",
      image: "https://i.ibb.co/jv1Rt44/10.jpg",
    },
  ];
  const offerss = [
    {
      id: 15,
      title: "Crayon Set",
      price: "10.00",
      description: "Box of 24 vibrant color crayons.",
      category: "Art Supplies",
      image: "https://i.ibb.co/pZbYGpv/15.jpg",
      offer: "Buy 2, get 1 free",
    },
    {
      id: 16,
      title: "Marker Set",
      price: "16.00",
      description: "Set of 12 washable markers.",
      category: "Art Supplies",
      image: "https://i.ibb.co/B6wk5L3/16.jpg",
      offer: "15% off on next purchase",
    },
    {
      id: 17,
      title: "Colored Pencils",
      price: "20.00",
      description: "Pack of 24 assorted colored pencils.",
      category: "Art Supplies",
      image: "https://i.ibb.co/L5RB7tx/17.jpg",
      offer: "Buy 1, get 50% off on second item",
    },
    {
      id: 18,
      title: "Sticky Notes",
      price: "6.00",
      description: "100-sheet pad of sticky notes for reminders.",
      category: "Stationery",
      image: "https://i.ibb.co/C8GGhQ9/18.jpg",
      offer: "Free shipping on orders over $10",
    },
    {
      id: 19,
      title: "Index Cards",
      price: "8.00",
      description: "Pack of 100 lined index cards.",
      category: "Stationery",
      image: "https://i.ibb.co/DG0VFcz/19.jpg",
      offer: "10% off for students",
    },
    {
      id: 20,
      title: "Whiteboard",
      price: "80.00",
      description: "24x36 inch dry erase whiteboard.",
      category: "Office Supplies",
      image: "https://i.ibb.co/nRXyjCj/20.jpg",
      offer: "Buy 1, get a pack of markers free",
    },
  ];

  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.0.113:8000/offers");
        const json = await response.json();
        // console.log("Fetched products:", json.products); // Debug log
        setOffers(json.offers);
      } catch (error) {
        console.log("Error message:", error);
      }
    };

    fetchData();
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.113:8000/addresses/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const { addresses } = data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  // console.log(addresses);

  const trendingQuantity = products.filter((product) => product?.quantity < 10);

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

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#dae6e6",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <Pressable>
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add a Address
                </Text>
              )}
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

          <Banner />

          <View style={{ marginTop: 30 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              TRENDING PRODUCTS
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {products
                ?.filter((product) => product.trendingProduct === "yes")
                .map((item, index) => (
                  <View key={index} style={{ margin: 20 }}>
                    <ProductItem item={item} />
                  </View>
                ))}
            </View>
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View style={{ marginTop: 15 }}>
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/1414378934/photo/many-colorful-school-supplies-and-backpack-arranged-on-blue-background.jpg?s=612x612&w=0&k=20&c=k1GsN7RU9KSaiXpex6fg9SwgGStt9cFvKky8i7wL5L0=",
              }} // Replace with your image URL
              style={{ width: "100%", height: 200 }} // Adjust height as needed
              resizeMode="cover" // Ensures the image covers the entire container
            />
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View style={{ marginTop: 30 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              BEST DEALS
            </Text>

            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {offers?.map((item, index) => (
                <View key={index} style={{ margin: 20 }}>
                  <ProductItem item={item} />
                  <Text
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "900",
                    }}
                  >
                    {item.discount}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text
            style={{
              marginTop: 15,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            PRODUCTS
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {products?.slice(0, 4).map((item, index) => (
              <View key={index} style={{ margin: 20 }}>
                <ProductItem item={item} />
              </View>
            ))}
          </View>

          {/* <Advertisement /> */}
          <Footer />
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses?.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setSelectedAddress(item);
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress === item ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Bangalore
                </Text>
              </Pressable>
            ))}
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
