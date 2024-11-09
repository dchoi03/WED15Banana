import { Image, StyleSheet, Platform, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';
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

export default function EditProfilePage() {

return (
        <ThemedView style={styles.container}>
          <ThemedView style={styles.padder}/>
            <ThemedView style={styles.subContainer}>
            <ThemedText style={styles.yourProfile}>Edit Your Profile</ThemedText>
              <Avatar size="2xl">
                <AvatarFallbackText />
                <AvatarImage />
              </Avatar>
            <ThemedText style={styles.nameText}>JohnSmilth</ThemedText>
            <ThemedText>bio</ThemedText>
            <ThemedView>
            <ButtonGroup >
              <Button style={styles.button} action="primary">
              <ButtonText>Buddies</ButtonText>
              </Button >
              <Button style={styles.button}>
              <ButtonText>Edit Profile</ButtonText>
              </Button>
            </ButtonGroup>
            <ThemedView style={styles.detailsContainer}>
              <ThemedText style={styles.nameText}>Your Details</ThemedText>
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