import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Advertisement = () => {
  return (
    <View style={styles.advertisement}>
      <View style={styles.adImagesContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.adImage}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/400x200" }}
          style={styles.adImage}
        />
        <Image
          source={{ uri: "https://via.placeholder.com/400x200" }}
          style={styles.adImage}
        />
      </View>
      <Text style={styles.adText}>Check out our latest offers!</Text>
    </View>
  );
};

export default Advertisement;

const styles = StyleSheet.create({
  advertisement: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  adImagesContainer: {
    marginBottom: 10,
  },
  adImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    marginBottom: 10,
  },
  adText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
