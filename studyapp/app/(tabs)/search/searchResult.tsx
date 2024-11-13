import { Image, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import StudentResult from "./studentResult";

// Sorted list of students by distance
const sampleStudents = [
  {
    name: "Ava",
    year: "5th Year",
    degree: "Finance & Computer Science",
    numMutals: "10",
    image: Image.resolveAssetSource(
      require("../../../assets/images/people/ava.png")
    ).uri,
  },
  {
    name: "George",
    year: "2nd Year",
    degree: "Commerce",
    numMutals: "0",
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
        <Text numberOfLines={1} style={{ width: 300, textAlign: "center" }}>
          Nobody's name starts with "{searchText}"
        </Text>
      ) : (
        <View style={{gap: 10, paddingVertical: 12}}>
          {filteredStudents.map((student, index) => (
            <StudentResult key={index} student={student} />
          ))}
        </View>
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
