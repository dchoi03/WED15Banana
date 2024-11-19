import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import * as Speech from "expo-speech";
import { MaterialIcons } from "@expo/vector-icons"; // Import an icon library

const formatTime = (timeString) => {
  const time = new Date(timeString);
  return `${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export default function DetailsScreen() {
  const {
    name,
    date,
    time,
    location,
    description,
    members,
    idx,
    isJoined: initialIsJoined,
    membersInfo: rawMembersInfo,
  } = useLocalSearchParams();

  const [isJoined, setIsJoined] = useState(initialIsJoined === "true" || initialIsJoined === true);
  const navigation = useNavigation();
  const membersInfo = rawMembersInfo ? JSON.parse(rawMembersInfo) : [];

  // Function to read the description
  const handleReadDescription = () => {
    if (description) {
      Speech.speak(description, {
        rate: 1.0, // Adjust speed
        pitch: 1.0, // Adjust pitch
      });
    } else {
      Speech.speak("No description available for this session.");
    }
  };

  const handleJoinLeave = () => {
    const updatedIsJoined = !isJoined;
    setIsJoined(updatedIsJoined); // Update local state

    // Show Toast notification
    Toast.show({
      type: "info",
      text1: updatedIsJoined ? "Joined Group" : "Left Group",
      text2: `You have ${updatedIsJoined ? "joined" : "left"} the session "${name}".`,
    });

    // Navigate back to index with updated session data
    navigation.navigate("index", {
      idx,
      name,
      date,
      time,
      location,
      description,
      members,
      isJoined: updatedIsJoined,
      membersInfo: JSON.stringify(membersInfo),
    });
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>{name}</Text>
          <Text style={styles.textContainer}>
            {formatTime(time)} {new Date(date).toDateString()}
          </Text>
          <Text style={styles.textContainer}>{location}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.subHeading}>Description</Text>
          {/* Icon-only TTS Button */}
          <TouchableOpacity onPress={handleReadDescription} style={styles.ttsIcon}>
            <MaterialIcons name="volume-up" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.textContainer}>
          {description ? description : "No description provided for this session."}
        </Text>
        <View>
          <Text style={styles.subHeading}>
            Members {members ? `${membersInfo.length}/${members}` : "(Open Session)"}
          </Text>
        </View>

        {/* Join/Leave Button */}
        <View style={styles.buttonContainer}>
          {!isJoined ? (
            <TouchableOpacity style={styles.joinButton} onPress={handleJoinLeave}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.leaveButton} onPress={handleJoinLeave}>
              <Text style={styles.buttonText}>Leave</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },

  heading: {
    color: "#05405D",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },

  subHeading: {
    color: "#05405D",
    fontWeight: "bold",
    fontSize: 20,
  },

  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  ttsIcon: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    marginVertical: 10,
    fontSize: 18,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollViewContent: {
    paddingBottom: 20,
  },

  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },

  joinButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },

  leaveButton: {
    backgroundColor: "#F44336",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
