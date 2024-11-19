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
import { useNavigation, Link, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_KEY = "@profile"

interface ProfileObject {
  id: string,
  title: string,
  content: string
}

export default function SearchProfile() {
  const[name, setName] = useState("default");
  const[bio, setBio] = useState("default")
  const[profilePic, setProfilePic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s');
  const[detailsList, setDetailsList] = useState<ProfileObject[]>([])
  const { profile } = useLocalSearchParams()

  useEffect(() => {
    let profileString: string;
    if (Array.isArray(profile)) {
      profileString = profile[0];
    } else {
      profileString = profile;
    }

    const ProfileList = JSON.parse(profileString) as ProfileObject[];
    const updDetailslist = []
    for (const item of ProfileList) {
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


 
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.padder}/>
        <ThemedView style={styles.subContainer}>
          <Avatar size="2xl">
            <AvatarFallbackText />
            <AvatarImage     
            source={{
               uri: profilePic,
            }}/>
          </Avatar>
        <ThemedText style={styles.nameText}>{name}</ThemedText>
        <ThemedText style={styles.bioText}>{bio}</ThemedText>
        <ThemedView style={styles.detailsContainer}>
          <ThemedText style={styles.nameText}>Details</ThemedText>
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
    paddingBottom: 20,
    color: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    color: "#007AFF",
  },
  listItem: {
    flex: 1,
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