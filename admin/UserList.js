import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import UserListInfo from "./UserListInfo";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Function to fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://192.168.0.113:8000/users");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      setUsers(json.users);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle user deletion and refresh users list
  const handleUserDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const nonAdminUsers = users.filter((user) => user.role !== "admin");

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        {nonAdminUsers.map((user, index) => (
          <UserListInfo key={index} user={user} onDelete={handleUserDelete} />
        ))}
      </View>
    </ScrollView>
  );
};

export default UserList;

const styles = StyleSheet.create({});
