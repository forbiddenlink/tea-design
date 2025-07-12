# Tea Design Challenge - Mobile First Responsive Design

This project is an implementation of a specific UI design challenge that required using a predefined color scheme and creating a mobile-first responsive design. The challenge required implementing the following exact colors:
- Mint Green (`#AADFC5`)
- Forest Green (`#47946E`)
- Brown (`#7A4900`)

The goal was to create a responsive tea shop landing page that effectively uses these specific colors while ensuring proper contrast, accessibility, and a cohesive design across all device sizes.

## Design Challenge Requirements
- Use the exact specified color scheme
- Implement a mobile-first responsive approach
- Create a hamburger menu for mobile navigation
- Incorporate provided images (fern.svg and plant.png)
- Ensure proper visual hierarchy
- Maintain consistent spacing and alignment
- Create an engaging and modern UI

## Design Specifications

### Color Scheme
- Primary Light: `#AADFC5` (Mint Green)
- Primary: `#47946E` (Forest Green)
- Accent: `#7A4900` (Brown)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet/Desktop: ≥ 768px
- Large Desktop: ≥ 1200px

### Features
- Mobile-first approach
- Responsive navigation with hamburger menu on mobile
- Two-column layout on larger screens
- Decorative elements (fern background)
- Modern button styles with hover effects
- Optimized typography and spacing
- Fully responsive images

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd tea-design
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

To start the development server:
```bash
npm start
```
This will open the project in your default browser at `http://localhost:3000`

To build for production:
```bash
npm run build
```

To watch for changes during development:
```bash
npm run watch
```

## Project Structure
- `index.html` - Main HTML structure
- `index.css` - Styles with mobile-first approach
- `index.js` - JavaScript for mobile menu functionality
- `fern.svg` - Decorative background image
- `plant.png` - Main content image

## Implementation Details
- Uses CSS custom properties for consistent theming
- Implements flexbox and grid for responsive layouts
- Includes smooth transitions and hover effects
- Optimized for accessibility with semantic HTML
- Clean and maintainable code structure