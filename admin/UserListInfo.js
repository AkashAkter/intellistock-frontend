import React from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";

const UserListInfo = ({ user, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://intelli-stock-server-akash-akters-projects.vercel.app/users/${user._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete user");
      }

      // Call onDelete to refresh the user list after deletion
      onDelete(user._id);
      Alert.alert("Success", "User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
      Alert.alert("Error", "Failed to delete user");
    }
  };

  return (
    <View style={styles.userContainer}>
      <Text style={styles.userInfo}>Name: {user.name}</Text>
      <Text style={styles.userInfo}>Email: {user.email}</Text>
      <Text style={styles.userInfo}>Phone Number: {user.phoneNumber}</Text>
      <Text style={styles.userInfo}>User Role: {user.role}</Text>
      {/* Delete button */}
      <Pressable onPress={handleDelete}>
        <Text style={styles.deleteButton}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  deleteButton: {
    color: "#ff6347", // Tomato color
    marginTop: 5,
  },
});

export default UserListInfo;
