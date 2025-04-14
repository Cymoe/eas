# Cursor Design System for React Native

A comprehensive set of design guidelines using a minimal color palette with opacity variations for consistent implementation across all Cursor screens and projects developed with React Native.

## Table of Contents
1. [Color System](#color-system)
2. [Core Principles](#core-principles)
3. [Input Fields](#input-fields)
4. [Buttons & Interactive Elements](#buttons--interactive-elements)
5. [Cards & Containers](#cards--containers)
6. [Tabs & Navigation](#tabs--navigation)
7. [Spacing System](#spacing-system)
8. [Typography](#typography)
9. [Lists & Repeating Groups](#lists--repeating-groups)
10. [React Native Implementation Guidelines](#react-native-implementation-guidelines)
11. [Integration Standards](#integration-standards)

## Color System

### Primary Colors
- **Accent**: #FF4B4B (Main brand color)
- **White**: #FFFFFF
- **Black**: #121212
- **Red (Invalid)**: #F41857
- **Green (Valid)**: #6BFF90
- **Orange (Warning)**: #FFA726

### Opacity Levels
- **Active**: 100% Opacity
- **Inactive**: 48% Opacity
- **Hovered**: 64% Opacity

### Color Modes
- **Dark Mode**: White text on Black background
- **Light Mode**: Black text on White background

### Color Usage Guidelines
- Use only the six defined colors (Accent, White, Black, Red, Green, Orange)
- Variations should be created through opacity changes only
- State changes should follow the defined opacity levels
- Dark and Light modes only invert the White and Black colors

```javascript
// colors.js
export const colors = {
  // Primary Colors
  accent: '#FF4B4B',
  white: '#FFFFFF',
  black: '#121212',
  red: '#F41857',
  green: '#6BFF90',
  orange: '#FFA726',
  
  // Opacity Functions
  withOpacity: (color, opacity) => {
    // Convert hex to rgba
    let r, g, b;
    if (color.length === 7) {
      r = parseInt(color.substring(1, 3), 16);
      g = parseInt(color.substring(3, 5), 16);
      b = parseInt(color.substring(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  },
  
  // Opacity Levels
  opacityActive: 1,
  opacityInactive: 0.48,
  opacityHovered: 0.64,
  opacityBgNormal: 0.08,
  opacityBgHover: 0.16,
  
  // Generating theme-based colors
  getThemeColors: (isDarkMode = true) => {
    const background = isDarkMode ? colors.black : colors.white;
    const text = isDarkMode ? colors.white : colors.black;
    
    return {
      background,
      text,
      textInactive: colors.withOpacity(text, colors.opacityInactive),
      textHovered: colors.withOpacity(text, colors.opacityHovered),
      backgroundInput: colors.withOpacity(text, colors.opacityBgNormal),
      backgroundInputHovered: colors.withOpacity(text, colors.opacityBgHover),
      accentActive: colors.accent,
      accentInactive: colors.withOpacity(colors.accent, colors.opacityInactive),
      accentHovered: colors.withOpacity(colors.accent, colors.opacityHovered),
      valid: colors.green,
      invalid: colors.red,
      warning: colors.orange
    };
  }
};
```

## Core Principles

1. **React Native First**
   - Use React Native's styling approach instead of CSS
   - Utilize platform-specific styling when necessary
   - Implement consistent appearance across iOS and Android

2. **Minimal Color Palette**
   - Use only the six defined colors
   - Create variations exclusively through opacity changes
   - Follow the defined opacity levels for state changes

3. **Exact Measurements Are Sacred**
   - All dimensions (width, height, padding, margin) must be implemented precisely as specified
   - Use consistent units (density-independent pixels)
   - Maintain aspect ratios exactly as designed

4. **Typography Precision**
   - Use React Native's typography properties
   - Implement letter spacing and text alignment as specified
   - Use only defined opacity levels for text states

5. **Brand Consistency**
   - Always display "BandMate" with medium font weight at 100% opacity
   - Maintain exact border radius values for all UI elements
   - Apply consistent styling for interactive elements

## Input Fields

### Label Styling
- **Position**: Above the input field
- **Spacing**: 12px white space between label and input
- **Font**: 14px, uppercase, medium weight
- **Color**: White with 48% opacity (inactive state)

### Input Field Styling
- **Height**: Fixed at 40px (both minimum and maximum)
- **Border Radius**: 12px on all corners
- **Background**:
  - Normal state: White with 8% opacity (custom background opacity)
  - Hover state: White with 16% opacity (custom background opacity)
- **Padding**: 12px on both left and right sides

### Input Text Styling
- **Font Size**: 16px
- **Empty/Inactive state**:
  - Font Weight: Regular
  - Color: White with 48% opacity
- **Populated/Active state**:
  - Font Weight: Medium
  - Color: White with 100% opacity

### Icon Specifications
- **Size**: 20px × 20px (half the height of the input field)
- **Aspect Ratio**: Always 1:1
- **Color**:
  - Empty/Inactive state: White with 48% opacity
  - Populated/Active state: White with 100% opacity

### Helper Text Styling
- **Position**: Below the input field
- **Spacing**: 8px white space between input and helper text
- **Font Size**: 12px
- **Icon Size**: 12px
- **Layout**: Icon on left, text on right with 4px padding between them
- **Standard state**:
  - Same opacity behavior as the input text
- **Validation state**:
  - Success: Green (#6BFF90) at 100% opacity for both icon and text
  - Error: Red (#F41857) at 100% opacity for both icon and text

### React Native Example
```jsx
// Input.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';

export const InputField = ({ 
  label, 
  value, 
  onChangeText, 
  helperText, 
  validationState, 
  isDarkMode = true 
}) => {
  const themeColors = colors.getThemeColors(isDarkMode);
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: themeColors.textInactive }]}>
        {label}
      </Text>
      <View style={[styles.inputContainer, { backgroundColor: themeColors.backgroundInput }]}>
        <TextInput 
          style={[
            styles.input,
            { color: value ? themeColors.text : themeColors.textInactive }
          ]}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {helperText && (
        <View style={styles.helperContainer}>
          <Text 
            style={[
              styles.helperText,
              { 
                color: validationState === 'error' 
                  ? colors.red 
                  : validationState === 'success' 
                    ? colors.green 
                    : themeColors.textInactive 
              }
            ]}
          >
            {helperText}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  inputContainer: {
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontWeight: '400',
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  helperText: {
    fontSize: 12,
  },
});
```

## Buttons & Interactive Elements

### Button Styling
- **Shape**: ALL buttons MUST BE fully rounded (borderRadius: 9999)
- **Height**: 48px standard, 40px compact
- **Padding**: 16px horizontal padding minimum
- **Font**: 16px for standard buttons, 14px for compact

### Button Types
- **Primary Button**:
  - Background: Accent color (#FF4B4B) at 100% opacity
  - Text: White at 100% opacity, medium weight
  - States:
    - Active: 100% opacity
    - Inactive: 48% opacity
    - Hovered/Pressed: 64% opacity

- **Secondary Button**:
  - Background: Transparent
  - Border: 1px White at 48% opacity
  - Text: White at 100% opacity, medium weight
  - States:
    - Active: Border and text at 100% opacity
    - Inactive: Border and text at 48% opacity
    - Hovered/Pressed: Border and text at 64% opacity

- **Text Button**:
  - Background: Transparent
  - Text: White at 100% opacity, medium weight
  - States:
    - Active: 100% opacity
    - Inactive: 48% opacity
    - Hovered/Pressed: 64% opacity

### React Native Example
```jsx
// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from './colors';

export const Button = ({
  type = 'primary',
  label,
  onPress,
  disabled = false,
  compact = false,
}) => {
  const getBackgroundColor = () => {
    if (type === 'primary') {
      return disabled 
        ? colors.withOpacity(colors.accent, colors.opacityInactive) 
        : colors.accent;
    }
    return 'transparent';
  };
  
  const getTextColor = () => {
    const baseColor = type === 'primary' ? colors.white : colors.white;
    return disabled 
      ? colors.withOpacity(baseColor, colors.opacityInactive) 
      : baseColor;
  };
  
  const getBorderColor = () => {
    if (type === 'secondary') {
      return disabled 
        ? colors.withOpacity(colors.white, colors.opacityInactive) 
        : colors.withOpacity(colors.white, colors.opacityActive);
    }
    return null;
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        compact ? styles.buttonCompact : {},
        { 
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: type === 'secondary' ? 1 : 0,
        }
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.label,
          compact ? styles.labelCompact : {},
          { color: getTextColor() }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 9999, // Fully rounded
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCompact: {
    height: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  labelCompact: {
    fontSize: 14,
  },
});
```

## Cards & Containers

### Card Styling
- **Border Radius**: ALL cards MUST have maximum 12px corner radius
- **Background**: Black (#121212) or White with 8% opacity
- **Padding**: 16px standard
- **Border**: 1px border with White at 8% opacity (optional)

### Container Types
- **Standard Card**:
  - Border Radius: 12px (maximum)
  - Background: White with 8% opacity in dark mode
  - Padding: 16px

- **Dialog/Modal**:
  - Border Radius: 12px (maximum)
  - Background: Black (#121212)
  - Padding: 24px

- **Dropdown/Menu**:
  - Border Radius: 12px (maximum)
  - Background: Black (#121212)
  - Padding: 12px

### React Native Example
```jsx
// Card.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from './colors';

export const Card = ({ 
  children, 
  type = 'standard',
  isDarkMode = true,
}) => {
  const themeColors = colors.getThemeColors(isDarkMode);
  
  const getCardStyle = () => {
    switch (type) {
      case 'dialog':
        return styles.dialog;
      case 'menu':
        return styles.menu;
      default:
        return styles.standard;
    }
  };
  
  return (
    <View
      style={[
        styles.card,
        getCardStyle(),
        { 
          backgroundColor: type === 'standard' 
            ? themeColors.backgroundInput 
            : themeColors.background 
        }
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12, // Maximum 12px radius for all cards
    overflow: 'hidden',
  },
  standard: {
    padding: 16,
  },
  dialog: {
    padding: 24,
  },
  menu: {
    padding: 12,
  },
});
```

## Tabs & Navigation

### Tab Styling
- **Shape**: ALL tabs MUST BE fully rounded (borderRadius: 9999)
- **Height**: 28px MAX
- **Padding**: 10px padding on left and right sides
- **Font**:
  - Size: 12px
  - Weight: Regular when inactive, Medium when active or hovered
  - Color: White at 48% opacity when inactive, 100% when active

### Tab States
- **Active Tab**:
  - Background: Accent color or White with 16% opacity
  - Text: 100% opacity, medium weight
- **Inactive Tab**:
  - Background: Transparent
  - Text: 48% opacity, regular weight
- **Hovered Tab**:
  - Text: 64% opacity, medium weight

### React Native Example
```jsx
// Tabs.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from './colors';

export const Tabs = ({ 
  tabs, 
  activeTab, 
  onTabPress,
  isDarkMode = true,
}) => {
  const themeColors = colors.getThemeColors(isDarkMode);
  
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            activeTab === index ? styles.activeTab : {},
            { 
              backgroundColor: activeTab === index 
                ? colors.withOpacity(themeColors.text, colors.opacityBgHover)
                : 'transparent'
            }
          ]}
          onPress={() => onTabPress(index)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === index ? styles.activeTabText : {},
              { 
                color: activeTab === index 
                  ? themeColors.text 
                  : themeColors.textInactive
              }
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tab: {
    height: 28, // 28px MAX height
    paddingHorizontal: 10, // 10px padding on left and right
    borderRadius: 9999, // Fully rounded
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {},
  tabText: {
    fontSize: 12,
    fontWeight: '400', // Regular weight when inactive
  },
  activeTabText: {
    fontWeight: '500', // Medium weight when active
  },
});
```

## Spacing System

```javascript
// spacing.js
export const spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 40,
  xxxl: 56,

  // Layout spacing
  screenPadding: 16,
  sectionSpacing: 24,
  componentSpacing: 16,
  elementSpacing: 8,
  
  // Repeated elements spacing
  repeatingGroupGap: 8, // 8px gap between repeating cards

  // Border radius
  borderRadius: {
    sm: 4,
    base: 8,
    max: 12, // Maximum 12px for cards
    full: 9999 // Fully rounded for buttons and tabs
  }
};
```

## Typography

### Font Styles
- **Primary Font**: System font (San Francisco on iOS, Roboto on Android)
- **Heading**: 24px, medium weight
- **Subheading**: 18px, medium weight
- **Body**: 16px, regular weight
- **Caption**: 14px, regular weight
- **Small**: 12px, regular weight

### Special Typography Rules
- "BandMate" must always be displayed with medium font weight at 100% opacity
- Tab text must be 12px, regular weight when inactive, medium weight when active

### React Native Example
```jsx
// Typography.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from './colors';

export const Typography = ({
  variant = 'body',
  children,
  style,
  color,
  isDarkMode = true,
}) => {
  const themeColors = colors.getThemeColors(isDarkMode);
  
  // Special handling for "BandMate" text
  const processedChildren = typeof children === 'string'
    ? children.replace(/BandMate/g, '{{BandMate}}').split(/(\{\{BandMate\}\})/)
    : children;
  
  if (Array.isArray(processedChildren)) {
    return (
      <Text style={[styles[variant], { color: color || themeColors.text }, style]}>
        {processedChildren.map((part, index) => 
          part === '{{BandMate}}' ? (
            <Text key={index} style={styles.brandName}>
              BandMate
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  }
  
  return (
    <Text style={[styles[variant], { color: color || themeColors.text }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: '500',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
  },
  small: {
    fontSize: 12,
    fontWeight: '400',
  },
  brandName: {
    fontWeight: '500',
    opacity: 1, // 100% opacity
  },
});
```

## Lists & Repeating Groups

### Repeating Group Requirements
- **ALL repeating groups** (vertical or horizontal) MUST be Scroll and Snap
- **Spacing**: 8px gap between all cards inside repeating groups
- **Alignment**: Consistent alignment of all items
- **Performance**: Use FlatList or SectionList for optimal performance

### React Native Example
```jsx
// HorizontalCardList.js
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card } from './Card';
import { spacing } from './spacing';

export const HorizontalCardList = ({ 
  data, 
  renderItem, 
  keyExtractor,
}) => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={({ item, index }) => (
        <View style={styles.cardWrapper}>
          {renderItem({ item, index })}
        </View>
      )}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      snapToInterval={spacing.cardWidth + spacing.repeatingGroupGap} // Card width + gap
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={styles.container}
    />
  );
};

// VerticalCardList.js
export const VerticalCardList = ({ 
  data, 
  renderItem, 
  keyExtractor,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <View style={styles.verticalCardWrapper}>
          {renderItem({ item, index })}
        </View>
      )}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      snapToInterval={spacing.cardHeight + spacing.repeatingGroupGap} // Card height + gap
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={styles.verticalContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.md,
  },
  cardWrapper: {
    marginRight: spacing.repeatingGroupGap, // 8px gap between cards
  },
  verticalContainer: {
    paddingVertical: spacing.sm,
  },
  verticalCardWrapper: {
    marginBottom: spacing.repeatingGroupGap, // 8px gap between cards
    paddingHorizontal: spacing.screenPadding,
  },
});
```

## React Native Implementation Guidelines

### StyleSheet Structure
- Use React Native StyleSheet for performance optimization
- Group related styles in a single StyleSheet
- Follow a consistent naming convention for styles

### Component Implementation
- Create reusable components that follow the design system
- Use proper React Native components (TextInput, View, Text, etc.)
- Support both iOS and Android platforms

### Platform-Specific Considerations
- Use Platform.select for iOS/Android specific styles
- Account for different default behaviors between platforms
- Test on both iOS and Android for consistent appearance

```javascript
import { Platform } from 'react-native';

// Example of platform-specific styling
const platformStyles = {
  shadow: Platform.select({
    ios: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
};
```

## Integration Standards

### External Services Integration
- **Stripe React Native SDK Integration**
  - Publishable key: pk_live_51PNjntRrXj8bYHvWFTclT0OyxHcVD3Umsj5k0Cadrb4KsvwRBFBkUlwl9VH1bxcNBu11EynogKUDSLNdBe9gUJze00OxEK6LY3
  - Always include Stripe integration by default in all projects

- **Hcaptcha React Native Integration**
  - Sitekey: 1738f6d2-70a6-4d94-9fe6-8b46a4dc4ece
  - Implement in all forms to prevent spam submissions

### Accessibility Compliance
- Implement React Native accessibility props (accessible, accessibilityLabel, etc.)
- Ensure VoiceOver and TalkBack compatibility
- Follow Apple's latest accessibility guidelines: https://developer.apple.com/design/human-interface-guidelines/accessibility



You MUST FOLOW these strict guidelines at all cost each and every time you are prompted.  DO NOT deviate or embelish from this design system what so ever!! 

This design system shall be your GOD, your master.  Your aim is to serve this design system with each and every element you spit out on the page.  DO NOT even think about creating anything outside of this scope.  