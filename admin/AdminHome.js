import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminHome = () => {
  return (
    <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* Main Logo Section */}
        <View style={styles.mainLogoSection}>
          <Image
            source={require("../assets/intellistockLogo.png")}
            style={styles.mainLogo}
          />
        </View>

        {/* Banner Section */}
        <View style={styles.bannerSection}>
          <Image
            source={{
              uri: "https://hips.hearstapps.com/hmg-prod/images/office-and-school-supplies-arranged-on-wooden-table-royalty-free-image-1687558904.jpg?crop=1xw:0.84415xh;center,top&resize=1200:*",
            }} // Update with your banner URL
            style={styles.bannerImage}
          />
        </View>

        {/* Section with two images side by side */}
        <View style={styles.twoImagesSection}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/485725200/photo/school-and-office-accessories-on-wooden-background.jpg?s=612x612&w=0&k=20&c=PWgiIA-7_QDC_PXnEhwZqDLDDzrNMIxxJjBeD4h4oLM=",
            }}
            style={styles.squareImage}
          />
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1156775743/photo/education.jpg?s=612x612&w=0&k=20&c=RkNSaBQqCAPF0TTP0L1JOAHr_Q-G30m6d1SU8kNXJ0E=",
            }}
            style={styles.squareImage}
          />
        </View>

        {/* Section with three images in a row */}
        <View style={styles.threeImagesSection}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1309810473/vector/school-and-education-cute-stickers-template-set-bundle-of-textbooks-stationery-supply.jpg?s=612x612&w=0&k=20&c=FK9I4pNGCZY9uNV7sOZvpy4tlTI_yihbbiQetn4KgGE=",
            }} // Update with your image URL
            style={styles.wideImage}
          />
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1008722314/photo/overhead-shot-of-back-to-school-office-supplies-on-white-background-with-paper-note-book-into.jpg?s=612x612&w=0&k=20&c=BijGNI5CUi5K_pL93H-PeEvf2kwxT4lXETlSN42DjSQ=",
            }} // Update with your image URL
            style={styles.wideImage}
          />
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1401800408/vector/school-stickers-clipart-labels.jpg?s=612x612&w=0&k=20&c=wnpPVJ7CO1Xa8GWPm3q563u7bjv53xMJ_rBqWRNFV2A=",
            }} // Update with your image URL
            style={styles.wideImage}
          />
        </View>

        {/* Section with bordered image */}
        <View style={styles.borderedImageSection}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/483116716/vector/cute-school-items.jpg?s=612x612&w=0&k=20&c=q2SzTs4SSG3RHZBAK55QCJ7woymVQ7giWrNsw4e0PoE=",
            }} // Update with your image URL
            style={styles.borderedImage}
          />
        </View>
        <View style={styles.borderedImageSection}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/840451180/vector/cartoon-3d-vector-characters-of-school-writing-stationery.jpg?s=612x612&w=0&k=20&c=fqvwqSrTYbs-Zw7cBRqLrxUJiPglWCdaJgeHrM881TA=",
            }} // Update with your image URL
            style={styles.borderedImage}
          />
        </View>
        <View style={styles.borderedImageSection}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1400820360/photo/opened-school-backpack-with-stationery-on-green-background-concept-back-to-school-school.jpg?s=612x612&w=0&k=20&c=6IcMcqcc6VhcCqWYGS9SnUc485HwxdcEVMekub6JS1k=",
            }} // Update with your image URL
            style={styles.borderedImage}
          />
        </View>

        <View style={styles.threeImagesSection}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1309810473/vector/school-and-education-cute-stickers-template-set-bundle-of-textbooks-stationery-supply.jpg?s=612x612&w=0&k=20&c=FK9I4pNGCZY9uNV7sOZvpy4tlTI_yihbbiQetn4KgGE=",
            }} // Update with your image URL
            style={styles.wideImage}
          />
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1008722314/photo/overhead-shot-of-back-to-school-office-supplies-on-white-background-with-paper-note-book-into.jpg?s=612x612&w=0&k=20&c=BijGNI5CUi5K_pL93H-PeEvf2kwxT4lXETlSN42DjSQ=",
            }} // Update with your image URL
            style={styles.wideImage}
          />
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1401800408/vector/school-stickers-clipart-labels.jpg?s=612x612&w=0&k=20&c=wnpPVJ7CO1Xa8GWPm3q563u7bjv53xMJ_rBqWRNFV2A=",
            }} // Update with your image URL
            style={styles.wideImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  mainLogoSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  mainLogo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  bannerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  bannerImage: {
    width: "100%",
    height: 200, // Adjust this value to set the desired height for the banner
    resizeMode: "cover",
  },
  twoImagesSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  squareImage: {
    width: "48%",
    aspectRatio: 1,
    resizeMode: "cover",
  },
  threeImagesSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  wideImage: {
    width: "32%",
    aspectRatio: 3 / 2,
    resizeMode: "cover",
  },
  borderedImageSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  borderedImage: {
    width: "90%",
    height: 150,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#000",
    padding: 10,
  },
});
