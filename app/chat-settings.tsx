import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Switch,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';
import RemoveMatchModal from '../components/RemoveMatchModal';
import ReportMusicianModal from '../components/ReportMusicianModal';

// Define a type for valid Ionicons names
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const TagButton = ({ label, isSelected, onPress }: { label: string, isSelected?: boolean, onPress: () => void }) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={[
      styles.tagButton,
      isSelected && styles.tagButtonSelected
    ]}
  >
    <Text style={[
      styles.tagButtonText,
      isSelected && styles.tagButtonTextSelected
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const MediaButton = ({ icon, onPress }: { icon: IoniconsName, onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.mediaButton}>
    <Ionicons name={icon} size={24} color="#FFFFFF" />
  </TouchableOpacity>
);

const SettingToggle = ({ 
  label, 
  sublabel, 
  value, 
  onValueChange, 
  iconName, 
  isPremium = false,
  premiumText = "Only with Silver"
}: {
  label: string;
  sublabel?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  iconName: IoniconsName;
  isPremium?: boolean;
  premiumText?: string;
}) => (
  <View style={styles.settingToggle}>
    <View style={styles.settingContent}>
      {isPremium && (
        <Text style={styles.starIcon}>★</Text>
      )}
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <Switch
      trackColor={{ false: 'rgba(38, 38, 38, 0.64)', true: '#FF3B30' }}
      thumbColor="#FFFFFF"
      ios_backgroundColor="rgba(38, 38, 38, 0.64)"
      onValueChange={onValueChange}
      value={value}
      style={styles.settingSwitch}
    />
    {isPremium && (
      <Text style={styles.premiumText}>{premiumText}</Text>
    )}
  </View>
);

const ActionItem = ({ 
  icon, 
  label, 
  showChevron = false, 
  isPremium = false,
  onPress 
}: {
  icon: IoniconsName;
  label: string;
  showChevron?: boolean;
  isPremium?: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={styles.actionItemLeft}>
      {isPremium ? (
        <Text style={styles.starIcon}>★</Text>
      ) : (
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#FF3B30" />
        </View>
      )}
      <Text style={styles.actionItemLabel}>{label}</Text>
    </View>
    {showChevron && (
      <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
    )}
  </TouchableOpacity>
);

export default function ChatSettingsScreen() {
  const [musicStyles, setMusicStyles] = useState({
    blues: true,
    jazz: true,
    soul: true,
    rock: true
  });
  
  const [settings, setSettings] = useState({
    markAsFavorite: true,
    scheduledMessages: false,
    blockLinks: true,
    blockMedia: true,
    blockCopying: true,
    blockScreenshots: true,
    disappearingMessages: true,
    hideLastSeen: false,
    hideReadStatus: false,
    secureWithPin: true,
    darkMode: true,
    blockMusician: true
  });

  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const toggleMusicStyle = (style: keyof typeof musicStyles) => {
    setMusicStyles(prev => ({
      ...prev,
      [style]: !prev[style]
    }));
  };

  const handleRemoveMatch = () => {
    // Logic to remove the match would go here
    setRemoveModalVisible(false);
    // Optionally navigate back or show a confirmation
  };

  const handleReportMusician = () => {
    // Logic to report the musician would go here
    setReportModalVisible(false);
    // Optionally navigate to a reason selection screen or show a confirmation
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerSubtitleContainer}>
            <Text style={styles.headerSubtitle}>⚙️ Manage your match</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Music Styles Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>MUSIC STYLES</Text>
            <Text style={styles.sectionCount}>4</Text>
          </View>
          
          <View style={styles.tagsContainer}>
            <TagButton 
              label="Blues" 
              isSelected={musicStyles.blues}
              onPress={() => toggleMusicStyle('blues')}
            />
            <TagButton 
              label="Jazz" 
              isSelected={musicStyles.jazz}
              onPress={() => toggleMusicStyle('jazz')}
            />
            <TagButton 
              label="Soul" 
              isSelected={musicStyles.soul}
              onPress={() => toggleMusicStyle('soul')}
            />
            <TagButton 
              label="Rock" 
              isSelected={musicStyles.rock}
              onPress={() => toggleMusicStyle('rock')}
            />
          </View>
        </View>
        
        {/* Shared Media Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SHARED MEDIA</Text>
            <Text style={styles.sectionCount}>12</Text>
          </View>
          
          <View style={styles.mediaGrid}>
            <MediaButton icon="image" onPress={() => {}} />
            <MediaButton icon="musical-notes" onPress={() => {}} />
            <MediaButton icon="document-text" onPress={() => {}} />
            <MediaButton icon="link" onPress={() => {}} />
          </View>
        </View>
        
        {/* Communication Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COMMUNICATION</Text>
          
          <SettingToggle
            label="Mark as favorite"
            iconName="star"
            value={settings.markAsFavorite}
            onValueChange={() => toggleSetting('markAsFavorite')}
            isPremium={true}
          />
          
          <TouchableOpacity style={styles.actionItem} onPress={() => {}}>
            <View style={styles.actionItemLeft}>
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
              </View>
              <Text style={styles.actionItemLabel}>Scheduled messages</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {/* Privacy & Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIVACY & SECURITY</Text>
          
          <SettingToggle
            label="Block sharing links"
            iconName="link"
            value={settings.blockLinks}
            onValueChange={() => toggleSetting('blockLinks')}
            isPremium={false}
          />
          
          <SettingToggle
            label="Block sharing media"
            iconName="image"
            value={settings.blockMedia}
            onValueChange={() => toggleSetting('blockMedia')}
            isPremium={false}
          />
          
          <SettingToggle
            label="Block copying"
            iconName="copy"
            value={settings.blockCopying}
            onValueChange={() => toggleSetting('blockCopying')}
            isPremium={false}
          />
          
          <SettingToggle
            label="Block screenshots"
            iconName="phone-portrait"
            value={settings.blockScreenshots}
            onValueChange={() => toggleSetting('blockScreenshots')}
            isPremium={false}
          />
          
          <SettingToggle
            label="Disappearing messages"
            sublabel="• Disappears after being read"
            iconName="time"
            value={settings.disappearingMessages}
            onValueChange={() => toggleSetting('disappearingMessages')}
            isPremium={false}
          />
          
          <SettingToggle
            label="Hide last seen"
            sublabel="• Only with Silver"
            iconName="eye-off"
            value={settings.hideLastSeen}
            onValueChange={() => toggleSetting('hideLastSeen')}
            isPremium={true}
          />
          
          <SettingToggle
            label="Hide read status"
            sublabel="• Only with Silver"
            iconName="checkmark-done"
            value={settings.hideReadStatus}
            onValueChange={() => toggleSetting('hideReadStatus')}
            isPremium={true}
          />
          
          <SettingToggle
            label="Secure with PIN code"
            iconName="lock-closed"
            value={settings.secureWithPin}
            onValueChange={() => toggleSetting('secureWithPin')}
            isPremium={true}
          />
        </View>
        
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APPEARANCE</Text>
          
          <SettingToggle
            label="Dark Mode"
            iconName="moon"
            value={settings.darkMode}
            onValueChange={() => toggleSetting('darkMode')}
            isPremium={false}
          />
          
          <ActionItem
            icon="color-palette"
            label="Theme"
            showChevron={true}
            isPremium={true}
            onPress={() => router.push('/theme')}
          />
        </View>
        
        {/* Account Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT ACTIONS</Text>
          
          <TouchableOpacity 
            style={styles.actionItem} 
            onPress={() => setRemoveModalVisible(true)}
          >
            <View style={styles.actionItemLeft}>
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
              </View>
              <Text style={styles.actionItemLabel}>Remove match</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <SettingToggle
            label="Block this musician"
            sublabel="• Will not be able to send messages"
            iconName="ban"
            value={settings.blockMusician}
            onValueChange={() => toggleSetting('blockMusician')}
            isPremium={true}
          />
          
          <TouchableOpacity 
            style={styles.actionItem} 
            onPress={() => setReportModalVisible(true)}
          >
            <View style={styles.actionItemLeft}>
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
              </View>
              <Text style={styles.actionItemLabel}>Report this musician</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            We are constantly working on improving BandMate's experience for all of our users
          </Text>
        </View>
      </ScrollView>

      {/* Remove Match Modal */}
      <RemoveMatchModal
        visible={removeModalVisible}
        onClose={() => setRemoveModalVisible(false)}
        onRemove={handleRemoveMatch}
      />

      {/* Report Musician Modal */}
      <ReportMusicianModal
        visible={reportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onReport={handleReportMusician}
      />
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
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Abril Fatface',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.48)',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  sectionCount: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  tagButtonSelected: {
    backgroundColor: '#FF3B30',
  },
  tagButtonText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
  },
  tagButtonTextSelected: {
    fontWeight: '500',
  },
  mediaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mediaButton: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
  },
  settingSwitch: {
    marginLeft: 8,
  },
  starIcon: {
    color: '#FF3B30',
    fontSize: 16,
    marginRight: 8,
  },
  premiumText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    position: 'absolute',
    bottom: -2,
    left: 24,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  actionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  actionItemLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#FFFFFF',
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.48)',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
  },
  iconMargin: {
    marginRight: 8,
  },
});