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
  const[name, setName] = useState("default");
  const[bio, setBio] = useState("default")
  const[profilePic, setProfilePic] = useState('');
  const[detailsList, setDetailsList] = useState<ProfileObject[]>([])
  const[profile, setProfile] = useState<ProfileObject[]>([])
  
useEffect(() => {
  const getLists = async () => {
    const storedLists = await AsyncStorage.getItem(PROFILE_KEY)
    if (storedLists != null) {
      setProfile(JSON.parse(storedLists));
    }
  }
  getLists();
  console.log(profile)
}, []);

return (
  <ScrollView
  style={styles.scrollView}
  contentContainerStyle={styles.container}
  >
        <ThemedView style={styles.container}>
          <ThemedView style={styles.padder}/>
            <ThemedView style={styles.subContainer}>
            
              <ThemedView style={styles.profileBox}>
                 <Avatar size="xl">
                  <AvatarFallbackText />
                  <AvatarImage />
                </Avatar>
                <ThemedText>Add/Edit your Profile</ThemedText>
              </ThemedView>

            <ThemedView style={styles.bioBox}>
              <ThemedText style={styles.detailsTitle}>Bio</ThemedText>
              <Textarea
                size="md"
              >
                <TextareaInput placeholder="Your text goes here..." />
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
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Education</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>University</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Grade</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Current Courses</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Goals</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Contact</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Email</ThemedText>
              <Input
                style={styles.listInput}
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

            </ThemedView>


            <ButtonGroup >
              <Button style={styles.button}>
              <ButtonText>Save Changes</ButtonText>
              </Button>
            </ButtonGroup>

            </ThemedView>
        </ThemedView>

        </ScrollView>
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
      flex: 1,
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