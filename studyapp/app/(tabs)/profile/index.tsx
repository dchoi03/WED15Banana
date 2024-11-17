import { StyleSheet, Text, View, FlatList } from 'react-native';
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
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Box } from "@/components/ui/box";

const PROFILE_KEY = "@profile"

interface ProfileObject {
  id: string,
  title: string,
  content: string
}

export default function ProfilePage() {
  const[name, setName] = useState("default");
  const[bio, setBio] = useState("default")
  const[profilePic, setProfilePic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s');
  const[detailsList, setDetailsList] = useState<ProfileObject[]>([])
  const[profile, setProfile] = useState<ProfileObject[]>([])
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  useEffect(() => {

    const saveDetails = async () => {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify([ 
        { id: '1', title: "Username", content: "George" },
        { id: '2', title: "name", content: "Gerorge pollix" },
        { id: '3', title: "education", content: "sadf" },
        { id: '4', title: "University", content: "UNSW" },
        { id: '5', title: "Grade", content: "3rd Year"} ,
        { id: '6', title: "Current Courses", content: "Comp 4511" },
        { id: '7', title: "Goals", content: "Find friends make enemies" },
        { id: '8', title: "Contact", content: "000 0000 0000" },
        { id: '9', title: "Email", content: "Fiaoesfe@gasem.com" },
        { id: '10', title: "Bio", content: "Im so cool. This is a fire app. lorem ipsum dipsum deloreajfnf afaidshfa fasdnfkadbsf adbfadbfasldfbjadbsl" },
        { id: '11', title: "ProfilePic", content: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" },
      ]))
    }
    saveDetails();

    const getUserProfile = async () => {
      const storedLists = await AsyncStorage.getItem(PROFILE_KEY)
      if (storedLists != null) {
        setProfile(JSON.parse(storedLists));
      }
    }
    getUserProfile();
  }, []);

  useEffect(() => {
    const updDetailslist = []
    for (const item of profile) {
      if (item.title == "Username") {
        setName(item.content);
      } else if (item.title == "Bio") {
        setBio(item.content) 
      } else if (item.title == "ProfilePic") {
        setProfilePic(item.content) 
      } else {
        updDetailslist.push(item)
      }
    }
    setDetailsList(updDetailslist);
  }, [profile]);

  const navigation = useNavigation();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.padder}/>
        <ThemedView style={styles.subContainer}>
        <ThemedText style={styles.yourProfile}>Your Profile</ThemedText>
          <Avatar size="2xl">
            <AvatarFallbackText />
            <AvatarImage     
            source={{
               uri: profilePic,
            }}/>
          </Avatar>
        <ThemedText style={styles.nameText}>{name}</ThemedText>
        <ThemedText style={styles.bioText}>{bio}</ThemedText>
        <ButtonGroup >
          <Button style={styles.button} action="primary" onPress={() => navigation.navigate('buddyList' as never)}>
          <ButtonText>Buddies</ButtonText>
          </Button >
          <Button style={styles.button} onPress={() => navigation.navigate('editProfile' as never)}>
          <ButtonText>Edit Profile</ButtonText>
          </Button>
        </ButtonGroup>
        <ThemedView style={styles.detailsContainer}>
          <ThemedText style={styles.nameText}>Your Details</ThemedText>
          <FlatList
            data={detailsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
              <Text style={styles.listTitle}>{item.title}</Text>
              <Text>{item.content}</Text>
              </View>
            )}
          />
        </ThemedView>
        </ThemedView>
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
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    width: 350,
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
    height: 40,
    backgroundColor: "light-blue"
  }, 
  subContainer: {
    flex: 1,
    alignItems: "center",
  },
  yourProfile: {
    fontFamily: "roboto",
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "bold",
    paddingBottom: 30,
  }, 
  nameText: {
    fontWeight: "bold", 
    paddingBottom: 20
  },
  button: {
    backgroundColor: "#007AFF",
    color: "#007AFF",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-evenly",
    alignSelf: "stretch"
  },
  listTitle: {
    width: 100,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  bioText: {
    width: 250,
    marginBottom: 20
  }
});
