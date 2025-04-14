import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface FilterChipProps {
  label: string;
  selected?: boolean;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, selected = false }) => (
  <View style={[styles.chip, selected && styles.selectedChip]}>
    <Text style={[styles.chipLabel, selected && styles.selectedChipLabel]}>{label}</Text>
  </View>
);

interface RangeSliderProps {
  minLabel: string;
  maxLabel: string;
  infoText: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ minLabel, maxLabel, infoText }) => (
  <View style={styles.rangeSliderContainer}>
    <View style={styles.sliderTrack}>
      <View style={styles.sliderFill} />
      <View style={[styles.sliderThumb, { left: 18 }]} />
      <View style={[styles.sliderThumb, { left: 172 }]} />
    </View>
    <View style={styles.sliderLabels}>
      <Text style={styles.sliderLabel}>{minLabel}</Text>
      <Text style={styles.sliderLabel}>{maxLabel}</Text>
    </View>
    <View style={styles.sliderInfoContainer}>
      <Ionicons name="information-circle-outline" size={12} color="#FFFFFF" style={{ opacity: 0.48 }} />
      <Text style={styles.sliderInfoText}>{infoText}</Text>
    </View>
  </View>
);

interface ToggleOptionProps {
  label: string;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ label }) => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Switch
        trackColor={{ false: '#313131', true: '#FF3B30' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#313131"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
    </View>
  );
};

export default function FiltersScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Modal Handle */}
      <View style={styles.modalHandle} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <View style={styles.filterCountBadge}>
            <Text style={styles.filterCountText}>3</Text>
          </View>
          <Text style={styles.headerTitle}>filters</Text>
        </View>
        
        <TouchableOpacity>
          <Text style={styles.resetText}>reset all</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.divider} />
        
        {/* I'm looking for section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I'm looking for</Text>
          <ToggleOption label="Solo Artists" />
          <ToggleOption label="Bands" />
        </View>
        
        <View style={styles.divider} />
        
        {/* For section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>For</Text>
          <View style={styles.chipRow}>
            <FilterChip label="Jam Sessions" />
            <FilterChip label="Studio time" />
            <FilterChip label="Band members" />
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Music style section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Music style</Text>
          <View style={styles.chipRow}>
            <FilterChip label="Blues" />
            <FilterChip label="Rock" />
            <FilterChip label="Soul" />
          </View>
        </View>
        
        <View style={styles.divider} />
        
        {/* Instruments section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instruments</Text>
          <View style={styles.chipGrid}>
            <FilterChip label="Bass" />
            <FilterChip label="Drums" />
            <FilterChip label="Drums" />
            <FilterChip label="Guitar" />
            <FilterChip label="Piano" selected={true} />
            <FilterChip label="Trumpet" />
            <FilterChip label="Violin" />
            <FilterChip label="Vocals" />
            <FilterChip label="Other" />
          </View>
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        {/* Experience Level section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience Level</Text>
          <ToggleOption label="Beginner" />
          <ToggleOption label="Intermediate" />
          <ToggleOption label="Advanced" />
          <ToggleOption label="Professional" />
        </View>
        
        <View style={styles.divider} />
        
        {/* Distance range section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distance range</Text>
          <RangeSlider 
            minLabel="3 km" 
            maxLabel="50 km" 
            infoText="Only meet and be visible to people within that range."
          />
        </View>
        
        <View style={styles.divider} />
        
        {/* Age range section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age range</Text>
          <RangeSlider 
            minLabel="18 yrs" 
            maxLabel="48 yrs" 
            infoText="Only meet and be visible to people within that range."
          />
        </View>
        
        <View style={styles.divider} />
        
        {/* Availability section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.chipRow}>
            <FilterChip label="Weekdays" />
            <FilterChip label="Weekends" />
          </View>
        </View>
        
        {/* Bottom action button - now inside ScrollView but keeping original style */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.discoverButton} onPress={() => router.back()}>
            <Text style={styles.discoverButtonText}>Discover 83+ Profiles</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  modalHandle: {
    width: 36,
    height: 5,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(38, 38, 38, 0.64)',
    backdropFilter: 'blur(16px)',
    zIndex: 10,
  },
  backButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterCountBadge: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterCountText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#121212',
    textAlign: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  resetText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#FF3B30',
  },
  scrollView: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#262626',
    width: '100%',
  },
  section: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 21,
    letterSpacing: -0.5,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleLabel: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.5,
    color: 'rgba(255, 255, 255, 0.64)',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: '#313131',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: '#FFFFFF',
  },
  chipLabel: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  selectedChipLabel: {
    color: '#121212',
  },
  seeMoreButton: {
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  seeMoreText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  rangeSliderContainer: {
    paddingVertical: 10,
  },
  sliderTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    position: 'absolute',
    height: 4,
    width: 154,
    left: 24,
    backgroundColor: '#FFFFFF',
  },
  sliderThumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    top: -4,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 17,
    color: '#DEDEDE',
    opacity: 0.6,
  },
  sliderInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    opacity: 0.48,
  },
  sliderInfoText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  bottomContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'rgba(18, 18, 18, 0.64)',
    backdropFilter: 'blur(16px)',
  },
  discoverButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 64,
    justifyContent: 'center',
    alignItems: 'center',
    width: 312,
    height: 56,
  },
  discoverButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: '#000000',
    textAlign: 'center',
  },
});
