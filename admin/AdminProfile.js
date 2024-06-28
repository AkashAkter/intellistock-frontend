import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminProfile = () => {
  const navigation = useNavigation();
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    // console.log("auth token cleared");
    navigation.replace("Login");
  };
  return (
    <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View>
        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
          }}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AdminProfile;
