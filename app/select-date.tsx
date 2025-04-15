import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const QUICK_DATES = [
  { id: 'today', label: 'Today' },
  { id: 'this-week', label: 'This week' },
  { id: 'this-weekend', label: 'This weekend' },
  { id: 'next-weekend', label: 'Next weekend' },
  { id: 'this-month', label: 'This month' },
  { id: 'january', label: 'January' },
  { id: 'february', label: 'February' },
  { id: 'march', label: 'March' },
];

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function SelectDate() {
  const params = useLocalSearchParams();
  const returnTo = params.returnTo as string;
  const prevNote = params.prevNote as string;
  const locationName = params.locationName as string;
  const countryCode = params.countryCode as string;
  const state = params.state as string;
  const vicinity = params.vicinity as string;

  // Initialize selectedDate from params if available
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (params.prevDate) {
      return new Date(params.prevDate as string);
    }
    return null;
  });
  const [selectedQuickDate, setSelectedQuickDate] = useState<string | null>(null);

  useEffect(() => {
    console.log('Location Data:', { locationName, countryCode, state, vicinity }); // Debug log
  }, [locationName, countryCode, state, vicinity]);

  const getDateFromQuickSelect = (quickDateId: string): Date => {
    const today = new Date();
    const currentYear = today.getFullYear();
    
    switch (quickDateId) {
      case 'today':
        return today;
      case 'this-week': {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
        return endOfWeek;
      }
      case 'this-weekend': {
        const nextSaturday = new Date(today);
        nextSaturday.setDate(today.getDate() + (6 - today.getDay()));
        return nextSaturday;
      }
      case 'next-weekend': {
        const nextSaturday = new Date(today);
        nextSaturday.setDate(today.getDate() + (13 - today.getDay()));
        return nextSaturday;
      }
      case 'this-month': {
        const lastDay = new Date(currentYear, today.getMonth() + 1, 0);
        return lastDay;
      }
      case 'january': {
        const targetYear = today.getMonth() > 0 ? currentYear + 1 : currentYear;
        return new Date(targetYear, 0, 15);
      }
      case 'february': {
        const targetYear = today.getMonth() > 1 ? currentYear + 1 : currentYear;
        return new Date(targetYear, 1, 15);
      }
      case 'march': {
        const targetYear = today.getMonth() > 2 ? currentYear + 1 : currentYear;
        return new Date(targetYear, 2, 15);
      }
      default:
        return today;
    }
  };

  const isSameDate = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const handleQuickDateSelect = (quickDateId: string) => {
    const newDate = getDateFromQuickSelect(quickDateId);
    setSelectedDate(newDate);
    setSelectedQuickDate(quickDateId);
  };

  const handleClearAll = () => {
    setSelectedDate(null);
    setSelectedQuickDate(null);
  };

  const generateMonthsData = () => {
    const today = new Date();
    const months = [];
    
    // Generate next 12 months starting from current month
    for (let i = 0; i < 12; i++) {
      const currentMonth = new Date(today.getFullYear(), today.getMonth() + i, 1);
      months.push({
        title: currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' }),
        days: generateCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth())
      });
    }

    return months;
  };

  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the first day of the month (0-6)
    const firstDayOfMonth = firstDay.getDay();
    
    // Add empty days at the start
    const days = Array(firstDayOfMonth).fill(null);
    
    // Add the actual days of the month
    let currentDate = new Date(firstDay);
    while (currentDate <= lastDay) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const handleDateSelect = () => {
    if (!selectedDate) return;
    
    // Always navigate to meeting-summary screen with all necessary parameters
    router.push({
      pathname: '/meeting-summary',
      params: {
        locationName,
        countryCode,
        state,
        vicinity,
        date: selectedDate.toISOString(),
        note: prevNote || ''
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose a Date</Text>
          <View style={{ width: 20 }} />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.quickDatesContainer}>
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAll}>Clear all</Text>
          </TouchableOpacity>
          <Text style={styles.datesTitle}>Dates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickDates}>
            <View style={styles.chipContainer}>
              {QUICK_DATES.map((date) => (
                <TouchableOpacity 
                  key={date.id} 
                  style={[
                    styles.chip,
                    selectedQuickDate === date.id && styles.selectedChip
                  ]}
                  onPress={() => handleQuickDateSelect(date.id)}
                >
                  <Text style={[
                    styles.chipLabel,
                    selectedQuickDate === date.id && styles.selectedChipLabel
                  ]}>{date.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Calendar */}
        <View style={styles.calendar}>
          <View style={styles.weekDays}>
            {DAYS.map((day) => (
              <Text key={day} style={styles.weekDay}>{day}</Text>
            ))}
          </View>

          {generateMonthsData().map((month, monthIndex) => (
            <View key={monthIndex} style={styles.monthContainer}>
              <Text style={styles.monthTitle}>{month.title}</Text>
              <View style={styles.daysGrid}>
                {month.days.map((date, index) => (
                  <View key={index} style={styles.dayCell}>
                    {date ? (
                      <TouchableOpacity
                        style={[
                          styles.dayButton,
                          isSameDate(selectedDate, date) && styles.selectedDay
                        ]}
                        onPress={() => {
                          setSelectedDate(date);
                          setSelectedQuickDate(null);
                        }}
                      >
                        <Text style={[
                          styles.dayText,
                          isSameDate(selectedDate, date) && styles.selectedDayText
                        ]}>{date.getDate()}</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.emptyDay} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Share Button */}
      {selectedDate && (
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleDateSelect}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
  header: {
    width: '100%',
    height: 84,
    backgroundColor: '#1F1F1F',
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 20,
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  quickDatesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  clearAll: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#00B728',
    marginBottom: 16,
  },
  datesTitle: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  quickDates: {
    marginBottom: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    backgroundColor: '#313131',
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 16,
    height: 30,
  },
  chipLabel: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  monthContainer: {
    marginBottom: 8, // Reduced spacing between months
  },
  calendar: {
    paddingHorizontal: 16,
    paddingBottom: 120, // Add padding for the share button
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekDay: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    width: 40,
    textAlign: 'center',
  },
  monthTitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 8, // Add small spacing above month title
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  dayCell: {
    width: '14.28%', // 100% / 7 for 7 days per row
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  emptyDay: {
    width: 40,
    height: 40,
  },
  selectedDay: {
    backgroundColor: '#FF3B30',
  },
  dayText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
  },
  shareButton: {
    position: 'absolute',
    bottom: 50,
    left: 105,
    backgroundColor: '#FE6F3B',
    borderRadius: 100,
    width: 180,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonDisabled: {
    opacity: 0.48,
  },
  shareButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: '#000000',
  },
  selectedChip: {
    backgroundColor: '#FF3B30',
  },
  selectedChipLabel: {
    color: '#FFFFFF',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 