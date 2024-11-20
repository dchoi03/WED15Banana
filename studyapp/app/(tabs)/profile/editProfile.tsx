import { Image, StyleSheet, Platform, Text, ScrollView, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@/components/ui/button"
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar"
import { useNavigation } from 'expo-router';
import { Input, InputField  } from "@/components/ui/input"
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";


const PROFILE_KEY = "@profile"

export type RootStackParamList = {
  userProfile: { profile: string } | undefined;
};

interface ProfileObject {
  id: string,
  title: string,
  content: string
}

export default function EditProfilePage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const[username, setUsername] = useState("default");
  const[name, setName] = useState("default");
  const[bio, setBio] = useState("default")
  const[profilePic, setProfilePic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s');
  const[education, setEductaion] = useState("default")
  const[university, setUniversity] = useState("default")
  const[currentCourses, setCurrentCourses] = useState("default")
  const[grade, setGrade] = useState("default")
  const[goals, setGoals] = useState("default")
  const[email, setEmail] = useState("default")
  const[contact, setContact] = useState("default")
  const[profile, setProfile] = useState<ProfileObject[]>([])
  const [mediaLibraryPermissions] = ImagePicker.useMediaLibraryPermissions();

  const checkPermissions = async () => {
    const cameraPermissions = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermissions =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!cameraPermissions.granted && !mediaLibraryPermissions.granted) {
      alert(
        "Please grant media library permissions in settings."
      );
    }
  };

useEffect(() => {
  checkPermissions();
  const getLists = async () => {
    const storedLists = await AsyncStorage.getItem("@profile")
    if (storedLists != null) {
      setProfile(JSON.parse(storedLists));
    }
  }
  getLists();
}, []);


useEffect(() => {
    for (const item of profile) {
      if (item.title == "name") {
        setName(item.content);
      } else if (item.title == "Bio") {
        setBio(item.content) 
      } else if (item.title == "ProfilePic") {
        setProfilePic(item.content) 
      } else if (item.title == "Education") {
        setEductaion(item.content) 
      } else if (item.title == "University") {
        setUniversity(item.content) 
      } else if (item.title == "Grade") {
        setGrade(item.content) 
      } else if (item.title == "Goals") {
        setGoals(item.content) 
      } else if (item.title == "Current Courses") {
        setCurrentCourses(item.content) 
      } else if (item.title == "Email") {
        setEmail(item.content) 
      } else if (item.title == "Contact") {
        setContact(item.content) 
      } else if (item.title == "Username") {
        setUsername(item.content) 
      } 
    }
  }, [profile, profilePic]);

  const saveUpdates = async () => {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify([
        { id: '1', title: "Username", content: username },
        { id: '2', title: "name", content: name },
        { id: '3', title: "education", content: education },
        { id: '4', title: "University", content: university },
        { id: '5', title: "Grade", content: grade },
        { id: '6', title: "Current Courses", content: currentCourses },
        { id: '7', title: "Goals", content: goals },
        { id: '8', title: "Contact", content: contact },
        { id: '9', title: "Email", content: email },
        { id: '10', title: "Bio", content: bio },
        { id: '11', title: "ProfilePic", content: profilePic },
      ]));

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your changes have been saved successfully!',
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };
return (
  <ScrollView
  style={styles.scrollView}
  >
  <ThemedView style={styles.container}>
          <ThemedView style={styles.padder}/>
            <ThemedView style={styles.subContainer}>
              
              <ThemedView style={styles.profileBox}>
                 <Avatar size="xl">
                 <AvatarFallbackText>No Image</AvatarFallbackText>
                  <AvatarImage source={{ uri: profilePic }} />
                </Avatar>
                  <Pressable onPress={() => pickImage()}>
                  <ThemedText
                  style={{ color: '#007AFF' }}>Add/Edit your Profile Pic</ThemedText>
                </Pressable>
              </ThemedView>

              <ThemedView style={styles.userNameBox}>
              <ThemedText style={styles.nameText}>Username</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={username} onChangeText={setUsername} />
              </Input>
              </ThemedView>

            <ThemedView style={styles.bioBox}>
              <ThemedText style={styles.detailsTitle}>Bio</ThemedText>
              <Textarea
                size="md"
              >
                <TextareaInput value={bio} onChangeText={setBio} />
              </Textarea>
            </ThemedView>   

            <ThemedView style={styles.detailsContainer}>
            <ThemedView style={styles.detailsTitleContainer}>
              <ThemedText style={styles.detailsTitle}>Your Details</ThemedText>
            </ThemedView>


              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Name</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={name} onChangeText={setName}/>
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Education</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={education}  onChangeText={setEductaion}/>
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>University</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={university} onChangeText={setUniversity}/>
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Grade</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={grade} onChangeText={setGrade}/>
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Current Courses</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={currentCourses} onChangeText={setCurrentCourses} />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Goals</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={goals} onChangeText={setGoals} />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Contact</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={contact} onChangeText={setContact}/>
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Email</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField value={email} onChangeText={setEmail}/>
              </Input>
              </ThemedView>

            </ThemedView>


            <ButtonGroup >
              <Button style={styles.button} onPress={() => {
                saveUpdates()
                navigation.navigate("index" as never);
                }}>
              <ButtonText>Save Changes</ButtonText>
              </Button>
            </ButtonGroup>
            <Toast/>
            </ThemedView>
        </ThemedView>
        </ScrollView>
      );

}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    detailsContainer: {
      alignContent: "space-evenly"
    },
    detailsTitleContainer: {
      alignItems: 'center',
      height: 30,
      marginBottom: 10,
    },
    detailsTitle: {
      fontWeight: "bold",
    },

    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      margin: 15
    },
    padder: {
      height: 20,
      backgroundColor: "light-blue"
    }, 
    subContainer: {
  
      alignItems: "center",
    },
    yourProfile: {
      fontSize: 20,
      color: "#1F1F1F",
      fontWeight: "bold",
      marginBottom: 30,
    }, 
    nameText: {
      fontWeight: "bold", 
      width: 80,
      marginRight: 10,
      color:'#1F1F1F'
    },
    button: {
      backgroundColor: "#007AFF",
      color: "#007AFF",
      marginBottom: 20,
      marginTop: 20,
    },
    listItem: {
      flexDirection: "row",
      width: 300,
      marginBottom: 10,
    },
    listInput: {
      width: 210
    }, 
    profileBox: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      gap: 10
    }, 
    bioBox: {
      flexDirection: "column",
      alignItems: "center",
      width: 300,
      marginTop:20,
      marginBottom:10,
    },
    userNameBox: {
      flexDirection: "row",
      alignItems: "center",
    },

    scrollView: {
      flexGrow: 1,
      backgroundColor: "white",
    },
  });