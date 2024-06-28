import React, { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { UserType } from "../UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileDetails = () => {
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.113:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        MY DETAILS
      </Text>
      <View style={styles.profileContainer}>
        {user ? (
          <>
            {/* Name Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{user?.name}</Text>
            </View>

            {/* Email Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user?.email}</Text>
            </View>

            {/* Phone Number Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.label}>Phone Number:</Text>
              <Text style={styles.value}>{user?.phoneNumber}</Text>
            </View>

            {/* Address Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.label}>Address:</Text>
              <View style={styles.addressContainer}>
                <Text
                  style={styles.value}
                >{`${user?.addresses[0].houseNo}, ${user?.addresses[0].street}`}</Text>
                <Text
                  style={styles.value}
                >{`${user?.addresses[0].landmark}, ${user?.addresses[0].postalCode}`}</Text>
              </View>
            </View>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
    backgroundColor: "white",
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionContainer: {
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  value: {
    fontSize: 16,
    marginTop: 5,
  },
  addressContainer: {
    marginTop: 5,
  },
});

export default ProfileDetails;
