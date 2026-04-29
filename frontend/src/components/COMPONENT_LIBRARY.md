# GreenEnergy UI Component Library

A comprehensive, reusable component library built with React, TypeScript, and Tailwind CSS.

## Components Overview

### Common Components

#### Button
Versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `loading`: boolean (shows spinner when true)
- `icon`: ReactNode
- `fullWidth`: boolean
- All standard HTML button attributes

**Example:**
```tsx
<Button variant="primary" size="lg" loading={isLoading}>
  Submit
</Button>
```

#### Card
Container component for content with multiple visual styles.

**Props:**
- `variant`: 'default' | 'elevated' | 'outlined' | 'flat' (default: 'default')
- `padding`: 'sm' | 'md' | 'lg' (default: 'md')
- `hoverable`: boolean (adds hover effect)

**Example:**
```tsx
<Card variant="elevated" padding="lg" hoverable>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

#### Input
Text input field with validation support.

**Props:**
- `label`: string (optional label text)
- `error`: string (error message)
- `helperText`: string (helper message below input)
- `icon`: ReactNode (left icon)
- `variant`: 'default' | 'filled' (default: 'default')
- All standard HTML input attributes

**Example:**
```tsx
<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  icon={<Mail size={18} />}
  error={errors.email}
/>
```

#### Modal
Dialog component for overlays and confirmations.

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string (optional)
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `closeButton`: boolean (default: true)
- `showBackdrop`: boolean (default: true)

**Example:**
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

#### StatCard
Dashboard statistics card with trends.

**Props:**
- `icon`: ReactNode
- `label`: string
- `value`: string | number
- `unit`: string (optional)
- `trend`: 'up' | 'down' | null
- `trendValue`: number (percentage)
- `trendLabel`: string
- `color`: 'primary' | 'success' | 'warning' | 'danger' | 'info'
- `onClick`: () => void (optional)

**Example:**
```tsx
<StatCard
  icon={<Zap size={24} />}
  label="Total Consumption"
  value="1,234"
  unit="kWh"
  trend="down"
  trendValue={12}
  color="primary"
/>
```

#### Badge
Label component for tags and categories.

**Props:**
- `variant`: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `icon`: ReactNode (optional)

**Example:**
```tsx
<Badge variant="success" icon={<CheckCircle size={14} />}>
  Active
</Badge>
```

#### Alert
Alert/notification component.

**Props:**
- `variant`: 'success' | 'error' | 'warning' | 'info' (default: 'info')
- `title`: string (optional)
- `message`: string (required)
- `dismissible`: boolean (default: true)
- `onClose`: () => void
- `action`: { label: string; onClick: () => void } (optional)

**Example:**
```tsx
<Alert
  variant="success"
  title="Success!"
  message="Changes saved successfully"
/>
```

#### Select
Dropdown select component.

**Props:**
- `label`: string (optional)
- `error`: string (optional)
- `helperText`: string (optional)
- `options`: Array<{ value: string | number; label: string }>
- `placeholder`: string (optional)
- `variant`: 'default' | 'filled'

**Example:**
```tsx
<Select
  label="Device"
  options={[
    { value: 'meter1', label: 'Smart Meter 1' },
    { value: 'meter2', label: 'Smart Meter 2' }
  ]}
  placeholder="Select a device"
/>
```

#### Textarea
Multi-line text input.

**Props:**
- `label`: string (optional)
- `error`: string (optional)
- `helperText`: string (optional)
- `rows`: number (default: 4)
- `variant`: 'default' | 'filled'

#### DataTable
Responsive data table component.

**Props:**
- `columns`: Array of column definitions
- `data`: Array of data rows
- `loading`: boolean
- `onRowClick`: (row) => void (optional)
- `rowActions`: Array of action objects
- `emptyMessage`: string
- `striped`: boolean (default: true)
- `hoverable`: boolean (default: true)

#### LoadingSpinner
Loading indicator component.

**Props:**
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `fullScreen`: boolean (overlay entire screen)
- `label`: string (optional)

### Form Components

#### Form
Wrapper component for forms with consistent spacing.

**Props:**
- `onSubmit`: (e: FormEvent) => void
- All standard form attributes

#### FormField
Field wrapper for consistent labeling and error display.

**Props:**
- `label`: string (optional)
- `error`: string (optional)
- `required`: boolean
- `helperText`: string (optional)

### Specialized Forms

#### AuthForm
Complete login/registration form.

**Props:**
- `mode`: 'login' | 'register'
- `onSubmit`: (data) => Promise<void>
- `isLoading`: boolean
- `error`: string | null
- `onToggleMode`: () => void

#### EnergyReadingForm
Form for adding energy readings.

**Props:**
- `onSubmit`: (data: EnergyReading) => Promise<void>
- `isLoading`: boolean
- `error`: string | null
- `success`: boolean

### Layout Utilities

#### Container
Responsive container with max-width constraints.

```tsx
<Container size="lg">
  Content here
</Container>
```

#### Section
Section wrapper with consistent vertical spacing.

```tsx
<Section spacing="md">
  Content here
</Section>
```

#### Grid
Responsive grid layout.

```tsx
<Grid columns={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

#### Flex
Flexbox layout utility.

```tsx
<Flex direction="row" justify="between" align="center" gap="md">
  <span>Left</span>
  <span>Right</span>
</Flex>
```

## Design Tokens

### Colors
- Primary: `primary-600` (#3b82f6)
- Success: Emerald
- Warning: Amber
- Danger: Red
- Info: Blue
- Neutral: Slate

### Spacing
- `sm`: 4px
- `md`: 6px
- `lg`: 8px

### Border Radius
- Default: 12px (rounded-2xl)
- Card: 16px
- Button: 12px

### Shadows
- `sm`: Small shadow for cards
- `lg`: Large shadow for elevated cards
- `xl`: Extra large for modals

### Typography
- Font: System sans-serif stack
- Base size: 16px
- Headings: Bold with consistent sizing

## Usage Examples

### Basic Form
```tsx
import { Form, Input, Button, Alert } from '@/components/common';

function MyForm() {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit logic
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="error" message={error} />}
      <Input label="Name" placeholder="John Doe" required />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### Dashboard Cards
```tsx
import { Container, Grid, StatCard } from '@/components/common';

function Dashboard() {
  return (
    <Container>
      <Grid columns={3} gap="md">
        <StatCard
          icon={<Zap />}
          label="Today's Usage"
          value="24.5"
          unit="kWh"
        />
        <StatCard
          icon={<DollarSign />}
          label="Cost Saved"
          value="$12.50"
          trend="up"
          trendValue={15}
        />
      </Grid>
    </Container>
  );
}
```

## Best Practices

1. **Consistency**: Use the same variants and sizes across similar components
2. **Accessibility**: All components support standard HTML attributes for a11y
3. **Validation**: Use error states to provide user feedback
4. **Loading States**: Always show loading indicators for async operations
5. **Responsive**: Use Grid and Flex for responsive layouts
6. **Color Semantics**: Use variant colors that match their meaning (danger = red, success = green)

## Customization

Components are built with Tailwind CSS and can be customized by:
1. Modifying the className strings in component definitions
2. Extending Tailwind config in `tailwind.config.js`
3. Creating component variants in the `tailwind.config.js`
4. Using className prop for one-off overrides

## Component Showcase

Visit `/showcase` to see all components in action with interactive examples.
