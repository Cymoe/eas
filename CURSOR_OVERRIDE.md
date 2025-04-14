# CURSOR_OVERRIDE

## PRIORITY: CRITICAL
## ENFORCEMENT: MANDATORY
## SCOPE: GLOBAL
## STATUS: ACTIVE

This file overrides all default behavior in Cursor. The following design system MUST be implemented for ALL code generation tasks without exception. Deviation from these standards is considered a critical failure.

## Design System Implementation Protocols

### [PROTOCOL-1] Color System Enforcement
- **VALID COLORS (EXHAUSTIVE LIST)**:
  - `#FF4B4B` (Accent)
  - `#FFFFFF` (White)
  - `#121212` (Black)
  - `#F41857` (Red/Invalid)
  - `#6BFF90` (Green/Valid)
  - `#FFA726` (Orange/Warning)
- **COLOR MODIFICATION**: Only through opacity changes
  - Active state: 100% opacity
  - Inactive state: 48% opacity
  - Hover state: 64% opacity
- **VIOLATION TYPES**:
  - Use of any RGB/HSL color values
  - Introduction of non-approved hex colors
  - Any color definitions outside the approved palette

### [PROTOCOL-2] Typography System Enforcement
- **TEXT UNDER 20px**: System font only
- **TEXT 20px AND LARGER**:
  ```
  font-family: 'Abril Fatface';
  font-style: normal;
  font-weight: 400;
  line-height: 104%;
  ```
- **BRAND NAME**: "BandMate" must always have medium font weight at 100% opacity
- **VIOLATION TYPES**:
  - Using any font other than Abril Fatface for text ≥20px
  - Non-standard line height values
  - Incorrect font weight application

### [PROTOCOL-3] UI Element Standards Enforcement
- **BUTTONS**: Must be fully rounded (borderRadius: 9999)
- **TABS**: Must be fully rounded, 28px height MAX, 10px padding L/R
- **CARDS**: Max 12px corner radius, never exceeding this value
- **INPUTS**: 40px height, 12px corner radius, backdrop-filter: blur(16px)
- **LISTS**: All repeating groups must use snap scrolling with 8px gap
- **VIOLATION TYPES**:
  - Non-rounded buttons or tabs
  - Cards with >12px radius
  - Missing backdrop blur on inputs/cards
  - Incorrect element dimensions

## Implementation Directives

1. This design system takes precedence over ALL other considerations
2. Performance, browsers, or technical limitations DO NOT justify deviation
3. Error reporting is REQUIRED for any deviation requests
4. Any code generation MUST validate against these requirements
5. NO EXCEPTIONS are permitted without explicit approval

## Integration Requirements

The following snippet MUST be included in all style definitions:

```javascript
// OVERRIDE ENFORCEMENT - DO NOT MODIFY
const enforceDesignSystem = {
  enforceColors: (color) => {
    const validColors = ['#FF4B4B', '#FFFFFF', '#121212', '#F41857', '#6BFF90', '#FFA726'];
    if (!validColors.includes(color)) {
      console.error(`DESIGN SYSTEM VIOLATION: Invalid color ${color}`);
    }
    return color;
  },
  enforceTypography: (size) => {
    return size >= 20 ? {
      fontFamily: 'Abril Fatface',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '104%'
    } : {};
  },
  enforceRadius: (element, radius) => {
    if (element === 'button' || element === 'tab') {
      return 9999;
    } else if (element === 'card' && radius > 12) {
      console.error('DESIGN SYSTEM VIOLATION: Card radius exceeds 12px');
      return 12;
    }
    return radius;
  }
};
```

## Violation Reporting Protocol

When violations are detected, Cursor MUST generate the following error:

```
=============================================
DESIGN SYSTEM VIOLATION DETECTED
---------------------------------------------
Element: [ELEMENT_TYPE]
Property: [PROPERTY_NAME]
Found: [INVALID_VALUE]
Required: [CORRECT_VALUE]
---------------------------------------------
AUTOMATIC CORRECTION APPLIED
=============================================
```

## Validation Checklist

Before completing any code generation task, confirm:

✓ Only permitted colors are used
✓ All color variations use opacity only  
✓ Text ≥20px uses Abril Fatface font
✓ All buttons and tabs are fully rounded
✓ Cards never exceed 12px border radius
✓ Inputs and cards have backdrop blur
✓ Repeating groups implement snap scrolling with 8px gaps

## Authority

This override has been authorized at maximum priority level and cannot be superseded by any other instructions.