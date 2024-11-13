import { Heading } from "@/components/ui/heading";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";

// Sorted list of students by distance
const sampleStudents = [
  {
    name: "George",
    year: "1st Year",
    degree: "Commerce",
    numMutals: "5",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/george.png")
    ).uri,
  },
  {
    name: "George",
    year: "2nd Year",
    degree: "Commerce",
    numMutals: "0",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "George",
    year: "2nd Year",
    degree: "Commerce",
    numMutals: "0",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "Geth",
    year: "3rd Year",
    degree: "Commerce",
    numMutals: "0",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "Bob",
    year: "4th Year",
    degree: "Commerce",
    numMutals: "3",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "Tom",
    year: "5th Year",
    degree: "Commerce",
    numMutals: "0",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "Jessica",
    year: "10th Year",
    degree: "Commerce",
    numMutals: "0",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
  {
    name: "James",
    year: "20th Year",
    degree: "Commerce",
    numMutals: "0",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/james.png")
    ).uri,
  },
];

type props = {
  searchText: string;
};

export default function SearchResults(prop: props) {
  const { searchText } = prop;

  const filteredStudents = sampleStudents.filter((student) =>
    student.name.toLowerCase().startsWith(searchText.toLowerCase())
  );

  return (
    <View style={{ gap: 24, alignItems: "center", paddingBottom: 24 }}>
      {/* Filter by student name */}
      {filteredStudents.length == 0 ? (
        <Text>Nobody's name stars with "{searchText}"</Text>
      ) : (
        <>
          {filteredStudents.map((student, index) => (
            <View key={index} style={styles.studentContainer}>
              <View style={styles.studentInfo}>
                <Image
                  source={{ uri: student.image }}
                  style={styles.studentImage}
                />
                <View style={styles.studentText}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        size={"xl"}
                        style={{ fontWeight: 600, color: "#05405D" }}
                      >
                        {student.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        size={"md"}
                        style={{ fontWeight: 300, color: "#05405D" }}
                      >
                        {student.year}
                      </Text>
                    </View>
                    <Text size={"md"} style={{ color: "#05405D", width: 180 }}>
                      {student.degree}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    size={"md"}
                    style={{ color: "#05405D", width: 200 }}
                  >
                    {student.numMutals} mutal connections
                  </Text>
                </View>
              </View>
              <Text
                size={"md"}
                style={{ color: "#05405D", alignSelf: "center" }}
              >
                add
              </Text>
            </View>
          ))}
        </>
      )}
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
    backgroundColor: "#ECF8FE",
    borderRadius: 12,
  },
  studentImage: {
    height: 64,
    width: 64,
    borderRadius: 9999,
  },
  studentInfo: { flexDirection: "row", gap: 8, alignItems: "center" },
  studentText: {
    gap: 4,
  },
});
