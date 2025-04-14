import React, { useState } from 'react';
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
const MessageBubble = ({ message }: { message: Message }) => (
  <View style={[
    styles.messageBubble,
    message.isMe ? styles.myMessage : styles.theirMessage
  ]}>
    <Text style={styles.messageText}>{message.text}</Text>
    <Text style={styles.messageTime}>{message.time}</Text>
  </View>
);

export default function ChatDetailScreen() {
  const params = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(sampleMessages);

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
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
          <Image 
            source={require('../assets/images/avatar.png')} 
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>Sarah Johnson</Text>
            <Text style={styles.userStatus}>Online</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="call" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="videocam" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Messages List */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
        />
        
        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add-circle" size={24} color="#FF3B30" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="rgba(255, 255, 255, 0.48)"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              newMessage.trim() === '' ? styles.sendButtonDisabled : {}
            ]}
            onPress={handleSendMessage}
            disabled={newMessage.trim() === ''}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  backButton: {
    padding: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userStatus: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#6BFF90',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
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
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
  },
  messageTime: {
    fontFamily: 'Poppins',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.48)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 59, 48, 0.48)',
  },
});
