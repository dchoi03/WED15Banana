import { Heading } from "@/components/ui/heading";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";

// Sorted list of students by distance
const sampleStudents = [
  {
    name: "Ava",
    year: "5th Year",
    degree: "Finance & Computer Science",
    distance: "50 m",
    message: "Finding study partner",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/ava.png")
    ).uri,
  },
  {
    name: "George",
    year: "1st Year",
    degree: "Commerce",
    distance: "100 m",
    message: "Happy to help",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/george.png")
    ).uri,
  },
  {
    name: "James",
    year: "2nd Year",
    degree: "Computer Science",
    distance: "150 m",
    message: "Need help with COMP4511 React Native assignment",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "James",
    year: "2nd Year",
    degree: "Computer Science",
    distance: "150 m",
    message: "Need help with COMP4511 React Native assignment",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "James",
    year: "2nd Year",
    degree: "Computer Science",
    distance: "150 m",
    message: "Need help with COMP4511 React Native assignment",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "James",
    year: "2nd Year",
    degree: "Computer Science",
    distance: "150 m",
    message: "Need help with COMP4511 React Native assignment",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
];

export default function Map() {
  return (
    <View style={{ gap: 24, alignItems: "center", paddingBottom: 24 }}>
      {/* Map image */}
      <Image
        style={styles.mapImage}
        source={require("../../../assets/images/map.png")}
      />
      {/* Nearby students */}
      <View style={{ gap: 8, alignItems: "center" }}>
        <Heading style={{ color: "#05405D" }} size={"lg"}>
          Nearby study buddies
        </Heading>
        {/* Student data */}
        {sampleStudents.map((student, index) => (
          <View key={index} style={styles.studentContainer}>
            <View style={styles.studentInfo}>
              <Image
                source={{ uri: student.image }}
                style={styles.studentImage}
              />
              <View style={styles.studentText} >
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                        <Text numberOfLines={1} size={'xl'} style={{fontWeight: 600, color: "#05405D" }}>{student.name}</Text>
                        <Text numberOfLines={1} size={'md'} style={{fontWeight: 300, color: "#05405D" }}>{student.year}</Text>
                    </View>
                    <Text size={'md'} style={{color: "#05405D", width: 180}}>{student.degree}</Text>
                </View>
                <Text numberOfLines={1} size={'md'} style={{color: "#05405D", width: 200 }}>{student.message}</Text>
              </View>
            </View>
            <Text  size={'md'} style={{color: "#05405D", alignSelf: 'center' }}>{student.distance} away</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapImage: {
    borderRadius: 12,
    width: 370,
    height: 300,
  },
  studentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 85,
    width: 370,
    backgroundColor: '#ECF8FE',
    borderRadius: 12
  },
  studentImage: {
    height: 64,
    width: 64,
    borderRadius: 9999,
  },
  studentInfo: { flexDirection: "row", gap: 8, alignItems: "center" },
  studentText: {
    gap: 4
  }
});
