import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect, SetStateAction } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Link } from "expo-router";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select"
import { ChevronDownIcon } from "@/components/ui/icon";

export default function SessionsScreen() {

  const [selected, setSelected] = useState('');

  return(
    <View style={styles.container}>
      <ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 25, top: 20 }}>
        <Link href="/sessions/create" asChild>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Session</Text>
          </TouchableOpacity>
        </Link>
        <Select>
          <SelectTrigger variant="outline" size="md" >
            <SelectInput placeholder="Monthly" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop/>
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Monthly" value="monthly" />
              <SelectItem label="Weekly" value="weekly" />
              <SelectItem label="Today" value="today" />
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>
      <Calendar
        style={styles.calendarStyle}
        onDayPress={(day: { dateString: SetStateAction<string>; }) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
    <View>
      <Text style={styles.GroupSessionHeading}>Your Group Sessions</Text>
    </View>
    <View>
      <Text style= {styles.ToJoinHeading}>Available To Join</Text>
    </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },

  calendarStyle: {
    margin: 50,
    borderWidth: 5,
    borderColor: '#C2C2C2',
    borderRadius: 15,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
  
  createButton: {
    backgroundColor: '#077AFF',
    width: 100,
    height: 35,
    borderRadius: 4,
    justifyContent: 'center', 
    alignItems: 'center',
  },

  createButtonText: {
    color: "white",
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center'
  },

  GroupSessionHeading: {
    color: '#05405D',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },

  ToJoinHeading: {
    color: '#05405D',
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  }
});