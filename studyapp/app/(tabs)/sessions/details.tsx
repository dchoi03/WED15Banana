import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState } from "react";

// Format function for displaying time
const formatTime = (timeString) => {
  const time = new Date(timeString);
  return `${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export default function DetailsScreen() {
  const { name, date, time, location, description, members, idx, isJoined } = useLocalSearchParams();
  const navigation = useNavigation();

  const handleJoinLeave = () => {
    const updatedIsJoined = !isJoined;
    navigation.navigate("index", { name, date, time, location, description, members, idx, isJoined: updatedIsJoined, })
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
        <View>
          <Text style={styles.subHeading}>Description</Text>
          <Text style={styles.textContainer}>
            {description ? description : "No description provided for this session."}
          </Text>
        </View>
        <View>
          <Text style={styles.subHeading}>
            Members {members ? `2/${members}` : "(Open Session)"}
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
    marginTop: 20,
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
