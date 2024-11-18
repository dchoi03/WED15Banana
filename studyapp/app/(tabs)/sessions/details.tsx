import { Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from 'react';

// Format function for displaying time
const formatTime = (timeString) => {
  const time = new Date(timeString);
  return `${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export default function DetailsScreen() {
  const { name, date, time, location, description, members, idx } = useLocalSearchParams();

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
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 100,
  },

  heading: {
    color: "#05405D",
    fontWeight: "bold",
    fontSize: 24,
    margin: 20
  },

  subHeading: {
    color: "#05405D",
    fontWeight: "bold",
    fontSize: 20,
    margin: 20,
  },

  textContainer: {
    marginHorizontal: 20,
    fontSize: 18,
  },

  scrollView: {
    flex: 1,
    backgroundColor: "white"
  },

  scrollViewContent: {
    backgroundColor: "white",
  },
});
