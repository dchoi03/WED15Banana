import { Image, StyleSheet, View, ScrollView } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { ButtonIcon, ButtonText, Button } from "@/components/ui/button";
import { Badge, BadgeText, BadgeIcon } from "@/components/ui/badge";
import {
  Plus,
  X,
  GraduationCap,
  Clock,
  Check,
  Star,
} from "lucide-react-native";
import Toast from "react-native-toast-message";

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
  const [studentNumber, setStudentNumber] = useState(0);
  const MAXSTUDENTS = sampleStudents.length;

  const sendRequest = (name: string) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Buddy request sent to " + name + "!",
    });
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Heading style={{ color: "#007AFF" }} size={"xl"}>
        Buddy Matcher
      </Heading>
      {studentNumber >= MAXSTUDENTS ? (
        <Text style={{width: 300, textAlign: 'center'}}>Check back in 1 hour for more student recommendations</Text>
      ) : (
        <View>
          <View style={styles.personCard}>
            {/* Profile picture */}
            <Image
              style={styles.personImage}
              source={{ uri: sampleStudents[studentNumber].image }}
            />
            {/* Personal information */}
            <View style={styles.personalInfo}>
              <View style={styles.peronHeading}>
                <Text
                  style={[styles.textColor, { fontWeight: 500 }]}
                  size={"2xl"}
                >
                  {sampleStudents[studentNumber].name}
                </Text>
                <Text
                  style={[styles.textColor, { fontWeight: 300 }]}
                  size={"lg"}
                >
                  {sampleStudents[studentNumber].year}
                </Text>
              </View>
              <Text style={styles.textColor} size={"md"}>
                {sampleStudents[studentNumber].degree}
              </Text>
            </View>
            {/* Personal badges */}
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
          {/* Buttons */}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    gap: 48,
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
  personProfile: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
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
