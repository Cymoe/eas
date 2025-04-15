import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

// Define message type
type Message = {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  isMeetingCard?: boolean;
  meetingData?: {
    date: string;
    time: string;
    location: string;
    name?: string;
    note?: string;
  };
};

// Define a type for introduction cards
type IntroCard = {
  id: string;
  title: string;
  icon: string;
};

// Generate personalized intro cards
const generateIntroCards = (
  matchName: string,
  matchRole: string,
  matchLocation: string,
  matchInstruments: string[] = ['guitar'],
  matchGenres: string[] = ['reggae', 'rock'],
  matchSongs: string[] = ['Sweet Child O\' Mine', 'Wonderwall']
): IntroCard[] => {
  // Pool of possible prompts
  type PromptFn = (param1: string, param2: string) => string;
  
  const prompts: PromptFn[] = [
    // Music taste prompts
    (name, genre) => `Hey ${name}, I see you're into ${genre}! What got you started with that genre?`,
    (name, genre) => `I love ${genre} too! Who are your favorite artists in the scene?`,
    
    // Location-based prompts
    (name, location) => `How's the music scene in ${location}? Any favorite venues?`,
    (name, location) => `Know any good recording studios in ${location}? I'm looking to lay down some tracks!`,
    
    // Role-specific prompts
    (name, role) => `What's the best part about being a ${role}?`,
    (name, role) => `How long have you been a ${role}? Would love to hear your story!`,
    
    // Instrument-specific prompts
    (name, instrument) => `Your ${instrument} skills are fire! Who inspired your playing style?`,
    (name, instrument) => `That ${instrument} tone in your profile is amazing! What's your setup like?`,
    
    // Song-specific prompts
    (name, song) => `Love your cover of "${song}"! Want to jam it sometime?`,
    (name, song) => `That riff in "${song}" is killer! How long did it take to master?`,
    
    // Collaboration prompts
    (name, _) => `${name}, want to collaborate on a track? I've got some ideas I'd love to share!`,
    (name, _) => `Been working on any original music lately? Would love to hear it!`
  ];

  // Shuffle the prompts array
  const shuffledPrompts = [...prompts]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5); // Take first 5 prompts

  return shuffledPrompts.map((prompt, index) => ({
    id: (index + 1).toString(),
    title: prompt(
      matchName,
      matchRole === 'Solo Artist' 
        ? matchGenres[0] 
        : matchInstruments[0]
    ),
    icon: 'sparkles'
  }));
};

// Sample messages data
const sampleMessages: Message[] = [
  {
    id: '1',
    text: 'Hey there! I saw your profile and I really like your style.',
    time: '10:30 AM',
    isMe: false,
  },
  {
    id: '2',
    text: 'Thanks! I appreciate that. I checked out your band too - you guys sound great!',
    time: '10:32 AM',
    isMe: true,
  },
  {
    id: '3',
    text: 'Would you be interested in jamming sometime? We\'re looking for a guitarist for our next session.',
    time: '10:35 AM',
    isMe: false,
  },
  {
    id: '4',
    text: 'Absolutely! I\'d love to join. When and where are you planning to meet?',
    time: '10:38 AM',
    isMe: true,
  },
  {
    id: '5',
    text: 'We have a studio booked for this Saturday at 3PM. Does that work for you?',
    time: '10:40 AM',
    isMe: false,
  },
];

// Message bubble component
const MessageBubble = ({ message }: { message: Message }) => {
  // Use a hardcoded meeting card that matches the design in the image
  if (message.isMeetingCard) {
    return (
      <View style={styles.meetingCardWrapper}>
        <View style={styles.meetingCard}>
          <View style={styles.meetingCardHeader}>
            <Text style={styles.meetingCardMonth}>Jan</Text>
            <Text style={styles.meetingCardDay}>18</Text>
          </View>
          
          <View style={styles.meetingCardContent}>
            <Text style={styles.meetingCardName}>Anto</Text>
            <View style={styles.meetingCardDetail}>
              <Text style={styles.meetingCardDetailText}>6:00PM</Text>
            </View>
            <View style={styles.meetingCardDetail}>
              <Text style={styles.meetingCardDetailText}>Honda Center, Geneva</Text>
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
  }
  
  // Regular message bubble
  return (
    <View style={[
      styles.messageBubble,
      message.isMe ? styles.myMessage : styles.theirMessage
    ]}>
      <Text style={styles.messageText}>{message.text}</Text>
      <Text style={styles.messageTime}>{message.time}</Text>
    </View>
  );
};

// Intro card component
const IntroCardComponent = ({ card, onPress }: { card: IntroCard; onPress: (title: string) => void }) => (
  <TouchableOpacity 
    style={styles.introCard}
    onPress={() => onPress(card.title)}
  >
    <View style={styles.iconContainer}>
      <Ionicons name={card.icon as any} size={16} color="#FF4B4B" />
    </View>
    <Text style={styles.introCardTitle}>{card.title}</Text>
  </TouchableOpacity>
);

const CalendarIcon = () => (
  <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <Rect width="44" height="44" rx="22" fill="#121212"/>
    <Path d="M24.2917 27.4999C23.65 27.4999 23.1076 27.2784 22.6646 26.8353C22.2215 26.3923 22 25.8499 22 25.2083C22 24.5666 22.2215 24.0242 22.6646 23.5812C23.1076 23.1381 23.65 22.9166 24.2917 22.9166C24.9333 22.9166 25.4757 23.1381 25.9187 23.5812C26.3618 24.0242 26.5833 24.5666 26.5833 25.2083C26.5833 25.8499 26.3618 26.3923 25.9187 26.8353C25.4757 27.2784 24.9333 27.4999 24.2917 27.4999ZM15.5833 31.1666C15.0792 31.1666 14.6476 30.9871 14.2885 30.628C13.9295 30.269 13.75 29.8374 13.75 29.3333V16.4999C13.75 15.9958 13.9295 15.5642 14.2885 15.2051C14.6476 14.8461 15.0792 14.6666 15.5833 14.6666H16.5V13.7499C16.5 13.4902 16.5878 13.2725 16.7635 13.0968C16.9392 12.9211 17.1569 12.8333 17.4167 12.8333C17.6764 12.8333 17.8941 12.9211 18.0698 13.0968C18.2455 13.2725 18.3333 13.4902 18.3333 13.7499V14.6666H25.6667V13.7499C25.6667 13.4902 25.7545 13.2725 25.9302 13.0968C26.1059 12.9211 26.3236 12.8333 26.5833 12.8333C26.8431 12.8333 27.0608 12.9211 27.2365 13.0968C27.4122 13.2725 27.5 13.4902 27.5 13.7499V14.6666H28.4167C28.9208 14.6666 29.3524 14.8461 29.7115 15.2051C30.0705 15.5642 30.25 15.9958 30.25 16.4999V29.3333C30.25 29.8374 30.0705 30.269 29.7115 30.628C29.3524 30.9871 28.9208 31.1666 28.4167 31.1666H15.5833ZM15.5833 29.3333H28.4167V20.1666H15.5833V29.3333ZM15.5833 18.3333H28.4167V16.4999H15.5833V18.3333Z" fill="#B3B3B3"/>
  </Svg>
);

export default function ChatDetailScreen() {
  const params = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isNewMatch, setIsNewMatch] = useState(true);
  const [matchDate, setMatchDate] = useState('Jan 4, 2023');
  const [introCards, setIntroCards] = useState<IntroCard[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [showMeetingCard, setShowMeetingCard] = useState(false);

  useEffect(() => {
    // Generate personalized intro cards when the screen loads
    const cards = generateIntroCards(
      'Catie',
      'Solo Artist',
      'Los Angeles',
      ['guitar', 'vocals'],
      ['indie rock', 'alternative'],
      ['Sweet Child O\' Mine', 'Wonderwall']
    );
    setIntroCards(cards);
  }, []);

  useEffect(() => {
    // Check if we should show the meeting card (from meeting-summary.tsx)
    if (params.addMeetingCard === 'true') {
      console.log('Should show meeting card');
      setShowMeetingCard(true);
      setIsNewMatch(false);
    }
  }, [params.addMeetingCard]);

  useEffect(() => {
    // Check if a location was selected and returned
    if (params.selectedLocation) {
      try {
        const locationData = JSON.parse(params.selectedLocation as string);
        setSelectedLocation(locationData);
        
        // Create a message with the selected location
        const locationMessage: Message = {
          id: Date.now().toString(),
          text: `Let's meet at ${locationData.locationName} in ${locationData.state}!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true,
        };
        
        setMessages(prev => [...prev, locationMessage]);
        setIsNewMatch(false);
      } catch (error) {
        console.log('Error parsing location data:', error);
      }
    }
    
    // Check if meeting data (location + date) was returned
    if (params.meetingData) {
      try {
        const meetingData = JSON.parse(params.meetingData as string);
        
        // Create a message with the selected location and date
        const meetingMessage: Message = {
          id: Date.now().toString(),
          text: `Let's meet at ${meetingData.locationName} in ${meetingData.state} on ${meetingData.formattedDate}!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true,
        };
        
        setMessages(prev => [...prev, meetingMessage]);
        setIsNewMatch(false);
      } catch (error) {
        console.log('Error parsing meeting data:', error);
      }
    }
  }, [params.selectedLocation, params.meetingData]);

  useEffect(() => {
    // Simulate a new match or existing conversation
    if (!isNewMatch) {
      setMessages(sampleMessages);
    }
  }, [isNewMatch]);

  const handleIntroCardPress = (title: string) => {
    setMessage(title);
  };

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    
    setMessages([...messages, newMsg]);
    setMessage('');
    
    // After sending first message, it's no longer a new match
    if (isNewMatch) {
      setIsNewMatch(false);
    }
  };

  const handleCalendarPress = () => {
    // Navigate to the location selection screen
    router.push('/select-a-location');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.profileInfo}>
          <View style={styles.onlineIndicator} />
          <Text style={styles.userName}>Catie, 24</Text>
          <Text style={styles.userLocation}>Los Angeles • Solo Artist</Text>
        </View>
        
        <View style={styles.headerActions}>
          {/* Menu button */}
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => router.push('/chat-settings')}
          >
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Match info banner */}
      {isNewMatch && (
        <View style={styles.matchBanner}>
          <Text style={styles.matchText}>You matched with Catie on {matchDate}</Text>
        </View>
      )}
      
      {/* Messages List */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Always show messages if they exist */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          style={styles.messagesList}
          contentContainerStyle={[
            styles.messagesContainer,
            messages.length === 0 && styles.emptyMessagesContainer
          ]}
          ListEmptyComponent={isNewMatch ? (
            <View style={styles.introContainer}>
              <FlatList
                data={introCards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <IntroCardComponent 
                    card={item} 
                    onPress={handleIntroCardPress}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.introCardsContainer}
                snapToInterval={232}
                snapToAlignment="start"
                decelerationRate="fast"
                pagingEnabled={false}
              />
            </View>
          ) : null}
          ListFooterComponent={showMeetingCard ? (
            <View style={styles.meetingCardWrapper}>
              <View style={styles.meetingCard}>
                <View style={styles.meetingCardHeader}>
                  <Text style={styles.meetingCardMonth}>Jan</Text>
                  <Text style={styles.meetingCardDay}>18</Text>
                </View>
                
                <View style={styles.meetingCardContent}>
                  <Text style={styles.meetingCardName}>Anto</Text>
                  <View style={styles.meetingCardDetail}>
                    <Text style={styles.meetingCardDetailText}>6:00PM</Text>
                  </View>
                  <View style={styles.meetingCardDetail}>
                    <Text style={styles.meetingCardDetailText}>Honda Center, Geneva</Text>
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
          ) : null}
        />
        
        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.calendarButton} onPress={handleCalendarPress}>
            <CalendarIcon />
          </TouchableOpacity>
          
          <TextInput
            style={[styles.input, { marginRight: message.trim().length > 0 ? 8 : 0 }]}
            placeholder="Type your message..."
            placeholderTextColor="rgba(255, 255, 255, 0.48)"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          
          {message.trim().length > 0 && (
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleSendMessage}
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CD964',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userLocation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchBanner: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 8,
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  matchText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  keyboardAvoidingView: {
    flex: 1,
    position: 'relative',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF3B30',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  messageText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.48)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  introContainer: {
    position: 'absolute',
    bottom: 108,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 0,
    zIndex: 1,
  },
  introCardsContainer: {
    paddingBottom: 16,
    paddingRight: 16,
  },
  introCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 280,
    height: 96,
  },
  introCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.3,
    paddingRight: 8,
  },
  iconContainer: {
    marginBottom: 12,
    opacity: 0.48,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#121212',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    height: 44,
    marginLeft: 8,
  },
  calendarButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF4B4B',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  meetingCardDay: {
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  meetingCardContent: {
    flex: 1,
    padding: 12,
  },
  meetingCardName: {
    fontFamily: 'Poppins',
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
    fontFamily: 'Poppins',
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
