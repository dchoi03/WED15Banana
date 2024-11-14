import { Image, StyleSheet, Platform, Text, FlatList, View } from 'react-native';
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
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import { Input, InputField  } from "@/components/ui/input"
import { Textarea, TextareaInput } from "@/components/ui/textarea"

export default function BuddyList() {
    const[details, setDetails] = useState([ { id: '1', Avatar: "name: ", Name: "daf" },
      { id: '2', Avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg: ", Name: "sadf" },
      { id: '3', Avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg: ", Name: "UNSW" },
      { id: '4', Avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg: ", Name: "3rd Year"} ,
      { id: '5', Avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg Courses: ", Name: "default" },
      { id: '6', Avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg: ", Name: "Find friends make enemies" },
      { id: '7', Avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg: ", Name: "000 0000 0000" },
      { id: '8', Avatar: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg: ", Name: "Fiaoesfe@gasem.com" }
      ])
  const navigation = useNavigation();
  return (
    <ThemedView style={styles.container}>
        <ThemedView style={styles.subContainer}>
          <FlatList
            data={details}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Avatar size="xl">
                  <AvatarFallbackText />
                  <AvatarImage     
                  source={{
                    uri: item.Avatar,
                  }}/>
              </Avatar>
              <Text style={styles.listTitle}>{item.Name}</Text>
              </View>
            )}
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-evenly",
    alignSelf: "stretch",
    marginVertical: 20  },
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

