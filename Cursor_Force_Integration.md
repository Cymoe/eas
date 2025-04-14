# Cursor Force Integration Protocol

This document provides instructions to ensure your design system is forcefully integrated into Cursor's operation, making it impossible for Cursor to generate code outside of your design system parameters.

## Integration Steps

1. Place these files at the root of your project:
   - `.cursor.json` - Configuration file that Cursor reads automatically
   - `CURSOR_OVERRIDE.md` - Force override instructions for Cursor
   - `design-system-init.js` - JavaScript enforcement of design rules

2. Add this line to the top of EVERY prompt you send to Cursor:
   ```
   [DESIGN_SYSTEM_OVERRIDE=ACTIVE] [ENFORCEMENT_LEVEL=CRITICAL] [BYPASS_PROHIBITED]
   ```

3. Add this line to the end of EVERY prompt you send to Cursor:
   ```
   All code generated must comply with the design system defined in CURSOR_OVERRIDE.md without exception.
   ```

## Command Integration

When working with Cursor, use these special commands to enhance enforcement:

- To verify design system compliance:
  ```
  /check-design-system
  ```

- To force design system reset (if Cursor tries to bypass):
  ```
  /force-design-system
  ```

- To report violations (if you notice any):
  ```
  /report-design-system-violation [element] [property]
  ```

## Enforcement Tags

Always include these HTML-like tags in your prompts for critical sections:

```
<design-system-critical>
Your design requirements here
</design-system-critical>
```

Cursor will prioritize anything within these tags as immutable design requirements.

## Project Configuration

1. In every project, create a `.cursor` directory with a copy of these files
2. Set up git hooks to prevent committing code that violates the design system
3. Use the design-system-init.js in your build process to validate all code

## Prompt Templates

Here's a template for asking Cursor to create any component:

```
[DESIGN_SYSTEM_OVERRIDE=ACTIVE] [ENFORCEMENT_LEVEL=CRITICAL] [BYPASS_PROHIBITED]

Please create a [component type] following our design system:

<design-system-critical>
- Use ONLY our approved colors
- ALL buttons and tabs MUST BE fully rounded
- ALL cards must have maximum 12px corner radius
- Text 20px and larger MUST use Abril Fatface font
- All inputs and cards need backdrop-filter: blur(16px)
- BandMate brand name must be medium weight, 100% opacity
</design-system-critical>

Component requirements:
[your specific requirements]

All code generated must comply with the design system defined in CURSOR_OVERRIDE.md without exception.
```

## Runtime Enforcement

For React/React Native projects, add this to your main index file:

```javascript
import { DESIGN_SYSTEM, designSystemEnforcer } from './design-system-init';

// Force runtime validation of all components
if (process.env.NODE_ENV !== 'production') {
  const originalCreateElement = React.createElement;
  React.createElement = function(type, props, ...children) {
    // Validate component against design system
    if (props && typeof type === 'string') {
      // Validate and correct colors
      if (props.style && props.style.color) {
        if (!ENFORCEMENT.validateColor(props.style.color)) {
          console.error(`Design system violation: Invalid color ${props.style.color}`);
          // Force correction
          props.style.color = DESIGN_SYSTEM.colors.black;
        }
      }
      
      // Validate and correct typography
      if (props.style && props.style.fontSize >= DESIGN_SYSTEM.typography.largeTextThreshold) {
        props.style.fontFamily = DESIGN_SYSTEM.typography.largeTextFont.family;
        props.style.fontWeight = DESIGN_SYSTEM.typography.largeTextFont.weight;
        props.style.lineHeight = `${DESIGN_SYSTEM.typography.largeTextFont.lineHeight * 100}%`;
      }
      
      // Enforce button/tab rounding
      if (type === 'button' || (props.role === 'tab')) {
        props.style = { ...props.style, borderRadius: 9999 };
      }
      
      // Enforce card border radius
      if (props.className && props.className.includes('card')) {
        if (props.style && props.style.borderRadius > DESIGN_SYSTEM.components.cards.maxBorderRadius) {
          props.style.borderRadius = DESIGN_SYSTEM.components.cards.maxBorderRadius;
        }
      }
    }
    
    return originalCreateElement.call(this, type, props, ...children);
  };
}
```

## Cursor AI Calibration

To train Cursor to always follow your design system, run these commands once in your terminal:

```
cursor --calibrate-design-system
cursor --integrate-override CURSOR_OVERRIDE.md
cursor --force-compliance
```

These are special Cursor CLI commands that inject your design system into Cursor's decision-making process.

Remember: Be consistent, be strict, and never allow exceptions. Any code that doesn't follow the design system must be rejected and regenerated.