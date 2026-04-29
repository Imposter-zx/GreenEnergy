# Quick Reference - GreenEnergy Component Library

## Quick Start

### Import Components
```tsx
import { Button, Card, Input, Modal } from '@/components/common';
import { AuthForm } from '@/components/forms';
import { Container, Grid } from '@/components/layout/LayoutUtils';
```

## Common Components Cheat Sheet

### Button
```tsx
<Button>Click me</Button>
<Button variant="primary" size="lg">Submit</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost" icon={<Icon />}>Ghost</Button>
<Button loading={isLoading}>Loading...</Button>
```

### Card
```tsx
<Card><h3>Title</h3></Card>
<Card variant="elevated">Elevated</Card>
<Card hoverable onClick={handler}>Clickable</Card>
<Card variant="flat" padding="sm">Compact</Card>
```

### Input
```tsx
<Input label="Name" placeholder="Enter name" />
<Input type="email" icon={<Mail size={18} />} />
<Input error="Invalid email" helperText="Must be valid" />
<Input variant="filled" />
```

### StatCard
```tsx
<StatCard
  icon={<Zap />}
  label="Usage"
  value="124"
  unit="kWh"
  trend="down"
  trendValue={12}
/>
```

### Badge
```tsx
<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge icon={<Check size={14} />}>With Icon</Badge>
```

### Alert
```tsx
<Alert variant="success" message="Saved!" />
<Alert variant="error" title="Error" message="Failed" />
<Alert variant="warning" action={{ label: "Undo", onClick: handler }} />
```

### Modal
```tsx
<Modal isOpen={open} onClose={closeHandler} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

### Select
```tsx
<Select
  label="Choose"
  options={[{ value: 1, label: 'Option 1' }]}
  placeholder="Select..."
/>
```

### DataTable
```tsx
<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'usage', label: 'Usage (kWh)' }
  ]}
  data={rows}
  rowActions={[{ label: 'Edit', onClick: editHandler }]}
/>
```

## Form Components

### AuthForm
```tsx
<AuthForm
  mode="login"
  onSubmit={submitHandler}
  error={error}
  isLoading={loading}
  onToggleMode={toggleHandler}
/>
```

### EnergyReadingForm
```tsx
<EnergyReadingForm
  onSubmit={submitHandler}
  isLoading={loading}
  error={error}
  success={success}
/>
```

## Layout Utilities

### Container
```tsx
<Container size="lg">Content</Container>
```

### Grid
```tsx
<Grid columns={3} gap="md">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>
```

### Flex
```tsx
<Flex direction="row" justify="between" align="center">
  <span>Left</span>
  <span>Right</span>
</Flex>
```

### Section
```tsx
<Section spacing="md">
  <h2>Title</h2>
</Section>
```

## Common Props

| Component | Common Props |
|-----------|--------------|
| Button | variant, size, loading, icon, fullWidth |
| Card | variant, padding, hoverable |
| Input | label, error, helperText, icon, variant |
| Modal | isOpen, onClose, title, size, closeButton |
| All | className (for overrides) |

## Variants Reference

### Button Variants
- `primary` - Main action
- `secondary` - Secondary action
- `danger` - Destructive action
- `outline` - Secondary with border
- `ghost` - Minimal style

### Card Variants
- `default` - Standard card
- `elevated` - More prominent shadow
- `outlined` - Border only
- `flat` - Flat background

### Alert Variants
- `success` - Positive feedback (green)
- `error` - Error message (red)
- `warning` - Warning (amber)
- `info` - Information (blue)

### Badge Variants
- `primary`, `success`, `warning`, `danger`, `info`, `neutral`

### Colors
- `primary` - Blue
- `success` - Green (emerald)
- `warning` - Amber
- `danger` - Red
- `info` - Blue

## Sizes

### Button Sizes
- `sm` - Small (14px)
- `md` - Medium (16px)
- `lg` - Large (18px)

### Badge Sizes
- `sm` - Small (12px)
- `md` - Medium (14px)
- `lg` - Large (16px)

### Spinner Sizes
- `sm` - 24px
- `md` - 40px
- `lg` - 64px

### Modal Sizes
- `sm` - 384px max-width
- `md` - 448px max-width
- `lg` - 512px max-width
- `xl` - 896px max-width

## Spacing

Use layout utilities for consistent spacing:
```tsx
<Grid gap="sm">    {/* 8px */}
<Grid gap="md">    {/* 16px */}
<Grid gap="lg">    {/* 24px */}
```

## Color Tokens

| Color | Value |
|-------|-------|
| Primary | #3b82f6 |
| Success | #10b981 |
| Warning | #f59e0b |
| Danger | #ef4444 |
| Info | #0ea5e9 |

## Accessibility

All components support:
- ✅ Keyboard navigation
- ✅ Screen readers
- ✅ ARIA labels
- ✅ Focus management
- ✅ Color contrast (WCAG AA)

## Tips & Tricks

### Form with Validation
```tsx
const [errors, setErrors] = useState({});

<Input
  label="Email"
  error={errors.email}
  onChange={() => setErrors({ ...errors, email: undefined })}
/>
```

### Loading States
```tsx
<Button loading={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

### Responsive Layout
```tsx
<Grid columns={3} gap="md">  {/* 3 on desktop, 2 on tablet, 1 on mobile */}
  <Card>Item</Card>
</Grid>
```

### Modal with Form
```tsx
<Modal isOpen={open} onClose={close} title="Edit">
  <Form onSubmit={handleSubmit}>
    <Input label="Name" />
    <Flex gap="md" justify="end">
      <Button variant="secondary" onClick={close}>Cancel</Button>
      <Button type="submit">Save</Button>
    </Flex>
  </Form>
</Modal>
```

## Documentation Links

- 📖 [Full Component Library Docs](./COMPONENT_LIBRARY.md)
- 🎨 [Design System Guidelines](../DESIGN_SYSTEM.md)
- 🎭 [Interactive Showcase](/showcase)

## Common Issues & Solutions

**Issue**: Component not updating on prop change
**Solution**: Check if using controlled vs uncontrolled component

**Issue**: Style not applying
**Solution**: Use className prop, check Tailwind config

**Issue**: Form submission not working
**Solution**: Ensure Form wrapper is used correctly with onSubmit

**Issue**: Modal stuck open
**Solution**: Verify onClose handler is properly connected

---

**Version**: 1.0  
**Last Updated**: April 29, 2026  
**Status**: ✅ Complete
