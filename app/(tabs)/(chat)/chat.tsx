import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Svg, { Path, G, Rect, ClipPath, Defs } from 'react-native-svg';

// Dummy data for chats
const DUMMY_CHATS = [
  {
    id: '1',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    image: require('@/assets/images/avatar.png'),
    unread: 12,
    isPinned: true,
  },
  {
    id: '2',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    image: require('@/assets/images/avatar.png'),
    unread: 4,
    isPinned: true,
  },
  {
    id: '3',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    image: require('@/assets/images/avatar.png'),
    unread: 12,
    isPinned: true,
  },
  {
    id: '4',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    image: require('@/assets/images/avatar.png'),
    unread: 12,
    isPinned: false,
  },
  {
    id: '5',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    image: require('@/assets/images/avatar.png'),
    unread: 4,
    isPinned: false,
  },
  {
    id: '6',
    name: 'Viktor Sola',
    lastMessage: 'Last message',
    time: '10:55 PM',
    image: require('@/assets/images/avatar.png'),
    unread: 12,
    isPinned: false,
  },
];

// Add a DUMMY_MATCHES data structure for the matches tab
const DUMMY_MATCHES = [
  {
    id: 'band-1',
    category: 'BANDS',
    items: [
      {
        id: 'band-1-1',
        name: 'Alvin & The Chimpmunks',
        type: 'Band',
        date: 'Mar 12, 2025',
        image: require('@/assets/images/avatar.png'),
        isFavorite: true
      },
      {
        id: 'band-1-2',
        name: 'Vendetta',
        type: 'Band',
        date: 'Mar 12, 2025',
        image: require('@/assets/images/avatar.png'),
        isFavorite: true
      },
      {
        id: 'band-1-3',
        name: 'The Sunflowers',
        type: 'Band',
        date: 'Mar 12, 2025',
        image: require('@/assets/images/avatar.png'),
        isFavorite: true
      }
    ]
  },
  {
    id: 'drummers-1',
    category: 'DRUMMERS',
    items: [
      {
        id: 'drummer-1-1',
        name: 'Brandon',
        type: 'Solo Artist',
        date: 'Mar 12, 2025',
        image: require('@/assets/images/avatar.png'),
        isFavorite: true
      },
      {
        id: 'drummer-1-2',
        name: 'Kyle',
        type: 'Solo Artist',
        date: 'Mar 12, 2025',
        image: require('@/assets/images/avatar.png'),
        isFavorite: true
      },
      {
        id: 'drummer-1-3',
        name: 'Zoran',
        type: 'Solo Artist',
        date: 'Mar 12, 2025',
        image: require('@/assets/images/avatar.png'),
        isFavorite: true
      }
    ]
  },
  {
    id: 'guitarist-1',
    category: 'GUITARIST',
    items: [
      {
        id: 'guitarist-1-1',
        name: 'Alvin & The Chimpmunks',
        type: 'Solo Artist',
        date: 'Mar 12, 2025',
        image: require('@/assets/images/avatar.png'),
        isFavorite: true
      }
    ]
  }
];

const ChatItem = ({ item }: { item: any }) => (
  <TouchableOpacity 
    style={styles.chatItem}
    onPress={() => router.push('/chat-detail' as any)}
  >
    <Image source={item.image} style={styles.avatar} />
    <View style={styles.chatInfo}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatTime}>{item.time}</Text>
      </View>
      <View style={styles.chatFooter}>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage} • 
          <Ionicons name="checkmark-done" size={14} color="rgba(255, 255, 255, 0.48)" />
        </Text>
        {item.unread > 0 && (
          <View style={styles.unreadContainer}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </View>
    <TouchableOpacity style={styles.callButton}>
      <Ionicons name="call" size={22} color="white" />
    </TouchableOpacity>
  </TouchableOpacity>
);

// Add a MatchItem component to render match entries
const MatchItem = ({ item }: { item: any }) => (
  <View style={styles.matchItem}>
    <Image source={item.image} style={styles.matchAvatar} />
    <View style={styles.matchInfo}>
      <View style={styles.matchNameRow}>
        {item.isFavorite && <Ionicons name="star" size={16} color="#FF3B30" style={styles.starIcon} />}
        <Text style={styles.matchName}>{item.name}</Text>
      </View>
      <Text style={styles.matchType}>{item.type} • {item.date}</Text>
    </View>
    <TouchableOpacity 
      style={styles.sayHiButton}
      onPress={() => router.push('/chat-detail' as any)}
    >
      <Ionicons name="hand-right" size={16} color="#FFFFFF" />
      <Text style={styles.sayHiText}>Say Hi</Text>
    </TouchableOpacity>
  </View>
);

// Add a CategoryHeader component
const CategoryHeader = ({ category, count, isExpanded, onToggle }: {
  category: string;
  count: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <TouchableOpacity style={styles.categoryHeader} onPress={onToggle}>
    <Text style={styles.categoryTitle}>{category} {count}</Text>
    <Ionicons
      name={isExpanded ? "chevron-down" : "chevron-forward"}
      size={24}
      color="rgba(255, 255, 255, 0.48)"
    />
  </TouchableOpacity>
);

export default function ChatsScreen() {
  const [activeTab, setActiveTab] = React.useState('Conversations');
  const pinnedChats = DUMMY_CHATS.filter(chat => chat.isPinned);
  const regularChats = DUMMY_CHATS.filter(chat => !chat.isPinned);
  
  // Track expanded state for each category
  const [expandedCategories, setExpandedCategories] = React.useState<{[key: string]: boolean}>({
    'BANDS': true,
    'DRUMMERS': true,
    'GUITARIST': true
  });
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#121212', '#121212']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer}></View>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity style={styles.optionsButton} onPress={() => router.push('/chat-settings')}>
          <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <Rect width="40" height="40" rx="20" fill="white" fillOpacity="0.08"/>
            <G clipPath="url(#clip0_221_2018)">
              <Path d="M12.5 25C12.5 25.4583 12.875 25.8333 13.3333 25.8333H17.5V24.1667H13.3333C12.875 24.1667 12.5 24.5417 12.5 25ZM12.5 15C12.5 15.4583 12.875 15.8333 13.3333 15.8333H20.8333V14.1667H13.3333C12.875 14.1667 12.5 14.5417 12.5 15ZM20.8333 26.6667V25.8333H26.6667C27.125 25.8333 27.5 25.4583 27.5 25C27.5 24.5417 27.125 24.1667 26.6667 24.1667H20.8333V23.3333C20.8333 22.875 20.4583 22.5 20 22.5C19.5417 22.5 19.1667 22.875 19.1667 23.3333V26.6667C19.1667 27.125 19.5417 27.5 20 27.5C20.4583 27.5 20.8333 27.125 20.8333 26.6667ZM15.8333 18.3333V19.1667H13.3333C12.875 19.1667 12.5 19.5417 12.5 20C12.5 20.4583 12.875 20.8333 13.3333 20.8333H15.8333V21.6667C15.8333 22.125 16.2083 22.5 16.6667 22.5C17.125 22.5 17.5 22.125 17.5 21.6667V18.3333C17.5 17.875 17.125 17.5 16.6667 17.5C16.2083 17.5 15.8333 17.875 15.8333 18.3333ZM27.5 20C27.5 19.5417 27.125 19.1667 26.6667 19.1667H19.1667V20.8333H26.6667C27.125 20.8333 27.5 20.4583 27.5 20ZM23.3333 17.5C23.7917 17.5 24.1667 17.125 24.1667 16.6667V15.8333H26.6667C27.125 15.8333 27.5 15.4583 27.5 15C27.5 14.5417 27.125 14.1667 26.6667 14.1667H24.1667V13.3333C24.1667 12.875 23.7917 12.5 23.3333 12.5C22.875 12.5 22.5 12.875 22.5 13.3333V16.6667C22.5 17.125 22.875 17.5 23.3333 17.5Z" fill="#F8F9FB"/>
            </G>
            <Defs>
              <ClipPath id="clip0_221_2018">
                <Rect width="20" height="20" fill="white" transform="translate(10 10)"/>
              </ClipPath>
            </Defs>
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.48)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a conversation..."
            placeholderTextColor="rgba(255, 255, 255, 0.48)"
          />
          <TouchableOpacity style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.48)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Conversations' && styles.activeTab]}
          onPress={() => setActiveTab('Conversations')}
        >
          <Text style={[styles.tabText, activeTab === 'Conversations' && styles.activeTabText]}>
            Conversations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Matches' && styles.activeTab]}
          onPress={() => setActiveTab('Matches')}
        >
          <Text style={[styles.tabText, activeTab === 'Matches' && styles.activeTabText]}>
            Matches
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'Conversations' ? (
        <FlatList
          data={[
            ...(pinnedChats.length > 0 ? [{ type: 'pinnedHeader' }] : []),
            ...pinnedChats.map(chat => ({ type: 'chat', data: chat })),
            ...(regularChats.length > 0 ? [{ type: 'regularHeader' }] : []),
            ...regularChats.map(chat => ({ type: 'chat', data: chat })),
          ]}
          renderItem={({ item }: { item: any }) => {
            if (item.type === 'pinnedHeader') {
              return (
                <View style={styles.sectionHeader}>
                  <Ionicons name="pin" size={16} color="rgba(255, 255, 255, 0.48)" />
                  <Text style={styles.sectionHeaderText}>ALL PINNED</Text>
                  <Text style={styles.sectionCount}>{pinnedChats.length}</Text>
                </View>
              );
            } else if (item.type === 'regularHeader') {
              return (
                <View style={styles.sectionHeader}>
                  <Ionicons name="chatbubble-ellipses-outline" size={16} color="rgba(255, 255, 255, 0.48)" />
                  <Text style={styles.sectionHeaderText}>ALL CONVERSATIONS</Text>
                  <Text style={styles.sectionCount}>{regularChats.length}</Text>
                </View>
              );
            } else if (item.type === 'chat' && 'data' in item) {
              return <ChatItem item={item.data} />;
            }
            return null;
          }}
          keyExtractor={(item, index) => 
            item.type === 'chat' && item.data ? item.data.id : `${item.type}-${index}`
          }
          contentContainerStyle={styles.chatsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={DUMMY_MATCHES}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <CategoryHeader
                category={item.category}
                count={item.items.length}
                isExpanded={expandedCategories[item.category]}
                onToggle={() => toggleCategory(item.category)}
              />
              {expandedCategories[item.category] && (
                <View style={styles.matchesList}>
                  {item.items.map(matchItem => (
                    <MatchItem key={matchItem.id} item={matchItem} />
                  ))}
                </View>
              )}
            </View>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.matchesListContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 12,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  optionsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: 'rgba(71, 71, 71, 0.24)',
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  clearButton: {
    padding: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  activeTabText: {
    color: '#121212',
  },
  chatsList: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionHeaderText: {
    color: 'rgba(255, 255, 255, 0.48)',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  sectionCount: {
    color: 'rgba(255, 255, 255, 0.48)',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 6,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  chatTime: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  unreadContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  // New styles for Matches tab
  matchesListContainer: {
    paddingHorizontal: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  matchesList: {
    marginTop: 8,
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  matchAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  matchInfo: {
    flex: 1,
  },
  matchNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 4,
  },
  matchName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
  matchType: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
    marginTop: 2,
  },
  sayHiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sayHiText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'Roboto',
  },
});
