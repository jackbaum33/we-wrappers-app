// we-wrappers-app/components/StreakCalendar.tsx
import React from 'react';
import { Calendar } from 'react-native-calendars';

type Props = {
  wrappedDates: string[]; // e.g., ['2025-07-10', '2025-07-12']
};

export default function StreakCalendar({ wrappedDates }: Props) {
  const markedDates: { [key: string]: { marked: boolean; dotColor: string; selectedColor?: string } } = {};

  wrappedDates.forEach((date) => {
    markedDates[date] = {
      marked: true,
      dotColor: 'green',
      selectedColor: '#d1f7c4',
    };
  });

  return (
    <Calendar
      markedDates={markedDates}
      markingType={'dot'}
      theme={{
        selectedDayBackgroundColor: '#4ADE80',
        todayTextColor: '#007AFF',
        arrowColor: '#007AFF',
        textSectionTitleColor: '#333',
      }}
    />
  );
}
