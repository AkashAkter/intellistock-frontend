import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import Dashboard from "../riderScreen/Dashboard";
import RiderProfileScreen from "../riderScreen/RiderProfileScreen";
import AdminHome from "../admin/AdminHome";
import CollectionScreen from "../screens/CollectionScreen";
import OrderInfoScreen from "../riderScreen/OrderInfoScreen";
import UserList from "../admin/UserList";
import ProductList from "../admin/ProductList";
import OrderList from "../admin/OrderList";
import AddProduct from "../admin/AddProduct";
import ProductListInfo from "../admin/ProductListInfo";
import ProfileDetails from "../components/ProfileDetails";
import RecievedOrderInfo from "../riderScreen/RecievedOrderInfo";
import UserListInfo from "../admin/UserListInfo";
import AdminProfile from "../admin/AdminProfile";
import AddOfferProduct from "../admin/AddOfferProduct";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Collections"
          component={CollectionScreen}
          options={{
            tabBarLabel: "Collections",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="list-alt" size={24} color="#008E97" />
              ) : (
                <FontAwesome name="list-alt" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="shopping-cart" size={24} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            tabBarLabel: "Favourite",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialIcons name="favorite" size={24} color="#008E97" />
              ) : (
                <MaterialIcons
                  name="favorite-outline"
                  size={24}
                  color="black"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function BottomTabsForRider() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Rider"
          component={Dashboard}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Rider Profile"
          component={RiderProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function BottomTabsForAdmin() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="AdminHome"
          component={AdminHome}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Users"
          component={UserList}
          options={{
            tabBarLabel: "Users",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Feather name="users" size={24} color="#008E97" />
              ) : (
                <Feather name="users" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProductList}
          options={{
            tabBarLabel: "Products",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="list" size={24} color="#008E97" />
              ) : (
                <Entypo name="list" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrderList}
          options={{
            tabBarLabel: "Orders",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="shoppingcart" size={24} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Admin Profile"
          component={AdminProfile}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="user" size={24} color="#008E97" />
              ) : (
                <AntDesign name="user" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RiderScreen"
          component={BottomTabsForRider}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminScreen"
          component={BottomTabsForAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderInfo"
          component={OrderInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecievedOrderInfo"
          component={RecievedOrderInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProductWithOffer"
          component={AddOfferProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminProductInfo"
          component={ProductListInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UsersInformation"
          component={UserListInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileInfo"
          component={ProfileDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
