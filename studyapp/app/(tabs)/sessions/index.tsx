import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect, SetStateAction } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Button, ButtonText,ButtonSpinner,ButtonIcon, ButtonGroup, } from "@/components/ui/button";

export default function SessionsScreen() {

  const [selected, setSelected] = useState('');

  return(
    <View style={styles.container}>
      <Button action='positive' size='sm'>
        <ButtonText>
          Create Session
        </ButtonText>
      </Button>
      <Calendar
        style={styles.calendarStyle}
        onDayPress={(day: { dateString: SetStateAction<string>; }) => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },

  calendarStyle: {
    margin: 50,
    borderWidth: 5,
    borderColor: '#C2C2C2',
    borderRadius: 15,
    fontFamily: 'Roboto'
  },
  
  createButton: {
    backgroundColor: 'white',
    width: 100,
  }
});