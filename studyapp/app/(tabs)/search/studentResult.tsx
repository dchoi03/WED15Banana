import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Plus, Check } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { addBuddy, isBuddy } from "@/scripts";

type Student = {
  name: string;
  year: string;
  degree: string;
  numMutals: string;
  image: string;
};

type props = {
  student: Student;
};

const StudentResult = (prop: props) => {
  const { student } = prop;
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    const checkBuddy = async () => {
      const result = await isBuddy(student.name);
      setIsRequestSent(result);
    }
    checkBuddy()
  }, [])

  const sendRequest = async (name: string) => {
    await addBuddy(name);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Buddy request sent to " + name + "!",
    });
  };

  return (
    <View style={styles.studentContainer}>
      <View style={styles.studentInfo}>
        <Image source={{ uri: student.image }} style={styles.studentImage} />
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
      {isRequestSent ? (
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Check size={24} color={"#05405D"} />
          <Text numberOfLines={2} size={"sm"} style={{ color: "#05405D", width: 50, textAlign: 'center' }}>
            Request sent
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            sendRequest(student.name);
            setIsRequestSent(true);
          }}
          style={{ alignSelf: "center", alignItems: "center" }}
        >
            <Plus size={24} color={"#05405D"} />
            <Text size={"sm"} style={{ color: "#05405D", width: 50, textAlign: 'center' }}>
              Add
            </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default StudentResult;
