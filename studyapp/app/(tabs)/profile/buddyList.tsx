import { Image, StyleSheet, Platform, Text, FlatList, View, Pressable } from 'react-native';
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
import { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { Input, InputField  } from "@/components/ui/input"
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BUDDY_LIST = "@Buddy"

export type RootStackParamList = {
  userProfile: { profile: string } | undefined;
};

interface ProfileObject {
  id: string,
  title: string,
  content: string
}

export default function BuddyList() {
    const[details, setDetails] = useState([
      [ 
        { id: '1', title: "Username", content: "George" },
        { id: '2', title: "name", content: "Gerorge pollix" },
        { id: '3', title: "education", content: "sadf" },
        { id: '4', title: "University", content: "UNSW" },
        { id: '5', title: "Grade", content: "3rd Year"} ,
        { id: '6', title: "Current Courses", content: "default" },
        { id: '7', title: "Goals", content: "Find friends make enemies" },
        { id: '8', title: "Contact", content: "000 0000 0000" },
        { id: '9', title: "Email", content: "Fiaoesfe@gasem.com" },
        { id: '10', title: "Bio", content: "Im so cool" },
        { id: '11', title: "ProfilePic", content: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" }
      ],
      [ 
        { id: '1', title: "Username", content: "ahdsed" },
        { id: '2', title: "name", content: "brsf fsaf pollix" },
        { id: '3', title: "education", content: "sadf" },
        { id: '4', title: "University", content: "UNSW" },
        { id: '5', title: "Grade", content: "3rd Year"} ,
        { id: '6', title: "Current Courses", content: "default" },
        { id: '7', title: "Goals", content: "Find friends make enemies" },
        { id: '8', title: "Contact", content: "000 0000 0000" },
        { id: '9', title: "Email", content: "Fiaoesfe@gasem.com" },
        { id: '10', title: "Bio", content: "Im so cool" },
        { id: '11', title: "ProfilePic", content: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" }
      ],
      [ 
        { id: '1', title: "Username", content: "beftsa" },
        { id: '2', title: "name", content: "gerefe pollix" },
        { id: '3', title: "education", content: "sadf" },
        { id: '4', title: "University", content: "UNSW" },
        { id: '5', title: "Grade", content: "3rd Year"} ,
        { id: '6', title: "Current Courses", content: "default" },
        { id: '7', title: "Goals", content: "Find friends make enemies" },
        { id: '8', title: "Contact", content: "000 0000 0000" },
        { id: '9', title: "Email", content: "Fiaoesfe@gasem.com" },
        { id: '10', title: "Bio", content: "Im so cool" },
        { id: '11', title: "ProfilePic", content: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" }
      ]
      ])
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
  const getUserProfile = async () => {
    const storedLists = await AsyncStorage.getItem(BUDDY_LIST)
    if (storedLists != null) {
      setDetails(JSON.parse(storedLists));
    }
  }
  getUserProfile();
}, []);

  const unBuddy = (index: string) => {
    setDetails(details.filter((curEn) => {
      return curEn.find((obj) => obj.title === 'Username')?.content !== index} ))
  }


  const renderItem = ({ item }: { item: ProfileObject[] }) => {
    const username = item.find((obj) => obj.title === 'Username')?.content || '';
    const avatar = item.find((obj) => obj.title === 'ProfilePic')?.content || '';

    return (
      <View style={styles.itemBox}>
      <Pressable onPress={() => {
          const profile = JSON.stringify(item);
          navigation.navigate("userProfile", { profile })
        }
      }>
        <View style={styles.listItem}>
        <Avatar size="lg">
          <AvatarFallbackText />
          <AvatarImage     
          source={{
            uri: avatar
          }}/>
      </Avatar>
      <Text style={styles.listTitle}>{username}</Text>
      <Button style={styles.button} action="negative" onPress={() => {unBuddy(username)}}>
          <ButtonText>UnBuddy</ButtonText>
      </Button >
      </View>
    </Pressable>
    </View>
    )
  }

  return (
    <ThemedView style={styles.container}>
        <ThemedView style={styles.subContainer}>
          <FlatList
            data={details}
            keyExtractor={(item, index) => `${index}-${item[0].content}`}
            renderItem={renderItem}
          />
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  subContainer: {
    flex: 1,
    marginLeft: 40,

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
    justifyContent: "space-between",
    marginVertical: 20,
    alignItems: "center",
  },
  listTitle: {
    width: 100,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  bioText: {
    width: 250,
    marginBottom: 20
  },
  itemBox: {
    width: 350
  }
});

