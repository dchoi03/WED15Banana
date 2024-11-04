import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { Button, ButtonText } from "@/components/ui/button";


export default function CreateSessionScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Session Name</Text>
              <Input>
                <InputField type="text" />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Date</Text>
              <Input>
                <InputField type="text" />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Time</Text>
              <Input>
                <InputField type="text" />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Location</Text>
              <Input>
                <InputField type="text" />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Description</Text>
              <Input style={{ height: 100 }}>
                <InputField type="text" />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Max Number of Members</Text>
              <Input>
                <InputField type="text" />
              </Input>
        </VStack>      
      </View>
      <Button style={styles.createButton}>
        <ButtonText style={styles.buttonText}>Create Session</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "white",
    flex: 1
  },

  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'column',
  },
  dateButton: {
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dateText: {
    fontSize: 16,
  },

  createButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#007AFF",
    width: 125,
    height: 40,
    marginTop: 50
  },

  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto'
  }
});
