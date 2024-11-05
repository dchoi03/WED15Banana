import { Image, StyleSheet, View, ScrollView } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { ButtonIcon, ButtonText, Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from 'lucide-react-native';


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
      </View>
      <View style={styles.buttons}>
        <Button action="negative" variant="outline" size="xl">
          <ButtonIcon />
          <ButtonText>Skip</ButtonText>
        </Button>
        <Button action="positive" variant="solid" size="xl">
          <ButtonIcon />
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
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 2,
  },
  peronHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  traitBadges: {},
  buttons: {},
  textColor: {
    color: "#05405D",
  },
});
