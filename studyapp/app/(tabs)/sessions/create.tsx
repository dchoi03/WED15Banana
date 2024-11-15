import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [errors, setErrors] = useState({}); // State for validation errors

  const navigation = useNavigation();

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(true);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(true);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // Validate fields and set error messages if necessary
  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = "This field has to be entered";
    if (!location) newErrors.location = "This field has to be entered";
    if (!description) newErrors.description = "This field has to be entered";
    if (!members) newErrors.members = "This field has to be entered";

    setErrors(newErrors);
    
    // If no errors, navigate to the next screen
    if (Object.keys(newErrors).length === 0) {
      navigation.navigate("index", { name, date: date.toISOString(), time: time.toISOString(), location, description, members });
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
              placeholder={errors.name ? errors.name : "Enter Session Name"} 
              placeholderTextColor={errors.name ? "red" : "#888"}
              value={name}
              onChangeText={(text) => {
                setName(text);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
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
              placeholder={errors.location ? errors.location : "Enter Location"}
              placeholderTextColor={errors.location ? "red" : "red"}
              value={location}
              onChangeText={(text) => {
                setLocation(text);
                setErrors((prev) => ({ ...prev, location: "" }));
              }}
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
              placeholder={errors.description ? errors.description : "Enter Description"}
              placeholderTextColor={errors.description ? "red" : "#888"}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                setErrors((prev) => ({ ...prev, description: "" }));
              }}
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
              placeholder={errors.members ? errors.members : "Enter Max Number of Members"}
              placeholderTextColor={errors.members ? "red" : "#888"}
              value={members}
              onChangeText={(text) => {
                setMembers(text);
                setErrors((prev) => ({ ...prev, members: "" }));
              }}
            />
          </Input>
        </VStack>
      </View>

      <Button 
        style={styles.createButton} 
        onPress={validateFields} // Call validateFields on press
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
