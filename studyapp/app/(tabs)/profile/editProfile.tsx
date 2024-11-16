import { Image, StyleSheet, Platform, Text, ScrollView } from 'react-native';
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
import { useNavigation, useLocalSearchParams,  } from 'expo-router';
import { Input, InputField  } from "@/components/ui/input"
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "@profile"
interface ProfileObject {
  id: string,
  title: string,
  content: string
}

export default function EditProfilePage() {
  const navigation = useNavigation();
  const[username, setUsername] = useState("default");
  const[name, setName] = useState("default");
  const[bio, setBio] = useState("default")
  const[profilePic, setProfilePic] = useState('');
  const[education, setEductaion] = useState("default")
  const[university, setUniversity] = useState("default")
  const[currentCourses, setCurrentCourses] = useState("default")
  const[grade, setGrade] = useState("default")
  const[goals, setGoals] = useState("default")
  const[email, setEmail] = useState("default")
  const[contact, setContact] = useState("default")
  const[profile, setProfile] = useState<ProfileObject[]>([])
  
useEffect(() => {
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
      if (item.title == "Username") {
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
  }, [profile]);

  const saveUpdates = async () => {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify([ 
        { id: '1', title: "Username", content: username},
        { id: '2', title: "name", content: name },
        { id: '3', title: "education", content: education },
        { id: '4', title: "University", content: university },
        { id: '5', title: "Grade", content: grade} ,
        { id: '6', title: "Current Courses", content: currentCourses },
        { id: '7', title: "Goals", content: goals },
        { id: '8', title: "Contact", content: contact },
        { id: '9', title: "Email", content: email},
        { id: '10', title: "Bio", content: bio },
        { id: '11', title: "ProfilePic", content: profilePic },
      ]))
    saveUpdates();
  }
return (

  <ThemedView style={styles.container}>
            <ScrollView
            style={styles.scrollView}
            >
          <ThemedView style={styles.padder}/>
            <ThemedView style={styles.subContainer}>
            
              <ThemedView style={styles.profileBox}>
                 <Avatar size="xl">
                  <AvatarFallbackText />
                  <AvatarImage />
                </Avatar>
                <ThemedText>Add/Edit your Profile</ThemedText>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Username</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder={username} />
              </Input>
              </ThemedView>

            <ThemedView style={styles.bioBox}>
              <ThemedText style={styles.detailsTitle}>Bio</ThemedText>
              <Textarea
                size="md"
              >
                <TextareaInput placeholder={bio} />
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
                <InputField placeholder={name} />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Education</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder={education} />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>University</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder={university} />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Grade</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder={grade}/>
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Current Courses</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder={currentCourses} />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Goals</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder={goals} />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Contact</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder={contact} />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Email</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder={email} />
              </Input>
              </ThemedView>

            </ThemedView>


            <ButtonGroup >
              <Button style={styles.button} onPress={() => {saveUpdates()}}>
              <ButtonText>Save Changes</ButtonText>
              </Button>
            </ButtonGroup>

            </ThemedView>
            
        </ScrollView>
        </ThemedView>

      );

}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    detailsContainer: {
      alignContent: "space-evenly"
    },
    detailsTitleContainer: {
      alignItems: 'center',
      height: 40,
      marginBottom: 10,
    },
    detailsTitle: {
      fontWeight: "bold",
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
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
      color: "#007AFF",
      fontWeight: "bold",
      marginBottom: 30,
    }, 
    nameText: {
      fontWeight: "bold", 
      width: 80,
      marginRight: 10
    },
    button: {
      backgroundColor: "#007AFF",
      color: "#007AFF",
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
    }, 
    bioBox: {
      flexDirection: "column",
      alignItems: "center",
      width: 250,
      marginTop:20,
      marginBottom:20,
    },
    scrollView: {
      flexGrow: 1,
      backgroundColor: "white",
    },
  });