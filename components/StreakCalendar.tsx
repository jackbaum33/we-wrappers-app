import React from 'react';
import { Calendar } from 'react-native-calendars';

export default function StreakCalendar({ wrappedDates }: { wrappedDates: string[] }) {
  const markedDates = wrappedDates.reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: 'silver' };
    return acc;
  }, {} as Record<string, any>);

  return (
    <Calendar
      markedDates={markedDates}
      theme={{
        backgroundColor: 'black',
        calendarBackground: 'black',
        textSectionTitleColor: 'silver',
        selectedDayBackgroundColor: 'silver',
        selectedDayTextColor: 'black',
        todayTextColor: 'silver',
        dayTextColor: 'silver',
        textDisabledColor: '#555',
        dotColor: 'silver',
        selectedDotColor: 'black',
        arrowColor: 'silver',
        monthTextColor: 'silver',
        indicatorColor: 'silver',
        textDayFontWeight: '500',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '600',
        textDayFontSize: 16,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 14,
      }}
    />
  );
}
