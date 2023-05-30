import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
    
  createStackNavigator,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import React from "react";
import Signup from "../../screens/Signup";
import { TouchableOpacity, View } from "react-native";
import SignIn from "../../screens/SignIn";

export default Navigator = () => {
  return <AuthNavigator />;
};

const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
         }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator> 
  );
};

const Tabs = createBottomTabNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setIsAuthenticated(true);
      }
    };
    // getToken();
  }, []);

  if (!isAuthenticated) return <AuthNavigator />;

  return (
    <Tabs.Navigator
      initialRouteName="Scan"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "white",
          height: 80,
          paddingBottom: 10,
          padding: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginHorizontal: 5,
          position: "absolute",
          borderColor: "white",
          elevation: 10,
        },
        tabBarButton: (props) => {
          return (
            <View {...props}>
              <View
                style={{
                  minWidth: 50,
                  minHeight: 50,
                  borderRadius: 10,
                  backgroundColor: props.accessibilityState.selected
                    ? "#F6E3DB"
                    : "white",
                }}
              >
                <TouchableOpacity {...props} />
              </View>
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#F7941D",
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
        component={DashBoardScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bell-badge-outline"
              size={24}
              color={color}
            />
          ),
        }}
        name="Notification"
        component={NotificationScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="progress-clock"
              size={24}
              color={color}
            />
          ),
        }}
        name="Clock"
        component={SearchStack}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingCart" size={24} color={color} />
          ),
        }}
        name="Cart"
        component={ShoppingCartScreen}
      />
    </Tabs.Navigator>
  );
};
