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
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image:
        "https://tendringprimaryrecyclescheme.weebly.com/uploads/1/2/6/5/126520253/bic-main-image.jpg",
      name: "Writing",
    },
    {
      id: "1",
      image:
        "https://images-cdn.ubuy.co.in/64575b37cc0f1f34a12015d3-yiozojio-b5-spiral-notebook-4pack.jpg",
      name: "Notebooks",
    },
    {
      id: "3",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEglAzJaxbG5GXSTtjJBrkXCYI3g4j8QDZjh-F6WZBpWnp3J8oCIdcngSW-GayJ5N9pgnuNxG7e85nD_PIqWDNPNDGQ5cbQkL1DwvCbN7dctT5jVEZTVT4dFAuCzx-UgsU5hgsloB7105fRv/s1600/binder+with+folders.jpg",
      name: "Blinders",
    },
    {
      id: "4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQywzjDHzJODssCQD_UzeKmWZfk019l-kqiNw&s",
      name: "Materials",
    },
  ];

  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];

  const deals = [
    {
      id: "20",
      title: "Scientific Calculator",
      oldPrice: 1200,
      price: 999,
      image:
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
      carouselImages: [
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
      ],
      color: "Black",
      size: "Standard",
    },
    {
      id: "30",
      title: "Graphing Calculator",
      oldPrice: 3500,
      price: 2999,
      image:
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
      carouselImages: [
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
      ],
      color: "Silver",
      size: "Large",
    },
    {
      id: "40",
      title: "Scientific Notebook (Set of 3)",
      oldPrice: 500,
      price: 399,
      image:
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
      carouselImages: [
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
      ],
      color: "Assorted Colors",
      size: "A4",
    },
    {
      id: "50",
      title: "Mechanical Pencil Set (0.7mm, Pack of 5)",
      oldPrice: 250,
      price: 199,
      image:
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
      carouselImages: [
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
      ],
      color: "Assorted Colors",
      size: "Standard",
    },
  ];

  const offers = [
    {
      id: 0,
      title: "Scientific Calculator",
      offer: "20% off",
      oldPrice: 1200,
      price: 960,
      image:
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
      carouselImages: [
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
      ],
      color: "Black",
      size: "Standard",
    },
    {
      id: 1,
      title: "College Backpack",
      offer: "30% off",
      oldPrice: 1500,
      price: 1050,
      image:
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
      carouselImages: [
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
      ],
      color: "Blue",
      size: "Large",
    },
    {
      id: 2,
      title: "Textbooks Bundle",
      offer: "15% off",
      oldPrice: 3000,
      price: 2550,
      image:
        "https://img.avery.com/web/blog/top-5-school-supplies-according-to-moms-02",
      carouselImages: [
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
        "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Citiplus_Scientific_Calculator_for_Stude-Citiplus-88c3f-261316.jpg",
      ],
      color: "Multi-color",
      size: "Various Subjects",
    },
  ];
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const [selectedAddress, setSelectedAddress] = useState("");
  // console.log(selectedAddress);
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        console.log("Error message:", error);
      }
    };

    fetchData();
  }, []);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
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
              backgroundColor: "#00CED1",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <AntDesign
                style={{ paddingLeft: 10 }}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search" />
            </Pressable>

            <Feather name="mic" size={24} color="black" />
          </View>

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
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

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                key={item.id}
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                key={item.id}
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
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
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <View key={item.id} style={{ margin: 20 }}>
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
