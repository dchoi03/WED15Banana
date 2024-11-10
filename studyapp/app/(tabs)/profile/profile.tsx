import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
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


export default function ProfilePage() {
  const[details, setDetails] = useState([ { id: '1', title: "name: ", content: "daf" },
    { id: '2', title: "education: ", content: "sadf" },])

  const navigation = useNavigation();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.padder}/>
        <ThemedView style={styles.subContainer}>
        <ThemedText style={styles.yourProfile}>Your Profile</ThemedText>
          <Avatar size="2xl">
            <AvatarFallbackText />
            <AvatarImage />
          </Avatar>
        <ThemedText style={styles.nameText}>JohnSmilth</ThemedText>
        <ThemedText>bio</ThemedText>
        <ThemedView>
        <ButtonGroup >
          <Button style={styles.button} action="primary" onPress={() => {navigation.navigate('editProfile')}}>
          <ButtonText>Buddies</ButtonText>
          </Button >
          <Button style={styles.button}>
          <ButtonText>Edit Profile</ButtonText>
          </Button>
        </ButtonGroup>
        <ThemedView style={styles.detailsContainer}>
          <ThemedText style={styles.nameText}>Your Details</ThemedText>
          <FlatList
            data={details}
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
    paddingTop: 30
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
    height: 80,
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
    fontWeight: "bold" 
  },
  button: {
    backgroundColor: "#007AFF",
    color: "#007AFF",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  listTitle: {
    fontWeight: "bold",
  }
});
