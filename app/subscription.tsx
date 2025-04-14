import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Dimensions, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface FeatureItemProps {
  text: string;
}

interface PlanProps {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  isExclusive?: boolean;
  description?: string;
}

const SubscriptionScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<'my' | 'others'>('my');
  
  const horizontalPadding = 12;
  const contentWidth = Math.min(351, windowWidth - (horizontalPadding * 2));

  const myPlan: PlanProps = {
    name: 'Starter',
    price: 'Free',
    features: [
      '10 likes',
      '1 Superlike per day',
      'Full profile customization',
      'Advanced Filters',
      'No rewind',
      'Ad included'
    ]
  };

  const otherPlans: PlanProps[] = [
    {
      name: 'Silver',
      price: '$9.90/month',
      features: [
        '25 likes',
        '5 Superlikes per day',
        '3 Rewinds per day',
        'Full profile customization',
        'Manage who can view your profile',
        'Manage which profile you want to see',
        'Advanced Filters',
        'Ad-free experience'
      ]
    },
    {
      name: 'Gold',
      price: '$16.90/month',
      features: [
        '50 likes',
        '10 rewinds',
        '10 Super likes',
        'Cosmopolitan Pass',
        'Full profile customization',
        'Manage who can view your profile',
        'Manage which profile you want to see',
        'Ad-free experience'
      ]
    },
    {
      name: 'Platinum',
      price: '$29.90/month',
      isPopular: true,
      features: [
        'Unlimited likes',
        'Unlimited rewinds',
        'Unlimited Superlikes',
        'Cosmopolitan Pass',
        'Full profile customization',
        'Unlock picture and GIF sharing',
        'Know when someone\'s read your messages',
        'Set your online status',
        'Set custom background colors for your DM',
        'Hide seen on messages',
        'Manage who can view your profile',
        'View matching score',
        'Manage which profile you want to see',
        'Analytics',
        'Ad-free experience'
      ]
    },
    {
      name: 'Pro',
      price: '$200.00/month',
      isExclusive: true,
      description: 'Match with industry professionals. Access a restricted circles of the top tier of music industry.',
      features: [
        'Unlimited likes',
        'Unlimited rewinds',
        'Unlimited Superlikes',
        'Cosmopolitan Pass',
        'Full profile customization',
        'Unlock picture and GIF sharing',
        'Know when someone\'s read your messages',
        'Set your online status',
        'Set custom background colors for your DM',
        'Hide seen on messages',
        'Manage who can view your profile',
        'View matching score',
        'Manage which profile you want to see',
        'Analytics',
        'Ad-free experience'
      ]
    }
  ];

  const PlanCard = ({ plan }: { plan: PlanProps }) => (
    <View style={styles.planCard}>
      <View style={styles.planHeader}>
        <View style={styles.planTitleContainer}>
          <Text style={styles.planName}>{plan.name}</Text>
          {plan.isPopular && (
            <View style={[styles.badge, { backgroundColor: '#EFE347' }]}>
              <Text style={[styles.badgeText, { color: '#141416' }]}>Most popular</Text>
            </View>
          )}
          {plan.isExclusive && (
            <View style={[styles.badge, { backgroundColor: '#0070BE' }]}>
              <Text style={[styles.badgeText, { color: '#141416' }]}>Exclusive Program</Text>
            </View>
          )}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{plan.price}</Text>
          <View style={styles.radioButton} />
        </View>
      </View>
      
      {plan.description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{plan.description}</Text>
        </View>
      )}

      <View style={styles.featureList}>
        {plan.features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </View>
    </View>
  );

  const renderContent = () => {
    if (activeTab === 'my') {
      return (
        <>
          <Text style={styles.planTitle}>Your current plan</Text>
          <PlanCard plan={myPlan} />
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel your plan</Text>
          </TouchableOpacity>
        </>
      );
    }

    return (
      <>
        <Text style={styles.planTitle}>Select your offer</Text>
        {otherPlans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </>
    );
  };

  return (
    <LinearGradient
      colors={['#141416', '#000000']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
            paddingBottom: insets.bottom + 20,
            width: windowWidth,
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={[styles.backButton, { left: horizontalPadding + 12 }]}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#F8F9FB" />
        </TouchableOpacity>

        {/* Logo and Title */}
        <View style={[styles.header, { width: contentWidth }]}>
          <View style={styles.logoContainer}>
            <Ionicons name="musical-notes" size={32} color="#F8F9FB" />
          </View>
          <Text style={styles.title}>BandMate</Text>
        </View>

        {/* Subscription Content */}
        <View style={[styles.content, { width: contentWidth }]}>
          <View style={styles.titleSection}>
            <Text style={styles.sectionTitle}>Subscriptions</Text>
            <Text style={styles.subtitle}>
              Stand out with Super Likes and get much more chance to connect with other like minded profiles.
            </Text>
          </View>

          {/* Tab Buttons */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={activeTab === 'my' ? styles.activeTab : styles.inactiveTab}
              onPress={() => setActiveTab('my')}
            >
              <Ionicons name="people" size={16} color={activeTab === 'my' ? "#141416" : "#F8F9FB"} />
              <Text style={activeTab === 'my' ? styles.activeTabText : styles.inactiveTabText}>My plan</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={activeTab === 'others' ? styles.activeTab : styles.inactiveTab}
              onPress={() => setActiveTab('others')}
            >
              <Ionicons name="people" size={16} color={activeTab === 'others' ? "#141416" : "#F8F9FB"} />
              <Text style={activeTab === 'others' ? styles.activeTabText : styles.inactiveTabText}>Others plans</Text>
            </TouchableOpacity>
          </View>

          {/* Plan Selection */}
          {renderContent()}

          <View style={styles.divider} />

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Offer to someone</Text>
            </TouchableOpacity>
          </View>

          {/* Copyright */}
          <Text style={styles.copyright}>
            ©2025 Sola Group. All rights reserved. Sola Group, SG, the Sola Group logo, BandMate, BandMate (stylized), BM, BM logo are trademarks or registered of Sola Group in the USA and elsewhere. All other trademarks are the property of their respective owners.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const FeatureItem = ({ text }: FeatureItemProps) => (
  <View style={styles.featureItem}>
    <View style={styles.bullet} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 120,
    alignItems: 'center',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 56,
    zIndex: 2,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logoContainer: {
    width: 74,
    height: 64,
    borderRadius: 100,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 32,
    lineHeight: 43,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    alignItems: 'stretch',
  },
  titleSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 40,
    lineHeight: 54,
    color: '#F8F9FB',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 18,
    color: '#828186',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    height: 48,
  },
  activeTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FB',
    borderRadius: 100,
    marginRight: 2,
  },
  inactiveTab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#141416',
    borderWidth: 1,
    borderColor: '#141416',
    borderRadius: 100,
    marginLeft: 2,
  },
  activeTabText: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#141416',
    marginLeft: 8,
  },
  inactiveTabText: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#F8F9FB',
    marginLeft: 8,
  },
  planTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 18,
    lineHeight: 24,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#141416',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#262626',
    padding: 16,
    marginBottom: 8,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planTitleContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  planName: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    color: '#F8F9FB',
  },
  badge: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: 'Poppins',
    fontSize: 8,
    fontWeight: '500',
    lineHeight: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 14,
    lineHeight: 19,
    color: '#F8F9FB',
    marginRight: 8,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: '#141416',
    borderWidth: 1,
    borderColor: '#262626',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(199, 157, 109, 0.16)',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
  },
  descriptionText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 21,
    color: '#FFFFFF',
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 100,
    backgroundColor: '#828186',
    marginRight: 4,
  },
  featureText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 21,
    color: '#828186',
  },
  cancelButton: {
    height: 56,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#EE1045',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 24,
    marginTop: 24,
  },
  cancelButtonText: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 18,
    lineHeight: 24,
    color: '#EE1045',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#262626',
    marginBottom: 24,
  },
  buttonGroup: {
    marginBottom: 24,
  },
  confirmButton: {
    height: 56,
    backgroundColor: '#F8F9FB',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  confirmButtonText: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 18,
    lineHeight: 24,
    color: '#141416',
    textAlign: 'center',
  },
  offerButton: {
    height: 56,
    backgroundColor: '#262626',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  offerButtonText: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 18,
    lineHeight: 24,
    color: '#F8F9FB',
    textAlign: 'center',
  },
  copyright: {
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 12,
    color: '#828186',
    textAlign: 'center',
  },
});

export default SubscriptionScreen; 