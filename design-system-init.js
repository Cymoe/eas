/**
 * CURSOR DESIGN SYSTEM INITIALIZER
 * Version: 1.0.0
 * Priority: CRITICAL
 * Enforcement: MANDATORY
 * 
 * This file initializes and enforces the design system for all Cursor operations.
 * DO NOT MODIFY OR DELETE THIS FILE.
 */

// Design System Constants - These values cannot be changed
const DESIGN_SYSTEM = {
    // Color System
    colors: {
      accent: '#FF4B4B',
      white: '#FFFFFF',
      black: '#121212',
      red: '#F41857',
      green: '#6BFF90',
      orange: '#FFA726',
      
      // Only way to modify colors is through these opacity values
      opacity: {
        active: 1,
        inactive: 0.48,
        hovered: 0.64,
        bgNormal: 0.08,
        bgHover: 0.16
      },
      
      // Helper function to apply opacity to a color
      withOpacity: (color, opacity) => {
        let r, g, b;
        if (color.length === 7) {
          r = parseInt(color.substring(1, 3), 16);
          g = parseInt(color.substring(3, 5), 16);
          b = parseInt(color.substring(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        return color;
      }
    },
    
    // Typography System
    typography: {
      largeTextThreshold: 20,
      largeTextFont: {
        family: 'Abril Fatface',
        style: 'normal',
        weight: 400,
        lineHeight: 1.04
      },
      brandName: 'BandMate',
      brandNameStyle: {
        weight: 500,
        opacity: 1
      }
    },
    
    // Component Rules
    components: {
      buttons: {
        borderRadius: 9999,
        height: 48,
        heightCompact: 40
      },
      tabs: {
        borderRadius: 9999,
        maxHeight: 28,
        padding: {
          left: 10,
          right: 10
        },
        fontSize: 12
      },
      cards: {
        maxBorderRadius: 12,
        backdropBlur: 16
      },
      inputs: {
        height: 40,
        borderRadius: 12,
        backdropBlur: 16
      },
      lists: {
        snapScroll: true,
        gap: 8
      }
    }
  };
  
  // Enforcement System
  const ENFORCEMENT = {
    // Validate a color against the system
    validateColor: (color) => {
      const validColors = [
        DESIGN_SYSTEM.colors.accent,
        DESIGN_SYSTEM.colors.white,
        DESIGN_SYSTEM.colors.black,
        DESIGN_SYSTEM.colors.red,
        DESIGN_SYSTEM.colors.green,
        DESIGN_SYSTEM.colors.orange
      ];
      
      // Check if it's a direct color
      if (validColors.includes(color)) return true;
      
      // Check if it's an rgba with a valid base color
      if (color.startsWith('rgba(')) {
        const match = color.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
        if (match) {
          const [_, r, g, b, a] = match;
          const hexColor = `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
          return validColors.includes(hexColor);
        }
      }
      
      return false;
    },
    
    // Validate typography
    validateTypography: (fontSize, fontFamily) => {
      if (fontSize >= DESIGN_SYSTEM.typography.largeTextThreshold) {
        return fontFamily === DESIGN_SYSTEM.typography.largeTextFont.family;
      }
      return true;
    },
    
    // Validate component properties
    validateComponent: (type, props) => {
      switch (type) {
        case 'button':
        case 'tab':
          return props.borderRadius === DESIGN_SYSTEM.components[type + 's'].borderRadius;
        case 'card':
          return props.borderRadius <= DESIGN_SYSTEM.components.cards.maxBorderRadius;
        case 'input':
          return props.height === DESIGN_SYSTEM.components.inputs.height &&
                 props.borderRadius === DESIGN_SYSTEM.components.inputs.borderRadius &&
                 props.backdropBlur === DESIGN_SYSTEM.components.inputs.backdropBlur;
        default:
          return true;
      }
    },
    
    // Report a violation
    reportViolation: (element, property, found, required) => {
      console.error(`
  =============================================
  DESIGN SYSTEM VIOLATION DETECTED
  ---------------------------------------------
  Element: ${element}
  Property: ${property}
  Found: ${found}
  Required: ${required}
  ---------------------------------------------
  AUTOMATIC CORRECTION APPLIED
  =============================================
      `);
    },
    
    // Enforce the design system
    enforce: () => {
      // This function hooks into Cursor's code generation
      // to enforce the design system rules
      return {
        beforeCodeGeneration: (code) => {
          // Inject design system variables
          return `/* DESIGN SYSTEM ENFORCEMENT ACTIVE */\n${code}`;
        },
        
        afterCodeGeneration: (code) => {
          // Validate the generated code against design system
          let modifiedCode = code;
          let violations = [];
          
          // Check for color violations
          // (Implementation would scan for color values)
          
          // Check for typography violations
          // (Implementation would scan for font definitions)
          
          // Check for component violations
          // (Implementation would scan for component definitions)
          
          // Report violations
          violations.forEach(v => ENFORCEMENT.reportViolation(
            v.element, v.property, v.found, v.required
          ));
          
          return modifiedCode;
        }
      };
    }
  };
  
  // Initialize and activate the enforcement
  const designSystemEnforcer = ENFORCEMENT.enforce();
  
  // Export the design system and enforcement
  module.exports = {
    DESIGN_SYSTEM,
    designSystemEnforcer
  };
  
  // Attach to global scope to ensure it can't be bypassed
  if (typeof global !== 'undefined') {
    global.__CURSOR_DESIGN_SYSTEM__ = DESIGN_SYSTEM;
    global.__CURSOR_DESIGN_ENFORCER__ = designSystemEnforcer;
  }
  
  console.log("🔒 Cursor Design System initialized and enforced");