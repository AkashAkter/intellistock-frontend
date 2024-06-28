import React from "react";
import { StyleSheet, Text, View, Pressable, Alert, Image } from "react-native";

const ProductListInfo = ({ product, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.113:8000/products/${product._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete product");
      }

      // Call onDelete to refresh the product list after deletion
      onDelete(product._id);
      Alert.alert("Success", "Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error.message);
      Alert.alert("Error", "Failed to delete product");
    }
  };

  return (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>Product Name: {product.title}</Text>
      <Text style={styles.productPrice}>
        Price: ${product.price.toFixed(2)}
      </Text>
      <Text style={styles.productDescription}>
        Description: {product.description}
      </Text>
      <Text style={styles.productCategory}>Category: {product.category}</Text>
      {/* Image Component */}
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="contain" // Ensure image fits within the designated size
      />
      {product.discountPrice && (
        <Text style={styles.productDiscountPrice}>
          Discount Price: ${product.discountPrice.toFixed(2)}
        </Text>
      )}
      {/* Delete button */}
      <Pressable onPress={handleDelete}>
        <Text style={styles.deleteButton}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productDescription: {
    marginBottom: 5,
  },
  productCategory: {
    marginBottom: 5,
  },
  productImage: {
    width: 100, // Fixed width for the image
    height: 100, // Fixed height for the image
    marginBottom: 5,
  },
  productDiscountPrice: {
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 5,
  },
  deleteButton: {
    color: "#ff6347", // Tomato color
    marginTop: 5,
  },
});

export default ProductListInfo;
