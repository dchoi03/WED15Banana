import React from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import { Input, InputField  } from "@/components/ui/input"
import { Textarea, TextareaInput } from "@/components/ui/textarea"
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Bold } from 'lucide-react-native';
const COLOUR_MODE = "@colorMode";
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
    const[details, setDetails] = useState<ProfileObject[][]>([])
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  const storeBuddies = async () => {
    await AsyncStorage.setItem(BUDDY_LIST, JSON.stringify(details));
  };
  const getBuddies = async () => {
    const storedLists = await AsyncStorage.getItem(BUDDY_LIST)
    if (storedLists != null) {
      setDetails(JSON.parse(storedLists));
    }
  }
  

  useFocusEffect(
  React.useCallback(() => {
    getBuddies();
  }, [])
  );

  useEffect(() => {
    storeBuddies()
  }, [details])

  const unBuddy = (index: string) => {
    setDetails(details.filter((curEn) => {
      return curEn.find((obj) => obj.title === 'Username')?.content !== index} ))
  }


  const renderItem = ({ item }: { item: ProfileObject[] }) => {
    const username = item.find((obj) => obj.title === 'Username')?.content || '';
    const avatar = item.find((obj) => obj.title === 'ProfilePic')?.content || '';
  
    return (
      <GluestackUIProvider mode={colorMode}>
        <View style={styles.itemBox}>
          <Pressable
            onPress={() => {
              const profile = JSON.stringify(item);
              navigation.navigate("userProfile", { profile });
            }}
          >
            <View style={styles.listItem}>
              {/* Avatar and Username on the left */}
              <View style={{ flexDirection: "row", alignItems: "center", flexGrow: 1 }}>
                <Avatar size="lg">
                  <AvatarFallbackText />
                  <AvatarImage
                    source={{
                      uri: avatar,
                    }}
                  />
                </Avatar>
                <Text style={styles.listTitle}>{username}</Text>
              </View>
  
              {/* UnBuddy Button on the right */}
              <Button
                style={styles.button}
                action="negative"
                onPress={() => {
                  unBuddy(username);
                }}
              >
                <ButtonText>UnBuddy</ButtonText>
              </Button>
            </View>
          </Pressable>
        </View>
      </GluestackUIProvider>
    );
  };  

  return (
    <ThemedView style={styles.container}>
        <ThemedView style={styles.subContainer}>
          <FlatList
            data={details}
            ListEmptyComponent={
              <View style={styles.noBuddyBox}>
                <Text style={styles.noBuddyText}>No Buddies</Text>
                <Text>Find some in the search tab!</Text>
              </View>
            }
            keyExtractor={(item, index) => `${index}-${item[0].content}`}
            renderItem={renderItem}
          />
        </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 15
  },
  listItem: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "space-between", 
    width: "100%",
  },
  listTitle: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    color: "#FFF",
  },
  itemBox: {
    width: "90%", 
    alignSelf: "center", 
  },
  noBuddyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noBuddyBox: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

