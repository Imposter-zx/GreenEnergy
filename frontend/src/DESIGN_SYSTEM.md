# Design System & Guidelines

## Overview
This document outlines the design system and guidelines for the GreenEnergy application, ensuring consistency across all UI components and user interfaces.

## Design Principles

### 1. Clarity
- Use clear, concise labels and messaging
- Maintain visual hierarchy through typography
- Remove unnecessary elements and complexity

### 2. Consistency
- Use the established color palette throughout
- Maintain consistent spacing and sizing
- Follow typography guidelines
- Use standard component variants

### 3. Responsiveness
- Design for mobile-first approach
- Ensure all components are mobile-responsive
- Test on common screen sizes (320px, 768px, 1024px, 1440px)

### 4. Accessibility
- Use semantic HTML
- Maintain sufficient color contrast (WCAG AA minimum)
- Support keyboard navigation
- Provide alt text for images
- Use ARIA labels where needed

### 5. User-Centric
- Prioritize user feedback and validation
- Show loading states for all async operations
- Provide clear error messages with solutions
- Use familiar patterns and conventions

## Color Palette

### Primary Colors
- **Primary Blue**: `#3b82f6` (primary-600)
  - Used for: CTAs, primary actions, links, focus states
  - Light variant: `#dbeafe` (primary-100)
  - Dark variant: `#1e40af` (primary-900)

### Semantic Colors
- **Success/Green**: `#10b981` (emerald-600)
  - Used for: Confirmations, positive states, checks
  
- **Warning/Amber**: `#f59e0b` (amber-600)
  - Used for: Alerts, caution states, notices
  
- **Danger/Red**: `#ef4444` (red-600)
  - Used for: Errors, deletions, critical alerts
  
- **Info/Blue**: `#0ea5e9` (blue-600)
  - Used for: Informational alerts, hints

### Neutral Colors
- **Slate-900**: `#0f172a` (Text - Primary)
- **Slate-700**: `#334155` (Text - Secondary)
- **Slate-500**: `#64748b` (Text - Tertiary/Disabled)
- **Slate-50**: `#f8fafc` (Background - Light)
- **White**: `#ffffff` (Background - Primary)

## Typography

### Font Stack
```css
font-family: system-ui, -apple-system, sans-serif;
```

### Sizing & Weight

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Page Title | 36px | 700 (bold) | Main page headers |
| Section Title | 24px | 700 (bold) | Section headers |
| Card Title | 18px | 700 (bold) | Card headers |
| Body Large | 16px | 400 (regular) | Main content |
| Body Regular | 14px | 400 (regular) | Secondary content |
| Label | 14px | 600 (semibold) | Form labels, button text |
| Helper/Caption | 12px | 400 (regular) | Help text, captions |

### Line Height
- Headings: 1.2
- Body text: 1.5
- Form inputs: 1.5

## Spacing System

Uses 4px base unit:
```
xs: 4px (1 unit)
sm: 8px (2 units)
md: 16px (4 units)
lg: 24px (6 units)
xl: 32px (8 units)
2xl: 48px (12 units)
```

### Common Patterns
- **Padding**: Cards use `md` (16px) or `lg` (24px)
- **Gaps**: Grid/Flex use `md` (16px) as standard
- **Margins**: Sections use `lg` (24px) vertical spacing
- **Input padding**: `py-3.5 px-4` (14px vertical, 16px horizontal)

## Component Patterns

### Forms
- Use vertical stacking (column layout)
- Include labels for all inputs
- Show validation errors below inputs
- Buttons span full width on mobile, auto on desktop
- Add helper text for optional fields

### Cards
- Use consistent padding (`md` or `lg`)
- Include action buttons in bottom-right
- Add subtle borders and shadows
- Use 2rem (32px) border radius

### Buttons
- Primary buttons: Blue background, white text
- Secondary buttons: Slate-100 background, slate text
- Danger buttons: Red background, white text
- Minimum touch target: 44px height
- Include loading state with spinner

### Lists & Tables
- Use striped rows for better readability
- Add hover effect for interactive rows
- Include action buttons right-aligned
- Use badge components for status indicators

### Alerts & Notifications
- Position at top of content area
- Include icon matching alert type
- Show dismissible close button
- Use semantic colors for variants

## Component States

### Button States
- **Default**: Standard appearance
- **Hover**: Slightly darker background
- **Active**: Darker background + shadow
- **Disabled**: 70% opacity + cursor-not-allowed
- **Loading**: Spinner icon + disabled state

### Input States
- **Default**: Slate-50 background, slate-200 border
- **Focus**: Primary color ring + primary border
- **Error**: Red border + red text below
- **Disabled**: Reduced opacity
- **Filled**: Icon left-aligned, content right-aligned

### Card States
- **Default**: White background, slate border
- **Elevated**: Enhanced shadow for prominence
- **Hover**: Slight shadow increase + border color change
- **Selected**: Primary border color highlight

## Responsive Design

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Guidelines
- Stack components vertically on mobile
- Use full-width for forms and primary content
- Adjust padding/margins for smaller screens
- Ensure touch targets are at least 44x44px
- Use hamburger menu for navigation on mobile

## Dark Mode (Future)

Reserve dark mode variants for future implementation:
- Invert color scheme while maintaining contrast
- Use higher opacity for secondary elements
- Maintain semantic color meanings

## Animation & Transitions

### Duration
- Quick interactions: 150ms (fast hover effects)
- Standard: 200ms (component transitions)
- Slow: 300ms+ (modals, major layout changes)

### Common Transitions
- Color changes: `transition-colors duration-200`
- Position/scale: `transition-all duration-300`
- Opacity: `transition-opacity duration-200`

### Animations
- Page enter: `fade-in zoom-in-95 duration-300`
- Modal enter: `slide-in-from-right duration-300`
- Loading spinner: `animate-spin`
- Pulse effects: `animate-pulse` for loading states

## Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Color is not the only indicator of state
- [ ] Sufficient contrast between text and background
- [ ] Forms have associated labels
- [ ] Error messages are clear and actionable
- [ ] Loading states are indicated
- [ ] Focus states are visible
- [ ] Images have alt text
- [ ] ARIA labels used appropriately
- [ ] Test with screen reader

## Implementation Notes

### CSS Framework
- Tailwind CSS v3 for utility-first styling
- Custom plugins in `tailwind.config.js` for custom utilities
- No inline styles; use Tailwind classes

### Component Structure
```
src/components/
├── common/           # Reusable base components
├── forms/           # Form-specific components
├── layout/          # Layout components
├── dashboard/       # Dashboard-specific
├── energy/          # Energy-related features
```

### File Naming
- Use PascalCase for component files: `Button.tsx`
- Export default component
- Include TypeScript interfaces
- Add proper documentation comments

## Best Practices

1. **Consistency over Creativity**: Follow established patterns
2. **Mobile-First**: Design for small screens first, enhance for larger
3. **Progressive Enhancement**: Start with core functionality, enhance
4. **Performance**: Keep components lightweight and efficient
5. **Testing**: Test components across browsers and devices
6. **Documentation**: Keep component docs up to date
7. **Feedback**: Show users what's happening (loading, success, error)

## Migration Guide

When updating components:
1. Update the component file
2. Update `COMPONENT_LIBRARY.md` documentation
3. Update component showcase page if needed
4. Test across common breakpoints
5. Check color contrast with contrast checker
6. Verify keyboard navigation works

## Resources

- Color Contrast Checker: https://webaim.org/resources/contrastchecker/
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Web Accessibility: https://www.w3.org/WAI/
- Responsive Design: https://www.smashingmagazine.com/
