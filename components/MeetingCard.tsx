import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface MeetingCardProps {
  date?: Date;
  time?: string;
  location?: string;
  city?: string;
  name?: string;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  date = new Date(),
  time = '--',
  location = '--',
  city = '--',
  name = '--'
}) => {
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();

  return (
    <View style={styles.meetingCardWrapper}>
      <View style={styles.meetingCard}>
        <View style={styles.meetingCardHeader}>
          <Text style={styles.meetingCardMonth}>{month}</Text>
          <Text style={styles.meetingCardDay}>{day}</Text>
        </View>
        
        <View style={styles.meetingCardContent}>
          <Text style={styles.meetingCardName}>{name}</Text>
          <View style={styles.meetingCardDetail}>
            <Text style={styles.meetingCardDetailText}>{time}</Text>
          </View>
          <View style={styles.meetingCardDetail}>
            <Text style={styles.meetingCardDetailText}>{`${location}, ${city}`}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.meetingCardEditButton}
          onPress={() => router.push('/meeting-summary')}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  meetingCardWrapper: {
    alignSelf: 'flex-end',
    marginVertical: 8,
    marginHorizontal: 16,
    maxWidth: '80%',
  },
  meetingCard: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  meetingCardHeader: {
    width: 60,
    backgroundColor: '#121212',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meetingCardMonth: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  meetingCardDay: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  meetingCardContent: {
    flex: 1,
    padding: 12,
  },
  meetingCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  meetingCardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  meetingCardDetailText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 4,
  },
  meetingCardEditButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default MeetingCard; 