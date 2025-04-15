// Notification service for managing app notifications
// Following WindSurf design system guidelines

// Simple key-value map of notification settings
export type NotificationSettings = {
  [key: string]: boolean;
};

// Notification categories and their messages
export const notificationMessages = {
  matching: {
    new_match: "🎸 New Match! {userName} is ready to jam with you. Start chatting now!",
    profile_likes: "🎤 {userName} just liked your profile. Swipe back to connect!",
    shared_interests: "🎼 You've got a match! {userName} shares your love for {genre/instrument}.",
    instrument_match: "🥁 {userName} is looking for a drummer like you! Check their profile.",
    nearby_match: "🎹 Don't miss out! {userName} is nearby and ready to collaborate."
  },
  subscription: {
    premium_features: "⭐ Unlock premium features! Upgrade to BandMate Pro for exclusive tools.",
    trial_ending: "⏳ Your free trial ends in 3 days! Renew now to keep connecting with musicians.",
    unlimited_matches: "🎵 Enjoy unlimited matches and advanced filters with BandMate Pro.",
    limited_offer: "🔥 Limited-time offer: Get 20% off your subscription today!",
    premium_visibility: "💡 Did you know? Premium users get priority visibility in searches."
  },
  offers: {
    flash_sale: "🎉 Flash Sale! Upgrade to premium at 50% off for the next 24 hours!",
    referral_reward: "🎁 Special Deal: Invite a friend and get a free month of BandMate Pro!",
    weekend_special: "💸 Exclusive Offer: Save on your subscription this weekend only!",
    bundle_deal: "🎶 Get access to premium collaboration tools with our new bundle offer.",
    studio_discount: "📢 Early Bird Discount: Book studio sessions through BandMate and save big!"
  },
  updates: {
    new_feature: "🚀 New Feature Alert: Schedule jam sessions directly in the app!",
    app_update: "🔔 Your app has been updated with exciting new collaboration tools.",
    calendar_feature: "📅 Plan ahead! The new calendar feature helps you organize your music projects.",
    daw_integration: "🎛️ We've added DAW integration for smoother remote collaborations!",
    ui_refresh: "🌟 Check out our refreshed interface for an even better user experience."
  },
  events: {
    open_mic: "🎤 Open Mic Night near you! Join other musicians at {venueName}.",
    jam_session: "🎶 Jam Session happening tomorrow at {location}. RSVP now!",
    networking_event: "📢 Don't miss the Music Networking Event this weekend in your area!",
    collaboration_invite: "🎧 {userName} invited you to collaborate on their project.",
    session_reminder: "🎸 Reminder: Your jam session with {userName} starts in 1 hour!"
  },
  engagement: {
    reengagement: "👋 Haven't logged in for a while? New musicians are waiting to connect with you!",
    trending_musicians: "🎵 Discover trending musicians in your area today!",
    popular_genre: "🔥 Popular Now: Musicians looking for collaborations in {genre/style}.",
    profile_views: "📈 Your profile views increased by 50% this week—keep the momentum going!",
    unread_messages: "💬 You have unread messages from {userName}. Don't leave them hanging!"
  },
  collaboration: {
    new_track: "🎼 {userName} just uploaded a new track—check it out and give feedback!",
    project_update: "📂 Your shared project file has been updated by {userName}.",
    studio_session: "📅 Reminder: Your scheduled studio session is tomorrow at {time}.",
    remote_jam: "🎛️ Collaborate remotely! Try our new low-latency jam feature now.",
    track_sharing: "🔗 Share your latest track with collaborators directly through BandMate."
  },
  discovery: {
    new_musicians: "🎧 New musicians who play {instrument/genre} have joined BandMate!",
    trending_profiles: "🔥 Trending Now: Check out top-rated profiles in your area.",
    similar_interests: "✨ Discover musicians who love {favoriteArtist/genre} just like you.",
    global_collab: "🌍 Explore global collaborations with musicians from around the world.",
    new_performance: "{userName} just added a new performance video—watch it now!"
  },
  social: {
    forum_activity: "👥 Join the conversation! New discussions happening in the forums now.",
    project_comment: "{userName} commented on your shared project—see what they said!",
    performance_like: "{userName} liked your performance video—check out their profile.",
    friend_joined: "{friendName} just joined BandMate—connect and collaborate today!",
    group_invite: "{userName} invited you to their band group chat."
  },
  retention: {
    return_prompt: "🎸 Ready to jam again? Find new matches today on BandMate.",
    pending_response: "{userName} is still waiting for your response—don't keep them waiting!",
    feature_update: "{featureUpdate}: Try our improved search filters to find perfect collaborators faster.",
    reconnect: "{userName} recently became active again—reconnect and collaborate!",
    special_event: "{specialEvent}: Celebrate International Music Day with curated matches!"
  }
};

// Default notification settings
const defaultSettings: NotificationSettings = {
  // Matching category
  new_match: true,
  profile_likes: true,
  shared_interests: true,
  nearby_musicians: true,
  instrument_match: true,
  
  // Subscription category
  subscription_status: true,
  special_offers: false,
  premium_features: true,
  trial_ending: true,
  premium_visibility: true,
  
  // Offers category
  flash_sale: false,
  referral_reward: true,
  weekend_special: false,
  bundle_deal: true,
  studio_discount: true,
  
  // Updates category
  app_updates: true,
  new_feature: true,
  calendar_feature: true,
  daw_integration: true,
  ui_refresh: true,
  
  // Events category
  open_mic: true,
  jam_session: true,
  networking_event: true,
  collaboration_invite: true,
  session_reminder: true,
  
  // Engagement category
  reengagement: true,
  trending_musicians: true,
  popular_genre: true,
  profile_views: true,
  unread_messages: true,
  
  // Collaboration category
  new_track: true,
  project_update: true,
  studio_session: true,
  remote_jam: true,
  track_sharing: true,
  
  // Discovery category
  new_musicians: true,
  trending_profiles: true,
  similar_interests: true,
  global_collab: true,
  new_performance: true,
  
  // Social category
  forum_activity: true,
  project_comment: true,
  performance_like: true,
  friend_joined: true,
  group_invite: true,
  
  // Retention category
  return_prompt: true,
  pending_response: true,
  feature_update: true,
  reconnect: true,
  special_event: true
};

class NotificationService {
  private settings: NotificationSettings;

  constructor() {
    // Initialize with default settings
    this.settings = { ...defaultSettings };
    // In a real app, we would load from AsyncStorage or another persistence mechanism
  }

  // Get all notification settings
  async getSettings(): Promise<NotificationSettings> {
    // In a real app, we would load from AsyncStorage here
    return this.settings;
  }

  // Update notification settings
  async saveSettings(settings: NotificationSettings): Promise<void> {
    this.settings = { ...settings };
    
    // In a real implementation, this would save to AsyncStorage or similar
    console.log('Saving notification settings:', this.settings);
    
    // Example AsyncStorage implementation:
    // await AsyncStorage.setItem('notificationSettings', JSON.stringify(this.settings));
  }

  // Request notification permissions (would use Expo's Notifications API in a real app)
  async requestPermissions(): Promise<boolean> {
    // In a real implementation, this would request permissions using Expo Notifications
    console.log('Requesting notification permissions');
    
    // Simulate successful permission request
    return true;
  }
}

// Export a singleton instance
export default new NotificationService();
