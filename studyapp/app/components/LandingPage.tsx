import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

interface LandingPageProps {
  onNavigate: (screen: "login" | "signup") => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/people/logo.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Buddy Matcher!</Text>
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, styles.loginButton]}
          onPress={() => onNavigate("login")}
          action="primary"
        >
          <ButtonText style={styles.loginButtonText}>Login</ButtonText>
        </Button>
        <Button
          style={[styles.button, styles.signUpButton]}
          onPress={() => onNavigate("signup")}
          action="secondary"
        >
        <ButtonText style={styles.signUpButtonText}>Sign Up</ButtonText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",

    alignItems: "center",

    padding: 16,

  },
  logo: {
    width: 220,
    height: 220,

    marginBottom: 10,
    marginTop: 20,
    paddingTop: 30,
  },
  title: {
    color: "#007AFF",
    fontSize: 28,
    fontWeight: "bold",

    marginTop: 5,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 50,
  },
  button: {
    width: "80%",

    borderRadius: 8,
    marginVertical: 10,
    alignSelf: "center",

    paddingVertical: 6,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    height: 50,
  },
  loginButtonText: {
    color: "white",

    textAlign: "center",

    fontWeight: "bold",
    fontSize: 15,
  },
  signUpButton: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor:  "#007AFF",
    height: 50,

  },
  signUpButtonText: {
    color:  "#007AFF",

    textAlign: "center",

    fontWeight: "bold",
    fontSize: 15,

  },
});
