import { useFormik } from "formik";
import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../util/colors";
import Icon from "react-native-vector-icons/Feather";

const Signup = ({ navigation }) => {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
      mobile: "",
      fullName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (
        !values.email ||
        !values.password ||
        !values.mobile ||
        !values.fullName
      ) {
        Alert.alert("Error", "you must fill in all fields");
        return;
      }
      const response = await fetch("http://localhost:3500/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          phoneNumber: values.mobile,
          firstName: values.fullName.split(" ")[0],
          lastName: values.fullName.split(" ")[1],
        }),
      });
      const data = await response.json();
      console.log('values, ',values);
      if (!data) {
        console.log("");
      } else {
        Alert.alert("Success", "you've successfully signed up!");
        resetForm();
        navigation.navigate('SignIn')
      }
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Supa</Text>
          <Text style={styles.logoTextM}>Menu</Text>
        </View>
        <View style={styles.formText}>
          <Text style={styles.formTextWelcome}>Welcome.</Text>
          <Text style={styles.formTextFill}>
            Please Fill in the information
          </Text>
        </View>
        <View style={styles.inputsArea}>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Fullname"
              autoCapitalize="none"
              value={values.fullName}
              onChangeText={handleChange("fullName")}
            />
            <Icon name="user" size={20} color="#9098b2" style={styles.icon} />
          </View>
          <View>
            <Icon name="phone" size={20} color="#9098b2" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              autoCapitalize="none"
              value={values.mobile}              
              onChangeText={handleChange("mobile")}
            />
          </View>
          <View>
            <Icon name="mail" size={20} color="#9098b2" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Your email"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange("email")}
            />
          </View>
          <View>
            <Icon name="lock" size={20} color="#9098b2" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Your password"
              autoCapitalize="none"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalContainer}>
          <View style={styles.horizontalLine} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.horizontalLine} />
        </View>
        <Text style={styles.haveAnAccount}>If you have PMG account</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("SignIn");
            console.log('go to sign in');
          }}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.default,
    borderRadius: 5,
    elevation: 6,
    padding: "5%",
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 1, height: 13 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Roboto_700Bold",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    backgroundColor: "#F7941D",
    height: "100%",
    width: "100%",
  },
  dontHaveAccount: {
    color: "#9098b2",
    fontSize: 15,
    paddingVertical: "5%",
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
  formTextFill: {
    color: "#9098b2",
    fontSize: 15,
    paddingBottom: "1%",
  },
  formText: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: "5%",
  },
  formTextWelcome: {
    color: "#9098b2",
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: "1%",
  },
  haveAnAccount: {
    color: "9098b2",
    fontSize: 15,
    paddingVertical: "5%",
    textAlign: "center",
  },
  horizontalContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  horizontalLine: {
    borderBottomColor: colors.border,
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
    borderColor: colors.border,
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
    color: colors.default,
    fontFamily: "Roboto_700Bold",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 3,
  },
  or: {
    color: colors.border,
    textAlign: "center",
    width: 50,
  },
});
