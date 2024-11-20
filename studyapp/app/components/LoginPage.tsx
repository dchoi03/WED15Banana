import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { findUser } from "../data/dummyData";

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (findUser(email, password)) {
      login(email, password);
    } else {
      Alert.alert("Invalid username or password. Please try again.");
    }
  };

  
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/people/logo.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,

    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f9f9f9",
    width: "90%",
    height: 50,

    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,

    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,

  },
  loginButton: {
    backgroundColor: "#007AFF",
    width: "90%",
    height: 50,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 18,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginPage;
