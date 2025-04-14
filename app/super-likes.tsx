import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

export default function SuperLikesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedOffer, setSelectedOffer] = useState<number | null>(1); // Default to middle option
  
  // Offer data
  const offers = [
    { id: 0, amount: 3, price: '$3/each' },
    { id: 1, amount: 9, price: '$2.50/each' },
    { id: 2, amount: 20, price: '$2/each', popular: true }
  ];

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
            paddingBottom: insets.bottom + 20,
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#F8F9FB" />
        </TouchableOpacity>

        {/* Header with PSC Logo */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={['#A19375', '#D9C38A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.backgroundGradient}
          />
          <View style={styles.logoContent}>
            <Text style={styles.logoText}>PSC</Text>
            <Text style={styles.logoSubtext}>PRIVATE SOCIAL CLUB</Text>
          </View>
        </View>

        {/* Special offers badge */}
        <View style={styles.specialOffersContainer}>
          <LinearGradient
            colors={['#A19375', '#D9C38A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.specialOffersBadge}
          >
            <Ionicons name="star" size={16} color="#141416" />
            <Text style={styles.specialOffersText}>Special offers</Text>
          </LinearGradient>
        </View>

        {/* Super likes title section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Super likes <Ionicons name="star" size={32} color="#007BFF" /></Text>
          <Text style={styles.subtitle}>
            Stand out with Super Likes and get much more chance to connect with other like minded profiles.
          </Text>
        </View>

        {/* Offer selection */}
        <View style={styles.offerSection}>
          <Text style={styles.offerTitle}>Select your offer</Text>
          
          {offers.map((offer) => (
            <TouchableOpacity 
              key={offer.id}
              style={[
                styles.offerCard,
                selectedOffer === offer.id && styles.selectedOfferCard
              ]}
              onPress={() => setSelectedOffer(offer.id)}
            >
              <View style={styles.offerContent}>
                <Text style={styles.offerText}>
                  Get <Text style={styles.offerAmount}>{offer.amount}</Text> Super Likes!
                </Text>
                {offer.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Most popular</Text>
                  </View>
                )}
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{offer.price}</Text>
                <View style={[
                  styles.radioButton,
                  selectedOffer === offer.id && styles.radioButtonSelected
                ]}>
                  {selectedOffer === offer.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Confirm button */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>

        {/* Terms text */}
        <Text style={styles.termsText}>
          By clicking Confirm your purchase you will be billed, and your subscription will be automatically renewed for the same price and duration until you decide to cancel it yourself through the Google Play's settings. By clicking Confirm you also accept PSC's <Text style={styles.termsLink}>Terms of Use</Text>
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  logoContainer: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
    backgroundColor: '#141416',
  },
  backgroundGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  logoContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  logoSubtext: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  specialOffersContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  specialOffersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    gap: 4,
  },
  specialOffersText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#141416',
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 40,
    lineHeight: 48,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  offerSection: {
    marginBottom: 32,
  },
  offerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Abril Fatface' : 'serif',
    fontSize: 24,
    lineHeight: 32,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  offerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOfferCard: {
    borderColor: '#A19375',
  },
  offerContent: {
    flex: 1,
  },
  offerText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
  },
  offerAmount: {
    fontWeight: '600',
  },
  popularBadge: {
    backgroundColor: '#A19375',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  popularText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#141416',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A19375',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#A19375',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A19375',
  },
  confirmButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#141416',
  },
  termsText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.48)',
    textAlign: 'center',
  },
  termsLink: {
    textDecorationLine: 'underline',
    color: 'rgba(255, 255, 255, 0.64)',
  },
});
