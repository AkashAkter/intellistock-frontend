import { Dimensions, ImageBackground, View } from "react-native";
import React from "react";

const Banner = () => {
  const { width: viewportWidth } = Dimensions.get("window");
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ImageBackground
        source={{
          uri: "https://concordiacharter.org/wp-content/uploads/2016/02/School-Supply.jpg",
        }}
        style={{
          width: viewportWidth,
          height: 200, // Adjust the height as needed
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="cover"
      ></ImageBackground>
    </View>
  );
};

export default Banner;
