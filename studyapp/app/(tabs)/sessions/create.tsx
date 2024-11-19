import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from "react-native-toast-message";

export default function CreateSessionScreen() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isJoined, setIsJoined] = useState(true);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [membersInfo, setMembersInfo] = useState([]);
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

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Session Name Required";
    if (!location) newErrors.location = "Location Required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Show success toast
      Toast.show({
        type: "success",
        text1: "Session Created",
        text2: `Your session "${name}" has been created!`,
      });

      // Navigate back to index
      navigation.navigate("index", {
        name,
        date: date.toISOString(),
        time: time.toISOString(),
        location,
        description,
        members,
        isJoined: true,
        membersInfo: [
          {
            memberName: "Name",
            memberProfilePic: "ProfilePic",
          },
        ],
      });
    }
  };

  const getInputFieldStyles = (field) => ({
    height: 45,
    borderColor: errors[field] ? 'red' : '#ccc',
    borderWidth: 1,
    });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <VStack space="md">
          <Text style={styles.label}>Session Name</Text>
          <Input style={getInputFieldStyles('name')}>
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
          {/* <Input style={{ height: 45 }}>
            <TouchableOpacity 
              onPress={() => setShowDatePicker(true)} 
              style={styles.datePickerTouchable}
            >
              <Text style={styles.dateText}>
                {date.toDateString()}
              </Text>
            </TouchableOpacity>
          </Input> */}
          
            <DateTimePicker 
            style={{ backgroundColor: 'white', marginLeft: 10 }}
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
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
          <Input style={getInputFieldStyles('location')}>
            <InputField 
              type="text" 
              placeholder={errors.location ? errors.location : "Enter Location"}
              placeholderTextColor={errors.location ? "red" : "redr"}
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
              placeholder={"Enter Description"}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
              multiline={true}
            />
          </Input>
        </VStack>
      </View>

      <View style={styles.inputContainer}>
        <VStack space="md">
          <Text style={styles.label}>Max Number of Buddies</Text>
          <Input style={{ height: 45 }}>
            <InputField 
              type="text"
              placeholder={"Enter Max Number of Members"}
              value={members}
              onChangeText={(text) => {
                setMembers(text);
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
