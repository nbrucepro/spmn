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

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const RestaurantMenu = ({navigation}) => {
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
    const {menuOptions, setMenuOptions} = useState([]);

    useEffect(()=>{
        if(token){
            fetch('',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            }).then((res)=>res.json()).then((data)=>{
                if(!data.error && !data.apierror){
                   setMenuOptions(data) ;
                }else console.log(data);
            });
        }
    },[token]);
    const selectMenu = (menu:Object) => {
        navigation.navigate('RestuarantMenuCart',{
            menu:{...menu,restaurant},
        });
    }

  return (
    <View>
        
    </View>
  )
}

export default RestaurantMenu
const styles= StyleSheet.create({
    container:{
        alignItems: "center",
        backgroundColor: colors.black,
        display: "flex",
        height,
        justifyContent: "center",
        width,
        },
        headerText:{
            color: colors.default,
            fontSize: 25,
            fontWeight: "900",
            textAlign: "center",
        },
        imageContainer:{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
})