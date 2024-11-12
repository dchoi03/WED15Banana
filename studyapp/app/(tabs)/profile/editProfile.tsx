import { Image, StyleSheet, Platform, Text, View } from 'react-native';
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

export default function EditProfilePage() {
  const navigation = useNavigation();
return (
        <ThemedView style={styles.container}>
          <ThemedView style={styles.padder}/>
            <ThemedView style={styles.subContainer}>
              <ThemedText style={styles.yourProfile}>Edit Your Profile</ThemedText>
            
              <ThemedView style={styles.profileBox}>
                 <Avatar size="xl">
                  <AvatarFallbackText />
                  <AvatarImage />
                </Avatar>
                <ThemedText>Add/Edit your Profile</ThemedText>
                </ThemedView>
            


            <ThemedView>
              <ThemedText>bio</ThemedText>
              <Textarea
                size="md"
              >
                <TextareaInput placeholder="Your text goes here..." />
              </Textarea>
            </ThemedView>   

            <ThemedView>
            <ThemedView style={styles.detailsContainer}>
              <ThemedText style={styles.nameText}>Your Details</ThemedText>
            </ThemedView>


              <ThemedView style={styles.listItem}>
              <ThemedText style={styles.nameText}>Name</ThemedText>
              <Input
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView>
              <ThemedText style={styles.nameText}>Education</ThemedText>
              <Input
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView>
              <ThemedText style={styles.nameText}>University</ThemedText>
              <Input
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView>
              <ThemedText style={styles.nameText}>Grade</ThemedText>
              <Input
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView>
              <ThemedText style={styles.nameText}>Current Courses</ThemedText>
              <Input
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView>
              <ThemedText style={styles.nameText}>Goals</ThemedText>
              <Input
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView>
              <ThemedText style={styles.nameText}>Contact</ThemedText>
              <Input
                variant="outline"
                size="md"
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              </ThemedView>

              <ThemedView>
              <ThemedText style={styles.nameText}>Email</ThemedText>
              <Input
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
      );
    
}

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    detailsContainer: {
      alignItems: 'center',
      height: 40,
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
      flexDirection: "row",
      width: 250,
    },
    listTitle: {
      fontWeight: "bold",
    },
    listInput: {
      height: 20
    }, 
    profileBox: {
      flex:1, 
      flexDirection: "row"
    }
  });