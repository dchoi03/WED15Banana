import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Input, InputField } from "@/components/ui/input"
import { VStack } from "@/components/ui/vstack"
import { Button, ButtonText } from "@/components/ui/button";


export default function CreateSessionScreen() {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("")

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Session Name</Text>
              <Input>
                <InputField 
                  type="text" 
                  placeholder="Enter Session Name" 
                  value={name}
                  onChangeText={setName}/>
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Date</Text>
              <Input>
                <InputField 
                  type="text" 
                  placeholder="Enter Date"
                  value={date}
                  onChangeText={setDate}
                />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Time</Text>
              <Input>
                <InputField 
                  type="text" 
                  placeholder="Enter Time"
                  value={time}
                  onChangeText={setTime}
                />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Location</Text>
              <Input>
                <InputField 
                  type="text" 
                  placeholder="Enter Location"
                  value={location}
                  onChangeText={setLocation}
                />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Description</Text>
              <Input style={{ height: 100 }}>
              <InputField 
                  type="text" 
                  placeholder="Enter Description"
                  value={description}
                  onChangeText={setDescription}
                />
              </Input>
        </VStack>
        <VStack space="md">
              <Text className="text-typography-500 leading-1">Max Number of Members</Text>
              <Input>
                <InputField 
                  type="text" 
                  placeholder="Enter Max Number of Members"
                  value={members}
                  onChangeText={setMembers}
                />
              </Input>
        </VStack>      
      </View>
      <Button 
        style={styles.createButton} 
        onPress={() => navigation.navigate("index", { name, date, time, location, description, members })}
      >
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
