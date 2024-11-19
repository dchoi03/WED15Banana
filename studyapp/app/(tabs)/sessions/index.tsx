import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useLocalSearchParams } from "expo-router";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import AntDesign from "@expo/vector-icons/AntDesign";

const SESSIONS_STORE_KEY = "sessions_store_key";


const formatTime = (timeString) => {
  const time = new Date(timeString);
  return `${time.toLocaleDateString()} ${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

export default function SessionsScreen() {
  const [sessions, setSessions] = useState([
    {
      name: "Python Help Session",
      date: "2024-12-03",
      time: "2024-12-03T00:00:00.000Z",
      location: "UNSW Law Library",
      description: "Get help with Python assignments",
      members: 5,
      isJoined: false,
      membersInfo: [
        { memberName: "Bob", profilePicture: "..." },
        { memberName: "Bob2", profilePicture: "..." },
      ],
    },
  ]);

  const [viewType, setViewType] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [markedDates, setMarkedDates] = useState({
    '2024-12-03': { customStyles: styles.markedDateContainer },
  });
  const { name, date, time, location, description, members, isJoined, membersInfo, idx } = useLocalSearchParams();

  const dailySessions = sessions.filter((session) => session.date === selectedDate);

  // Load sessions and marked dates from AsyncStorage on mount
  useEffect(() => {
    const loadSessions = async () => {
      const storedSessions = await AsyncStorage.getItem(SESSIONS_STORE_KEY);
      if (storedSessions) {
        const parsedSessions = JSON.parse(storedSessions);
        setSessions(parsedSessions);

        // Generate markedDates from stored sessions
        const initialMarkedDates = {};
        parsedSessions.forEach((session) => {
          const formattedDate = session.date.split("T")[0];
          initialMarkedDates[formattedDate] = {
            selected: true,
            selectedColor: session.isJoined ? "#088DCD" : "#A2DDFA",
          };
        });
        setMarkedDates(initialMarkedDates);
      }
    };
    loadSessions();
  }, []);

  // Save sessions to AsyncStorage whenever they change
  useEffect(() => {
    const saveSessions = async () => {
      await AsyncStorage.setItem(SESSIONS_STORE_KEY, JSON.stringify(sessions));
    };
    saveSessions();
  }, [sessions]);

  // Add or update session if parameters are passed
  useEffect(() => {
    if (name && date) {
      const newSession = { name, date, time, location, description, members, isJoined, membersInfo };

      setSessions((prevSessions) => {
        const updatedSessions = prevSessions.map((session, index) =>
          index === idx ? { ...session, isJoined } : session
        );

        const exists = prevSessions.some(
          (session) => session.name === name && session.date === date
        );
        if (!exists) {
          return [...updatedSessions, newSession];
        }
        return updatedSessions;
      });

      const formattedDate = date.split("T")[0];
      setMarkedDates((prevDates) => ({
        ...prevDates,
        [formattedDate]: {
          selected: true,
          selectedColor: isJoined ? "#088DCD" : "#A2DDFA",
        },
      }));
    }
  }, [name, date, isJoined]);

  const groupSessions = sessions.filter((session) => session.isJoined);
  const availableSessions = sessions.filter((session) => !session.isJoined);

  return (
    <View style={styles.container}>
      <ScrollView>
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

        {viewType === "monthly" && (
          <Calendar
            style={styles.calendarStyle}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            markingType="custom"
          />
        )}

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
          {groupSessions.length === 0 ? (
            <View style={styles.noTasksContainer}>
              <Text style={styles.noTaskText}>No Group Sessions Made</Text>
            </View>
          ) : (
            <View style={styles.tasksWrapper}>
              {groupSessions.map(({ name, date, time, location, description, members, membersInfo }, idx) => (
                <Link
                  key={idx}
                  href={{
                    pathname: "sessions/details",
                    params: { name, date, time, location, description, members, idx, isJoined: true, membersInfo: JSON.stringify(membersInfo) },
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
              {availableSessions.map(({ name, date, time, description, location, members, membersInfo }, idx) => (
                <Link
                  key={idx}
                  href={{
                    pathname: "sessions/details",
                    params: { name, date, time, location, description, members, idx, isJoined: false, membersInfo: JSON.stringify(membersInfo) },
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
