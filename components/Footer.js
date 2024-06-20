import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity onPress={() => console.log("Facebook clicked")}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png",
            }}
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Twitter clicked")}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553",
            }}
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Instagram clicked")}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
            }}
            style={styles.socialMediaIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.footerLinksContainer}>
        <Text style={styles.footerLink}>About Us</Text>
        <Text style={styles.footerLink}>Contact</Text>
        <Text style={styles.footerLink}>Privacy Policy</Text>
      </View>
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
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialMediaIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  footerLinksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  footerLink: {
    marginHorizontal: 10,
    color: "#007BFF",
    fontSize: 16,
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
