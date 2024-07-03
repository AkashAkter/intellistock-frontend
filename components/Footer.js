import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerInfoContainer}>
        <Text style={styles.footerInfo}>
          © 2024 intellistock. All Rights Reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e7e7e7",
    alignItems: "center",
  },

  footerInfoContainer: {
    alignItems: "center",
  },
  footerInfo: {
    color: "#6c757d",
    fontSize: 14,
  },
});

export default Footer;
