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
  const [viewType, setViewType] = useState("monthly"); // View type state
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Selected date
  const [markedDates, setMarkedDates] = useState({
    '2024-12-03': { customStyles: styles.markedDateContainer },
    '2024-12-14': { customStyles: styles.markedDateContainer },
    '2024-12-29': { customStyles: styles.markedDateContainer },
  });  // State to store marked dates
  const [availableSessions, setAvailableSessions] = useState([
    {
      name: "Python Help Session",
      date: "2024-12-03",
      time: "2024-12-03T00:00:00.000Z",
      location: "UNSW Law Library",
      description: "Get help with Python assignments",
      members: 5,
      isJoined: false,
    },
    // {
    //   name: "COMP3121 Study Session",
    //   date: "2024-12-14",
    //   time: "2024-12-14T10:00:00.000Z",
    //   location: "Online",
    //   description: "Revision for COMP3121 exam",
    //   members: 10,
    // },
    // {
    //   name: "COMP1151 Review",
    //   date: "2024-12-29",
    //   time: "2024-12-29T04:00:00.000Z",
    //   location: "Ainsworth Building",
    //   description: "Review concepts for COMP1151",
    //   members: 8,
    // },
  ]);
  
  const { name, date, time, location, description, members, isJoined } = useLocalSearchParams();

  const dailySessions = availableSessions.filter((session) => session.date === selectedDate);

  useEffect(() => {
    if (viewType === "daily") {
      // Additional logic can go here for daily view
    }
  }, [viewType, selectedDate]);

  useEffect(() => {
    // If session data is available, add it to the sessions and mark the date on the calendar
    if (name && date) {
      const newSession = { name, date, time, location, description, members };
      setMySessions((prevSessions) => [...prevSessions, newSession]);

      // Update the markedDates with the new session's date
      const formattedDate = date.split('T')[0];  // Extract the date part (YYYY-MM-DD)
      setMarkedDates((prevDates) => ({
        ...prevDates,
        [formattedDate]: { selected: true, selectedColor: "#088DCD", customStyles: styles.JoinedDateContainer },
      }));
    }
  }, [name, date, time, location, description, members]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Select View Toggle */}
        <View style={styles.selectWrapper}>
          <Select onValueChange={(value) => setViewType(value)} value={viewType}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder={viewType === "monthly" ? "Monthly" : "Daily"} />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Monthly" value="monthly" />
                <SelectItem label="Daily" value="daily" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </View>

        {/* Monthly View */}
        {viewType === "monthly" && (
          <Calendar
            style={styles.calendarStyle}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates} // Use the markedDates state here
            markingType="custom" // Specify custom marking type
          />
        )}

        {/* Daily View */}
          {viewType === "daily" && (
            <View style={styles.dailyView}>
              <Text style={styles.dailyHeading}>Sessions on {selectedDate}</Text>
              {dailySessions.length > 0 ? (
                dailySessions.map((item, idx) => (
                  <TouchableOpacity key={idx} style={styles.dailyTaskContainer}>
                    <Text style={styles.dailyTaskTitle}>{item.name}</Text>
                    <Text style={styles.dailyTaskDetails}>
                      {formatTime(item.time)} - {item.location}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noDailyTasksText}>No sessions available today.</Text>
              )}
            </View>
          )}

        <View>
          <Text style={styles.GroupSessionHeading}>Your Group Sessions</Text>
          {mySessions.length === 0 ? (
            <View style={styles.noTasksContainer}>
              <Text style={styles.noTaskText}>No Group Sessions Made</Text>
            </View>
          ) : (
            <View style={styles.tasksWrapper}>
              {mySessions.map(({ name, date, time, location, members, isJoined }, idx) => (
                <Link
                  key={idx}
                  href={{
                    pathname: "sessions/details",
                    params: { name, date, time, location, members, idx },
                  }}
                  asChild
                >
                  <TouchableOpacity style={styles.taskContainer}>
                    <Text style={styles.sessionTitle}>{name}</Text>
                    <Text style={styles.sessionDetails}>
                      {formatTime(time)} - {location}
                    </Text>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          )}
        </View>
        <View>
        <Text style={styles.ToJoinHeading}>Available To Join</Text>
        {availableSessions.length === 0 ? (
          <View style={styles.noTasksContainer}>
          <Text style={styles.noTaskText}>Nothing Available</Text>
        </View>
        ) : (
          <View style={styles.tasksWrapper}>
            {availableSessions.map(({ name, date, time, location, description, members, isJoined }, idx) => (
              <Link
                key={idx}
                href={{
                  pathname: "sessions/details",
                  params: { name, date, time, location, description, members, idx },
                }}
                asChild
              >
                <TouchableOpacity style={styles.taskContainer2}>
                  <Text style={styles.sessionTitle2}>{name}</Text>
                  <Text style={styles.sessionDetails2}>
                    {formatTime(time)} - {location}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        )}
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
    marginTop: 15,
    marginVertical: 10,
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
    borderWidth: 2, // Add border width
    borderColor: "#C2C2C2", // Add border color
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
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 2, // Add border width
    borderColor: "#C2C2C2", // Add border color
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
  markedDateContainer: {
    container: {
      backgroundColor: '#A2DDFA',
      borderRadius: 5,
    },
    text: {
      color: '#000',
    },
  },
  JoinedDateContainer: {
    container: {
      backgroundColor: '#088DCD',
      borderRadius: 5,
    }
  },
  dailyView: {
    flex: 1, // Take up remaining space
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 40,
    paddingBottom: 150,
    paddingTop: 25,
  },
  dailyHeading: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: "bold",
    color: "#05405D",
    marginBottom: 10,
  },
  dailyTaskContainer: {
    backgroundColor: "#E8F5FE",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BCE0FD",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dailyTaskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F1F1F",
  },
  dailyTaskDetails: {
    fontSize: 14,
    color: "#4F4F4F",
    marginTop: 5,
  },
  noDailyTasksText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
