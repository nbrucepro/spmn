import { useFormik } from "formik";
import React from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import colors from "../util/colors";

const SignIn = ({ navigation }) => {
  //   useEffect(() => {
  //     const getToken = async () => {
  //       const token = await SecureStore.getItemAsync("token");
  //       console.log({ token });
  //       if (token) {
  //         navigation.navigate("Home");
  //       }
  //     };
  //     getToken();
  //   }, []);
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (!values.email || !values.password) {
        Alert.alert("Error", "You must fill in all fields");
      }
      const response = await fetch("http://localhost:3500/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log("Login data here...", data);

          if (data?.access_token) {
            try {
              console.log("saving data...");
            localStorage.setItem(
                "token",
                JSON.stringify(data.token)
              );
              navigation.navigate("Scan");
            } catch (error) {
              Alert.alert("Error", "Something went wrong");
            }
          }
        });
      if (!response.ok) Alert.alert("Error", "Invalid email or password");
    },
  });
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Supa</Text>
            <Text style={styles.logoTextM}>Menu</Text>
          </View>

          <View style={styles.formText}>
            <Text style={styles.formTextWelcome}>Welcome...</Text>
            <Text style={styles.formTextSignIn}>Sign in to continue</Text>
          </View>

          <View style={styles.inputsArea}>
            <View>
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="You email"
                autoCapitalize="none"
              />
              <Icon name="mail" size={20} color="#9098b2" style={styles.icon} />
            </View>

            <View>
              <TextInput
                style={styles.input}
                value={values.password}
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                placeholder="password"
              />
              <Icon name="lock" size={20} color="#9098b2" style={styles.icon} />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.horizontalLine} />
            <View style={styles.or}>
              <Text>OR</Text>
            </View>
            <View style={styles.horizontalLine} />
          </View>
          <View style={styles.authProvider}>
            <TouchableOpacity style={styles.authButton}>
              <Image
                source={require("../../assets/google.png")}
                style={styles.authImage}
              />
              <Text style={styles.authButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton}>
              <Image
                source={require("../../assets/fb.png")}
                style={styles.authImage}
              />
              <Text style={styles.authButtonText}>Sign in with Facebook</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
            <Text style={styles.dontHaveAccount}>
              Don&apos;t have an account?{" "}
              <Text
                style={styles.formTextSignUp}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  authButton: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    marginVertical: 5,
    padding: "3%",
  },
  authButtonText: {
    color: "#9098b2",
    marginLeft: 50,
    textAlign: "center",
  },
  authImage: {
    height: 50,
    width: 50,
  },
  authProvider: {
    justifyContent: "space-between",
    marginVertical: "5%",
  },
  button: {
    backgroundColor: "#F7941D",
    borderRadius: 5,
    elevation: 6,
    padding: "4%",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 1, height: 13 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    backgroundColor: colors.default,
    flex: 1,
    height: "100%",
    width: "100%",
  },
  dontHaveAccount: {
    color: "#9098b2",
    paddingVertical: "3%",
    textAlign: "center",
  },
  forgotPassword: {
    color: "#F7941D",
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "100%",
    marginTop: "20%",
    padding: 20,
  },
  formText: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: "5%",
  },
  formTextSignIn: {
    color: "#9098b2",
    fontSize: 15,
    paddingBottom: "1%",
  },
  formTextSignUp: {
    color: "#F7941D",
    fontSize: 15,
    fontWeight: "bold",
    paddingBottom: "1%",
  },
  formTextWelcome: {
    color: "#4d4d4d",
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: "1%",
  },
  horizontalContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  horizontalLine: {
    borderBottomColor: "#9098b2",
    borderBottomWidth: 1,
    flex: 1,
    height: 1,
  },
  icon: {
    left: 12,
    position: "absolute",
    top: 18,
  },
  input: {
    borderColor: "#9098b2",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    padding: "5%",
    paddingLeft: 40,
  },
  inputsArea: {
    display: "flex",
    paddingVertical: "10%",
  },
  logo: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 40,
    fontWeight: "bold",
  },
  logoTextM: {
    color: "#F7941D",
    fontFamily: "Roboto_700Bold",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 3,
  },
  or: {
    color: "#9098b2",
    textAlign: "center",
    width: 50,
  },
});
