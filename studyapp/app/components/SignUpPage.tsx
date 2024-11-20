import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "@profile";

const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const saveDetails = async () => {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify([
      { id: '1', title: "Username", content: name },
      { id: '2', title: "name", content: "" },
      { id: '3', title: "education", content: "" },
      { id: '4', title: "University", content: "" },
      { id: '5', title: "Grade", content: "" },
      { id: '6', title: "Current Courses", content: "" },
      { id: '7', title: "Goals", content: "" },
      { id: '8', title: "Contact", content: phone },
      { id: '9', title: "Email", content: email },
      { id: '10', title: "Bio", content: "" },
      { id: '11', title: "ProfilePic", content: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" },
    ]));
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    saveDetails();
    signUp(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Study Buddy</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Mobile"
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007AFF',
  },
  inputGroup: {
    marginBottom: 15,
    width: '90%',
  },
  label: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  signUpButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
});

export default SignUpPage;
