import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
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
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
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

  const getUserProfile = async () => {
    const storedLists = await AsyncStorage.getItem(PROFILE_KEY)
    if (storedLists != null) {
      setProfile(JSON.parse(storedLists));
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getUserProfile();
    }, [])
  );

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
          <Avatar size="2xl">
          <AvatarFallbackText>No Image</AvatarFallbackText>
            <AvatarImage     
            source={{
               uri: profilePic,
            }}/>
          </Avatar>
        <ThemedText style={styles.nameText}>{name}</ThemedText>
        <View style={styles.scroller}>
          <ScrollView >
            <ThemedText style={styles.bioText}>{bio}</ThemedText>
          </ScrollView>
        </View>
        <ButtonGroup style={styles.buttonGroup} >
          <Button style={styles.button} size="lg" action="primary" onPress={() => navigation.navigate('buddyList' as never)}>
          <ButtonText>Buddies</ButtonText>
          </Button >
          <Button style={styles.button} size="lg" onPress={() => navigation.navigate('editProfile' as never)}>
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
    paddingTop: 20,
    width: 380,
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
    height: 30,
  }, 
  subContainer: {
    flex: 1,
    alignItems: "center",
  },
  yourProfile: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "bold",
    paddingBottom: 30,
  }, 
  nameText: {
    fontWeight: "bold", 
    paddingBottom: 20,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    color: "#007AFF",
  },
  buttonGroup: {
    marginTop: 20,
    marginBottom: 10,
    width: 220,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-evenly",
    alignSelf: "stretch",
    fontSize: 20,
    width: 300,
  },
  listTitle: {
    width: 120,
    fontWeight: "bold",
    paddingBottom: 10,
    fontSize: 15,
  },
  bioText: {
    width: 250,
    marginBottom: 20
  }, 
  scroller: {
    height: 120,
    width: 300,
  }
});
