// components/StreakCalendar.tsx
import React from 'react';
import { Calendar, DateData } from 'react-native-calendars';

type Props = {
  wrappedDates: string[]; // e.g., ['2025-07-10', '2025-07-12']
  onDayPress?: (dateString: string) => void;
};

export default function StreakCalendar({ wrappedDates, onDayPress }: Props) {
  // Mark wrapped dates so the day number is orange
  const markedDates: Record<string, any> = {};
  wrappedDates.forEach((date) => {
    markedDates[date] = {
      customStyles: {
        text: {
          color: 'orange',
          fontWeight: 'bold',
        },
      },
    };
  });

  return (
    <Calendar
      markedDates={markedDates}
      markingType="custom"
      // Dark theme
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
      onDayPress={(day: DateData) => {
        if (onDayPress) onDayPress(day.dateString);
      }}
    />
  );
}
