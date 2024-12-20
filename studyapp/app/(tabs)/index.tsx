import React, { FC, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ButtonIcon, ButtonText, Button } from "@/components/ui/button";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import { Plus, X, GraduationCap, Clock, Check, Star } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../components/LoginPage";
import SignUpPage from "../components/SignUpPage";
import LandingPage from "../components/LandingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addBuddy, areNotBuddies, isBuddy } from "@/scripts";
import { useFocusEffect } from "@react-navigation/native";


const PROFILE_KEY = "@profile"
const BUDDY_LIST = "@Buddy"
const sampleStudents = [
  {
    name: "Ava",
    year: "5th Year",
    degree: "Finance & Computer Science",
    image: Image.resolveAssetSource(
      require("../../assets/images/people/ava.png")
    ).uri,
    badges: [
      { name: "Same university", icon: GraduationCap },
      { name: "Matching timetables", icon: Clock },
      { name: "Similar study goals", icon: Star },
    ],
  },
  {
    name: "George",
    year: "1st Year",
    degree: "Commerce",
    image: Image.resolveAssetSource(
      require("../../assets/images/people/george.png")
    ).uri,
    badges: [
      { name: "Same university", icon: GraduationCap },
      { name: "Too Comm099", icon: Check },
    ],
  },
];

export default function HomeScreen() {
    // rishi and me
  const { isAuthenticated } = useAuth();
  const PROFILE_KEY = "@profile"

  const [currentScreen, setCurrentScreen] = useState<"landing" | "login" | "signup">("landing");

  useEffect(() => {
    const saveBuddyList = async () => {
      await AsyncStorage.setItem(BUDDY_LIST, JSON.stringify([
          [
            { id: '1', title: "Username", content: "George123" },
            { id: '2', title: "name", content: "Gerorge pollix" },
            { id: '3', title: "education", content: "Bachelors" },
            { id: '4', title: "University", content: "UNSW" },
            { id: '5', title: "Grade", content: "3rd Year"} ,
            { id: '6', title: "Current Courses", content: "Comp 4511, Comp 2381" },
            { id: '7', title: "Goals", content: "Become better at UI design" },
            { id: '10', title: "Bio", content: "Hi there! Im George and I like skiing, whittling and playing hockey" },
            { id: '11', title: "ProfilePic", content: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" }
          ],
          [
            { id: '1', title: "Username", content: "PaulineUp" },
            { id: '2', title: "name", content: "Pauline Sanders" },
            { id: '3', title: "education", content: "Masters" },
            { id: '4', title: "University", content: "USYD" },
            { id: '5', title: "Grade", content: "1st Year"} ,
            { id: '6', title: "Current Courses", content: "Comp 2321, DART 7070" },
            { id: '7', title: "Goals", content: "Become a mining engineer" },
            { id: '10', title: "Bio", content: "Hi there! Im Pauline and I am a junior analyst at Google data services" },
            { id: '11', title: "ProfilePic", content: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg" }
          ],
          [
            { id: '1', title: "Username", content: "Grefe42123" },
            { id: '2', title: "name", content: "gerefe pollix" },
            { id: '3', title: "education", content: "Post Graduate" },
            { id: '4', title: "University", content: "UNSW" },
            { id: '5', title: "Grade", content: "2nd Year"} ,
            { id: '6', title: "Current Courses", content: "unspecified" },
            { id: '7', title: "Goals", content: "Find friends make enemies" },
            { id: '10', title: "Bio", content: "Drinking coffee since 2010" },
            { id: '11', title: "ProfilePic", content: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg" }
          ]
      ]))
    }
    saveBuddyList();
  }, [])


  const [studentNumber, setStudentNumber] = useState(0);
  const MAXSTUDENTS = sampleStudents.length;

  useEffect(() => {

  const getUserProfile = async () => {
    const storedLists = await AsyncStorage.getItem(PROFILE_KEY)
    if (storedLists != null) {
        console.log("STOREDLISTS FROM GETUSERPROFILE")
        console.log(storedLists);
    }
    }
    getUserProfile();
}, []);
  const sendRequest = (name: string) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Buddy request sent to " + name + "!",
    });
  };
//   isauthenticated to determine whether logged in or not
  if (isAuthenticated) {
    // colbys work
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <Heading style={{ color: "#007AFF" }} size="xl">
          Buddy Matcher
        </Heading>
        {studentNumber >= MAXSTUDENTS ? (
          <Text style={{ width: 300, textAlign: "center" }} size="md">
            Check back in 1 hour for more student recommendations
          </Text>
        ) : (
          <View>
            <View style={styles.personCard}>
              <Image
                style={styles.personImage}
                source={{ uri: sampleStudents[studentNumber].image }}
              />
              <View style={styles.personalInfo}>
                <View style={styles.peronHeading}>
                  <Text
                    style={styles.textColor}
                    size="2xl"
                  >
                    {sampleStudents[studentNumber].name}
                  </Text>
                  <Text
                    style={styles.textColor}
                    size="lg"
                  >
                    {sampleStudents[studentNumber].year}
                  </Text>
                </View>
                <Text style={styles.textColor} size="md">
                  {sampleStudents[studentNumber].degree}
                </Text>
              </View>
              <View style={styles.traitBadges}>
                {sampleStudents[studentNumber].badges.map((badge, index) => (
                  <Badge
                    action="info"
                    size="lg"
                    variant="solid"
                    style={styles.badge}
                    key={index}
                  >
                    <BadgeIcon color="#05405D" size="lg" as={badge.icon} />
                    <BadgeText style={styles.textColor}>{badge.name}</BadgeText>
                  </Badge>
                ))}
              </View>
            </View>
            <View style={styles.buttons}>
              <Button
                action="negative"
                variant="outline"
                size="xl"
                onPress={() => setStudentNumber((current) => current + 1)}
              >
                <ButtonIcon size="lg" as={X} />
                <ButtonText style={{ color: "#E63535" }}>Skip</ButtonText>
              </Button>
              <Button
                style={{ backgroundColor: "#007AFF" }}
                action="positive"
                variant="solid"
                size="xl"
                onPress={() => {
                  setStudentNumber((current) => current + 1);
                  sendRequest(sampleStudents[studentNumber].name);
                }}
              >
                <ButtonIcon size="lg" as={Plus} />
                <ButtonText>Add</ButtonText>
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }

  switch (currentScreen) {
    case "login":
      return <LoginPage />;
    case "signup":
      return <SignUpPage />;
    default:
      return <LandingPage onNavigate={setCurrentScreen} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  personCard: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
  },
  personImage: {
    borderRadius: 12,
    width: 370,
    height: 300,
  },
  personalInfo: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 2,
  },
  peronHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  traitBadges: {
    justifyContent: "flex-start",
    gap: 8,
    height: 140,
  },
  buttons: {
    flexDirection: "row",
    width: 370,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textColor: {
    color: "#05405D",
  },
  badge: {
    gap: 8,
    color: "#075A83",
    backgroundColor: "#EBF8FE",
    width: 250,
    paddingHorizontal: 8,
    paddingTop: 4,
  },
});
