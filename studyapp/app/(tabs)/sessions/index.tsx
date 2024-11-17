import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { Link, useLocalSearchParams } from "expo-router";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import AntDesign from "@expo/vector-icons/AntDesign";

// Format function for displaying time
const formatTime = (timeString) => {
  const time = new Date(timeString);
  return `${time.toLocaleDateString()} ${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export default function SessionsScreen() {
  const [selected, setSelected] = useState('');
  const [mySessions, setMySessions] = useState([]);
  const { name, date, time, location, description, members } = useLocalSearchParams();

  useEffect(() => {
    if (name && date) {
      setMySessions((prevSessions) => [...prevSessions, { name, date, time, location, description, members }]);
    }
  }, [name, date, time, location, description, members]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.selectWrapper}>
          <Select>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Monthly" />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Monthly" value="monthly" />
                <SelectItem label="Weekly" value="weekly" />
                <SelectItem label="Today" value="today" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </View>
        <Calendar
          style={styles.calendarStyle}
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: "orange" },
          }}
        />
        <View>
          <Text style={styles.GroupSessionHeading}>Your Group Sessions</Text>
          {mySessions.length === 0 ? (
            <View style={styles.noTasksContainer}>
              <Text style={styles.noTaskText}>No Group Sessions Made</Text>
            </View>
          ) : (
            <View style={styles.tasksWrapper}>
              {mySessions.map(({ name, date, time, location }, idx) => (
                <View key={idx} style={styles.taskContainer}>
                  <Text style={styles.sessionTitle}>{name}</Text>
                  <Text style={styles.sessionDetails}>{formatTime(time)} - {location}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View>
          <Text style={styles.ToJoinHeading}>Available To Join</Text>
          <View style={styles.tasksWrapper}>
              <View style={styles.taskContainer2}>
                <Text style={styles.sessionTitle2}>Python Help Session</Text>
                <Text style={styles.sessionDetails2}>21/12/2024 11:00am - UNSW Law Library</Text>
              </View>
              <View style={styles.taskContainer2}>
                <Text style={styles.sessionTitle2}>COMP3121 Study Session</Text>
                <Text style={styles.sessionDetails2}>24/12/2024 2:00pm - Online</Text>
              </View>
              <View style={styles.taskContainer2}>
                <Text style={styles.sessionTitle2}>COMP1151 Review</Text>
                <Text style={styles.sessionDetails2}>29/12/2024 12:30pm - Ainsworth Building</Text>
              </View>
            </View>
        </View>
      </ScrollView>
      {/* Create Session Button */}
      <View style={styles.floatingButton}>
        <Link href="/sessions/create" asChild>
          <TouchableOpacity>
            <Text style={styles.floatingButtonText}>
              <AntDesign name="addusergroup" size={30} color="white" />
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  selectWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 25,
    top: 20,
  },
  calendarStyle: {
    margin: 35,
    borderWidth: 5,
    borderColor: "#C2C2C2",
    borderRadius: 15,
    marginBottom: 30,
  },
  GroupSessionHeading: {
    color: "#05405D",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  ToJoinHeading: {
    color: "#05405D",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#077AFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    right: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  noTaskText: {
    fontSize: 16,
    color: "gray",
  },
  tasksWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  taskContainer: {
    padding: 15,
    backgroundColor: "#088DCD",
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  sessionDetails: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
  },
  taskContainer2: {
    padding: 15,
    backgroundColor: "#A2DDFA",
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sessionTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F1F1F",
  },
  sessionDetails2: {
    fontSize: 14,
    color: "#1F1F1F",
    marginTop: 5,
  },
});
