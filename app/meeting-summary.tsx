import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Linking } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function MeetingSummary() {
  const params = useLocalSearchParams();
  const [note, setNote] = useState(params.note as string || '');
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Initialize selectedDate and selectedTime from params date if available
  const [selectedDate, setSelectedDate] = useState(() => {
    if (params.date) {
      const date = new Date(params.date as string);
      return date;
    }
    return new Date();
  });

  const [selectedTime, setSelectedTime] = useState(() => {
    if (params.date) {
      const date = new Date(params.date as string);
      return date;
    }
    return new Date();
  });

  const location = {
    name: params.locationName as string,
    countryCode: params.countryCode as string,
    state: params.state as string,
    vicinity: params.vicinity as string
  };

  useEffect(() => {
    // Debug log to check passed params
    console.log('Meeting Summary Params:', {
      date: params.date,
      location,
      selectedDate
    });
  }, []);

  // Format the date for display
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Format the time
  const formattedTime = selectedTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Format date for meeting card
  const cardDate = selectedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  // Get country flag emoji
  const getFlagEmoji = (code: string) => {
    if (!code) return '🏳️';
    try {
      const codePoints = code
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
      return String.fromCodePoint(...codePoints);
    } catch (error) {
      console.error('Error generating flag:', error);
      return '🏳️';
    }
  };

  // Format location display
  const getFormattedLocation = () => {
    if (location.name === 'Current Location') {
      return `${location.vicinity || location.state}, ${location.countryCode}`;
    }
    return location.name;
  };

  const handleLocationEdit = () => {
    router.push({
      pathname: '/select-a-location',
      params: {
        returnTo: 'meeting-summary',
        prevDate: selectedDate.toISOString(),
        prevNote: note
      }
    });
  };

  const handleDateEdit = () => {
    router.push({
      pathname: '/select-date',
      params: {
        returnTo: 'meeting-summary',
        locationName: location.name,
        countryCode: location.countryCode,
        state: location.state,
        vicinity: location.vicinity,
        prevDate: selectedDate.toISOString(),
        prevNote: note
      }
    });
  };

  const handleConfirm = () => {
    // Simplify navigation to avoid potential issues
    console.log('Confirming meeting and returning to chat');
    
    // Navigate back to chat with minimal parameters
    router.push({
      pathname: '/chat-detail',
      params: {
        addMeetingCard: 'true'
      }
    });
  };

  const onTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (time) {
      setSelectedTime(time);
      // Combine date and new time
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(time.getHours());
      newDateTime.setMinutes(time.getMinutes());
      setSelectedDate(newDateTime);
    }
  };

  const handleOpenMaps = () => {
    const query = encodeURIComponent(
      location.name === 'Current Location' 
        ? `${location.vicinity}, ${location.countryCode}`
        : `${location.name}, ${location.vicinity}`
    );
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url).catch(err => console.error('Error opening maps:', err));
  };

  return (
    <View style={styles.container}>
      {/* Header with blur effect */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meeting Summary</Text>
        </View>
        
        {/* Progress indicators */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationContainer}>
            <View style={styles.flagContainer}>
              <Text style={styles.flagEmoji}>{getFlagEmoji(location.countryCode)}</Text>
            </View>
            <TouchableOpacity style={styles.locationInput} onPress={handleLocationEdit}>
              <Ionicons name="location-outline" size={20} color="rgba(255,255,255,0.48)" />
              <Text style={styles.locationText}>{getFormattedLocation()}</Text>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.48)" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapsButton} onPress={handleOpenMaps}>
              <Ionicons name="navigate-circle-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={12} color="rgba(255,255,255,0.48)" />
            <Text style={styles.infoText}>You can change the location by clicking on the input.</Text>
          </View>
        </View>

        {/* Date & Time Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date & Time</Text>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity style={styles.dateTimeInput} onPress={handleDateEdit}>
              <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
              <Text style={styles.dateTimeText}>{formattedDate}</Text>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.48)" style={styles.chevron} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dateTimeInput} 
              onPress={() => setShowTimePicker(true)}
            >
              <Ionicons name="time-outline" size={24} color="#FFFFFF" />
              <Text style={styles.dateTimeText}>{formattedTime}</Text>
              <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.48)" style={styles.chevron} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={onTimeChange}
            style={styles.timePicker}
            textColor="#FFFFFF"
          />
        )}

        {/* Note Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Add a note..."
            placeholderTextColor="rgba(255, 255, 255, 0.48)"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity 
        style={styles.confirmButton}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmButtonText}>Confirm Meeting</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    paddingTop: 47,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  progressStep: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: '#121212',
    fontFamily: 'Poppins',
    fontSize: 11,
    fontWeight: '500',
  },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#FF3B30',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  flagContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 4.8,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.78,
  },
  locationInput: {
    flex: 1,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  locationText: {
    flex: 1,
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  infoText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  dateTimeContainer: {
    gap: 8,
  },
  dateTimeInput: {
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 7,
  },
  dateTimeText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#AEAEAE',
  },
  noteContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 12,
  },
  noteInput: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#AEAEAE',
    height: 80,
  },
  characterCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  characterCountText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#828282',
  },
  bottomContainer: {
    padding: 8,
    paddingBottom: 32,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 'auto',
    marginBottom: 32,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  flagEmoji: {
    fontSize: 24,
  },
  chevron: {
    marginLeft: 'auto'
  },
  timePicker: {
    backgroundColor: '#121212',
    height: 200,
  },
  mapsButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 4.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 