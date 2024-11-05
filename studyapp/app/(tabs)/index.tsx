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
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";

export default function HomeScreen() {
  const [isGeorge, setIsGeorge] = useState(false);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Heading style={{ color: "#007AFF" }} size={"xl"}>
        Buddy Finder
      </Heading>
      <View style={styles.personCard}>
        {/* Profile picture */}
        {isGeorge ? (
          <Image
            style={styles.personImage}
            source={require("../../assets/images/people/george.png")}
          />
        ) : (
          <Image
            style={styles.personImage}
            source={require("../../assets/images/people/ava.png")}
          />
        )}
        {/* Personal information */}
        {isGeorge ? (
          <View style={styles.personalInfo}>
            <View style={styles.peronHeading}>
              <Text
                style={[styles.textColor, { fontWeight: 500 }]}
                size={"2xl"}
              >
                George
              </Text>
              <Text style={[styles.textColor, { fontWeight: 300 }]} size={"lg"}>
                1st Year
              </Text>
            </View>
            <Text style={styles.textColor} size={"md"}>
              Commerce
            </Text>
          </View>
        ) : (
          <View style={styles.personalInfo}>
            <View style={styles.peronHeading}>
              <Text
                style={[styles.textColor, { fontWeight: 500 }]}
                size={"2xl"}
              >
                Ava
              </Text>
              <Text style={[styles.textColor, { fontWeight: 300 }]} size={"lg"}>
                5th Year
              </Text>
            </View>
            <Text style={styles.textColor} size={"md"}>
              Finance & Computer Science
            </Text>
          </View>
        )}
        {/* Personal badges */}
        {isGeorge ? (
          <View style={styles.traitBadges}>
            <Badge action="info" size="lg" variant="solid" style={styles.badge}>
              <BadgeIcon color="#05405D" size="lg" as={GraduationCap} />
              <BadgeText style={styles.textColor}>Same university</BadgeText>
            </Badge>
            <Badge action="info" size="lg" variant="solid" style={styles.badge}>
              <BadgeIcon color="#05405D" size="lg" as={Check} />
              <BadgeText style={styles.textColor}>Took COMM099</BadgeText>
            </Badge>
          </View>
        ) : (
          <View style={styles.traitBadges}>
            <Badge action="info" size="lg" variant="solid" style={styles.badge}>
              <BadgeIcon color="#05405D" size="lg" as={GraduationCap} />
              <BadgeText style={styles.textColor}>Same university</BadgeText>
            </Badge>
            <Badge action="info" size="lg" variant="solid" style={styles.badge}>
              <BadgeIcon color="#05405D" size="lg" as={Clock} />
              <BadgeText style={styles.textColor}>Matching timetables</BadgeText>
            </Badge>
            <Badge action="info" size="lg" variant="solid" style={styles.badge}>
              <BadgeIcon color="#05405D" size="lg" as={Check} />
              <BadgeText style={styles.textColor}>Taking COMP4511</BadgeText>
            </Badge>
            <Badge action="info" size="lg" variant="solid" style={styles.badge}>
              <BadgeIcon color="#05405D" size="lg" as={Star} />
              <BadgeText style={styles.textColor}>Similar study goals</BadgeText>
            </Badge>
          </View>
        )}
      </View>
      {/* Buttons */}
      <View style={styles.buttons}>
        <Button action="negative" variant="outline" size="xl" onPress={() => setIsGeorge(true)}>
          <ButtonIcon size="lg" as={X} />
          <ButtonText style={{ color: "#E63535" }}>Skip</ButtonText>
        </Button>
        <Button
          style={{ backgroundColor: "#007AFF" }}
          action="positive"
          variant="solid"
          size="xl"
          onPress={() => setIsGeorge(true)}
        >
          <ButtonIcon size="lg" as={Plus} />
          <ButtonText>Add</ButtonText>
        </Button>
      </View>
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
