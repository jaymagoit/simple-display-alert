# Simple Display Alert

A lightweight, customizable alert system for web applications.

## Installation

```bash
npm install @jaymago/simple-display-alert
```

## Features

- 📦 Lightweight and dependency-free
- 🎨 Multiple alert types (success, error, warning, info, loader)
- 📍 Flexible positioning (top-left, top-right, bottom-left, bottom-right)
- ⚡ Fade animations (left, right, top, bottom)
- ⏱️ Configurable timeout
- 🔄 Multiple alerts support
- 🎯 TypeScript support

## Basic Usage

### Import

```ts
// Importing alert functions
import { 
    displayAlert,          // Generic alert function
    displayAlertSuccess,   // Success variant
    displayAlertError,     // Error variant
    displayAlertWarning,   // Warning variant
    displayAlertInfo,      // Info variant
    displayAlertLoader     // Loading variant
} from 'simple-display-alert';
```

### Simple Alerts

```ts
// Success message (green)
displayAlertSuccess('Operation completed successfully!');

// Error message (red)
displayAlertError('An error occurred!');

// Warning message (yellow)
displayAlertWarning('Please check your input');

// Info message (blue)
displayAlertInfo('This is an informational message');

// Loading message (with spinner)
displayAlertLoader('Loading...');
```

### Alerts with Options

```ts
// Success alert with custom position and animation
displayAlertSuccess('Success with options', { 
    position: 'top-right',     // Position in top-right corner
    fadeDirection: 'left'      // Slide in from right
});

// Error alert that stays visible and allows multiple alerts
displayAlertError('Error with options', { 
    timeout: 0,                // Stays visible indefinitely
    multiple: true            // Can stack with other alerts
});

// Warning alert with custom position and animation
displayAlertWarning('Warning with options', { 
    position: 'bottom-left',   // Position in bottom-left corner
    fadeDirection: 'bottom'    // Slide in from top
});

// Info alert with custom timeout
displayAlertInfo('Info with options', { 
    timeout: 3000,            // Hide after 3 seconds
    multiple: true            // Can stack with other alerts
});

// Loading alert with custom position and timeout
displayAlertLoader('Loading with options', { 
    position: 'top-right',    // Position in top-right corner
    timeout: 2000             // Hide after 2 seconds
});
```

### Generic Alert with Full Options

```ts
interface DisplayAlertProps {
    // Alert type
    variant: 'success' | 'error' | 'warning' | 'info' | 'white' | 'loader';
    
    // Content
    message: string;
    icon?: 'success' | 'danger' | 'warning' | 'info' | 'loader';
    
    // Positioning
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    
    // Animation
    fadeDirection?: 'left' | 'right' | 'top' | 'bottom' | 'none';
    
    // Behavior
    timeout?: number;         // Time in ms (0 for no auto-hide)
    closeBtn?: boolean;       // Show/hide close button
    multiple?: boolean;       // Allow multiple alerts
    backdrop?: boolean;       // Show backdrop behind alert
}

// Example usage with all options
displayAlert({
    variant: 'success',
    message: 'Your message here',
    icon: 'success',
    position: 'bottom-right',
    fadeDirection: 'left',
    timeout: 5000,
    closeBtn: true,
    multiple: false,
    backdrop: false
});
```

## Managing Alerts

### Hiding Alerts Programmatically

```javascript
// Method 1: Store the alert reference
const alert = displayAlert({
    variant: 'info',
    message: 'This alert can be hidden programmatically',
    timeout: 0
});
// Later, hide it using:
alert.remove();

// Method 2: Remove all alerts
import { removeResponseAlert } from 'simple-display-alert';

// Remove all alerts from the page
removeResponseAlert();
```

## Alert Types

- Success alerts for successful operations
- Error alerts for error messages
- Warning alerts for warnings
- Info alerts for information messages
- Loader alerts for loading states
- White/neutral alerts for general messages
- Backdrop alerts for modal-like messages

## Icon Options

Each alert type comes with a default icon, but you can customize it using the `icon` property:

```ts
// Available icon options
type AlertIcon = 'success' | 'danger' | 'warning' | 'info' | 'loader';

// Examples
displayAlert({
    variant: 'white',
    message: 'Custom success icon',
    icon: 'success'
});

displayAlert({
    variant: 'white',
    message: 'Custom warning icon',
    icon: 'warning'
});

// Loader icon with custom message
displayAlert({
    variant: 'white',
    message: 'Processing...',
    icon: 'loader'
});

// No icon
displayAlert({
    variant: 'info',
    message: 'Message without icon',
    icon: undefined
});
```

Default icon mappings:
- `success` - Checkmark icon (✓)
- `danger/error` - X icon (×)
- `warning` - Exclamation mark (!)
- `info` - Information icon (i)
- `loader` - Animated spinner

## Position Options

- `top-left`
- `top-right`
- `bottom-left`
- `bottom-right`

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| variant | string | 'primary' | Alert type ('success', 'error', 'warning', 'info', 'white', 'loader') |
| message | string | - | Alert message content |
| timeout | number | 5000 | Time in ms before alert auto-hides (0 for no auto-hide) |
| position | string | 'bottom-right' | Alert position on screen |
| fadeDirection | string | 'none' | Direction of fade animation |
| icon | string | variant default | Icon type to display ('success', 'danger', 'warning', 'info', 'loader'). Each variant has a default icon, but you can override it or set to undefined for no icon |
| closeBtn | boolean | true | Show/hide close button |
| multiple | boolean | false | Allow multiple alerts |
| backdrop | boolean | false | Show backdrop behind alert |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
