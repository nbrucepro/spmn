import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../util/colors";

const SearchScreen = (props) => {
  const [text, onChangeText] = React.useState("");
  const searchSubmit = () => {
    props.navigation.navigate("ChooseRestaurant", { search: text });
  };
  return (
    <View style={styles.container}>
      <SearchBar
        onChangeText={onChangeText}
        round
        iconColor="#22C55E"
        onSubmitEditing={searchSubmit}
        placeholder="Search for your preferred restaurant"
        leftIconContainerStyle={{ color: Colors.default, fontSize: 50 }}
        // inputContainerStyle={{ backgroundColor: Colors.white }}
        // containerStyle={{ backgroundColor: Colors.default, border: 0 }}
        containerStyle={{
          backgroundColor: Colors.default,
          borderWidth: 0,
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
        inputContainerStyle={{
          backgroundColor: Colors.white,
          borderWidth: 0,
          borderBottomColor: "transparent",
        }}
        inputStyle={{ backgroundColor: Colors.white, width: 290 }}
        value={text}
      />
      <View style={styles.desc}>
        <Text style={styles.middleText}>or</Text>
        <Image
          source={require("../../assets/qr-code.png")}
          style={styles.img}
        />
        <Text style={styles.bottomText}>Scan, Pay & Enjoy</Text>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  bottomText: {
    fontSize: 20,
    marginTop: 20,
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.default,
    height: "100%",
    paddingTop: 100,
  },
  desc: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 100,
    marginTop: 60,
    width: 100,
  },
  input: {
    width: 300,
  },
  middleText: {
    alignItems: "center",
    color: "#171717",
    flexDirection: "row",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 60,
    paddingTop: 10,
  },
});
