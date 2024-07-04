import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

const AddProduct = ({ route }) => {
  // Destructure route to access navigation params
  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const { setRefreshProducts } = route.params || {}; // Destructure setRefreshProducts from route.params

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://intelli-stock-server-akash-akters-projects.vercel.app/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            price: parseFloat(price), // Ensure price is sent as a number
            description,
            category,
            image,
            trendingProduct: "no",
            // Ensure discountPrice is sent as a number
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product.");
      }

      // Clear form fields after successful submission
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");

      Alert.alert("Success", "Product added successfully.");
      if (setRefreshProducts) {
        setRefreshProducts(true); // Trigger refresh of ProductList component
      }
      navigation.navigate("Products");
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", error.message || "Failed to add product.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/intellistockLogo.png")}
            style={{ width: 200, height: 100, resizeMode: "contain" }}
          />
        </View>

        {/* Input form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={image}
            onChangeText={setImage}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddProduct;
