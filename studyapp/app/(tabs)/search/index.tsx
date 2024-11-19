import { Image, StyleSheet, View, ScrollView } from "react-native";

import { useState } from "react";
import { ButtonIcon, ButtonText, Button } from "@/components/ui/button";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Search, Mic, ArrowLeft } from "lucide-react-native";
import Map from './map'
import SearchResults from './searchResult'

export default function HomeScreen() {

  const [searchText, setSearchText] = useState<string>("")
  
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      {/* Search bar */}
      <Input size={'xl'} style={styles.searchBar}>
        <InputSlot>
          <InputIcon size={24} as={Search} />
        </InputSlot>
        <InputField onChangeText={(text) => setSearchText(text)} value={searchText} type="text" placeholder="Search study buddies..." />
        <InputSlot>
          <InputIcon size={24} as={Mic} />
        </InputSlot>
      </Input>
      {/* Map or search results */}
      {searchText.length > 0 ? <SearchResults searchText={searchText} /> : <Map />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    gap: 24,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  searchBar: {
    width: 370,
    height: 48,
    gap: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderBlockColor: "#05405D",
    borderRadius: 8,
    flexDirection: "row",
  },
  mapImage: {
    borderRadius: 12,
    width: 370,
    height: 300,
  },
});
