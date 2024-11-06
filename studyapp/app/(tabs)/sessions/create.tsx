import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateSessionScreen() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(true);

  const navigation = useNavigation();

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <VStack space="md">
          <Text style={styles.label}>Session Name</Text>
          <Input style={{ height: 45 }}>
            <InputField 
              type="text" 
              placeholder="Enter Session Name" 
              value={name}
              onChangeText={setName}
            />
          </Input>
        </VStack>
      </View>
      
      {/* Date Picker */}
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Date</Text>
        <VStack space="md">
        <View style={{flexDirection: "row"}}>
          <Input style={{ height: 45 }}>
            <TouchableOpacity 
              onPress={() => setShowDatePicker(true)} 
              style={styles.datePickerTouchable}
            >
              <Text style={styles.dateText}>
                {date.toDateString()}
              </Text>
            </TouchableOpacity>
          </Input>
          {showDatePicker && (
            <DateTimePicker 
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
        </VStack>
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Time</Text>
        <VStack space="md">
        <View style={{flexDirection: "row"}}>
          <Input style={{ height: 45 }}>
            <TouchableOpacity 
              onPress={() => setShowTimePicker(true)} 
              style={styles.datePickerTouchable}
            >
              <Text style={styles.dateText}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
          </Input>
          {showTimePicker && (
            <DateTimePicker 
              value={time}
              mode="time"
              display="default"
              onChange={onTimeChange}
            />
          )}
        </View>
        </VStack>

      </View>
      

      <View style={styles.inputContainer}>
        <VStack space="md">
          <Text style={styles.label}>Location</Text>
          <Input style={{ height: 45 }}>
            <InputField 
              type="text" 
              placeholder="Enter Location"
              value={location}
              onChangeText={setLocation}
            />
          </Input>
        </VStack>
      </View>

      <View style={styles.inputContainer}>
        <VStack space="md">
          <Text style={styles.label}>Description</Text>
          <Input style={styles.descriptionInput}>
            <InputField 
              type="text" 
              placeholder="Enter Description"
              value={description}
              onChangeText={setDescription}
              multiline={true}
            />
          </Input>
        </VStack>
      </View>

      <View style={styles.inputContainer}>
        <VStack space="md">
          <Text style={styles.label}>Max Number of Members</Text>
          <Input style={{ height: 45 }}>
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
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  inputContainer: {
    marginTop: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },

  datePickerTouchable: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  dateText: {
    fontSize: 16,
    color: "#333",
  },

  descriptionInput: {
    height: 100,
  },

  createButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#007AFF",
    width: 150,
    height: 45,
    borderRadius: 5,
    marginTop: 30,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});
