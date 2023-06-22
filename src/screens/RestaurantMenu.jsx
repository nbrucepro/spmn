import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../util/colors";
import * as SecureStore from "expo-secure-store";

let height = Dimensions.get("window").height;
let width = Dimensions.get("window").width;

const RestaurantMenu = ({ navigation, route }) => {
  const [token, settoken] = useState("");

  useEffect(() => {
    async function getToken() {
      const tokenFromSecureStore = await SecureStore.getItemAsync("token");
      if (tokenFromSecureStore) {
        settoken(JSON.parse(tokenFromSecureStore).accessToken);
      }
    }
    //   getToken();
  }, []);

  const { restaurant } = route?.params || {};
  const categories = ["Appetizer", "Starter", "Main", "Dessert", "Drink"]

  useEffect(() => {
    if (token) {
      fetch("", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error && !data.apierror) {
            // setMenuOptions(data);
            console.log(data);
          } else console.log(data);
        });
    }
  }, [token]);
  const selectMenu = (menu) => {
    // navigation.navigate("RestaurantMenuCart", {
    //   menu: { ...menu, restaurant },
    // });
    navigation.navigate("Checkout",{product:'product1'})
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.headerText}>
        {restaurant?.name || "Choose Kigali"}
      </Text>
      <View style={styles.topLayer}>
        <View style={styles.topLayerImage}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/RestaurantMenu/icon1.png")}
              style={styles.topLayerImage}
            />
            <Text style={styles.imageText}>N8</Text>
          </View>
          <Text style={[styles.topLayerText, { fontWeight: "900" }]}>
            Ordered
          </Text>
        </View>
        <View style={styles.verticalLine}></View>
        <View style={styles.topLayerItem}>
          <Image
            source={require("../../assets/RestaurantMenu/icon2.png")}
            style={styles.topLayerImage}
          ></Image>
          <Text style={styles.topLayerText}>Call waiter</Text>
        </View>
      </View>
      <View>
        <Text style={styles.subHeaderText}>menu</Text>
        <View style={styles.options}>
          {categories?.map((opt,key) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => selectMenu(opt)}
                key={key}
              >
                <View style={styles.menuListItem}>
                  <Text style={styles.menuListItemText}>
                    {opt}
                  </Text>
                  <Icon name="angle-right" size={30} color="#fff" />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default RestaurantMenu;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.black,
    display: "flex",
    height,
    justifyContent: "center",
    width,
  },
  headerText: {
    color: colors.default,
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageText: {
    color: colors.white,
    fontSize: 25,
    marginLeft: 10,
  },
  menuListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: (width * 60) / 100,
  },
  menuListItemText: {
    color: colors.white,
    fontSize: 20,
  },
  options: {
    marginTop: 20,
  },
  subHeaderText: {
    color: colors.default,
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },
  topLayer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 60,
    width: (width * 80) / 100,
  },
  topLayerImage: {
    height: 50,
    resizeMode: "contain",
  },
  topLayerItem: {
    height: 80,
  },
  topLayerText: {
    color: colors.white,
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
  verticalLine: {
    backgroundColor: colors.border,
    width: 2,
  },
});
