import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
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
import { SunIcon, EditIcon, FavouriteIcon } from "@/components/ui/icon"

const PROFILE_KEY = "@profile"
const COLOUR_MODE = "@colorMode";

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

  const getColourMode = async () => {
    const storedColorMode = await AsyncStorage.getItem(COLOUR_MODE);
    if (storedColorMode) {
      setColorMode(storedColorMode as "light" | "dark");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserProfile();
      getColourMode();
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

  const setPageColours = async () => {
    const newColor = colorMode === "light" ? "dark" : "light"
    setColorMode(newColor)
    await AsyncStorage.setItem(COLOUR_MODE, newColor);
  }

  const navigation = useNavigation();
  const isDarkMode = colorMode === "dark";

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          style={{ backgroundColor: '#007AFF' }}
          onPress={() => {
            setPageColours();
          }}
        >
          <ButtonIcon as={SunIcon}></ButtonIcon>
        </Button>
      ),
    });
  }, [navigation, isDarkMode]);  

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
<GluestackUIProvider mode={colorMode} >
    <ThemedView  style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ThemedView style={[styles.padder, isDarkMode && styles.darkContainer ]}/>
        <ThemedView style={[styles.subContainer, isDarkMode && styles.darkContainer]}>
          <Avatar size="2xl">
          <AvatarFallbackText>No Image</AvatarFallbackText>
            <AvatarImage     
            source={{
               uri: profilePic,
            }}/>
          </Avatar>
        <ThemedText style={[styles.nameText, isDarkMode && styles.darkText]}>{name}</ThemedText>
        <View>
            <ThemedText style={[styles.bioText, isDarkMode && styles.darkText]}>{bio}</ThemedText>
        </View>
        <ButtonGroup style={styles.buttonGroup} >
          <Button style={styles.button} size="lg" action="primary" onPress={() => navigation.navigate('buddyList' as never)}>
          <ButtonText>Buddies</ButtonText>
          <ButtonIcon as={FavouriteIcon}></ButtonIcon>
          </Button >
          <Button style={styles.button} size="lg" onPress={() => navigation.navigate('editProfile' as never)}>
          <ButtonText>Edit Profile</ButtonText>
          <ButtonIcon as={EditIcon}></ButtonIcon>
          </Button>
        </ButtonGroup>
        <ThemedView style={[styles.detailsContainer,  isDarkMode && styles.darkContainer]}>
          <ThemedText style={[styles.nameText, isDarkMode && styles.darkText]}>Your Details</ThemedText>
          <FlatList
            data={detailsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={[styles.listTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
                <Text style={isDarkMode ? styles.darkText : undefined}>{item.content}</Text>
              </View>
            )}
            scrollEnabled={false} // Prevent FlatList from scrolling
            ListFooterComponent={<View style={{ height: 20 }} />} // Optional: Add spacing at the bottom
          />
        </ThemedView>
        </ThemedView>
    </ThemedView>
    </GluestackUIProvider>
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
    backgroundColor: '#ffffff',
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
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000000',
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
    marginBottom: 10,
    alignSelf: "center"
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
    width: 100,
    fontWeight: "bold",
    paddingBottom: 10,
    fontSize: 15,
  },
  bioText: {
    alignSelf: "center",
    width: 250,
    marginBottom: 20,
  }, 

  toggleBox: {
    width: 20,
    height: 20,
    margin: 0,
    padding: 0,
  }, 
  relativeButton: {
      position: "absolute",
      width: 30,
      height: 30,
      marginLeft: 350,
  } 
});
