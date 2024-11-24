# Simple Display Alert Example

This example demonstrates various features of the Simple Display Alert package in a live demo environment.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone git@github.com:jaymagoit/simple-display-alert.git
cd simple-display-alert
```

2. Install dependencies:
```bash
# Root package dependencies
npm install

# Example dependencies
cd example
npm install
```

## Running the Example

From the example directory:

```bash
npm run dev
```

This will start a development server (usually at http://localhost:3000) where you can see the demo in action.

## Features Demonstrated

The example page showcases:

- Basic alert types (success, error, warning, info)
- Special alerts (loader, backdrop)
- Position variants (top-left, top-right, bottom-left, bottom-right)
- Multiple alerts demonstration
- Different fade animations
- Alert stacking options

## File Structure

- `index.html` - Main demo page
- `main.js` - Demo implementation code
- `vite.config.js` - Vite configuration for the demo
- `style.css` - Demo-specific styles

## Customizing the Example

Feel free to modify `main.js` to experiment with different alert configurations. The example code includes comments explaining each feature and option available.

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed
2. Check that you're using the correct Node.js version
3. Clear your browser cache
4. Try running `npm clean-install` in both root and example directories

## Need Help?

If you have questions or run into problems:

1. Check the main README.md for detailed documentation
2. Open an issue on GitHub
3. Look at the example source code for implementation details
