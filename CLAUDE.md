# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Progressive Web App (PWA) for "The Knowledge ARC: AI-Powered Knowledge Mastery" webinar registration and sales pages. It's built as a multi-page application with PWA capabilities, designed for Korean-language users in the knowledge management and AI education space.

## Development Commands

### Core Development
- **Start development server**: `npm run dev` (starts live-server on port 3000)
- **Build**: `npm run build` (currently just echoes completion)
- **Install dependencies**: `npm install`

### Icon Management
- **Generate PWA icons**: Open `generate-icons.html` in browser, click "모든 아이콘 생성", save PNGs to `icons/` folder
- **Icon source**: Edit `icons/icon.svg` for the master icon template

## Architecture and Key Files

### Core Application Structure
- **`index.html`**: Main landing page with selection between webinar and replay options
- **`webinar.html`**: Full webinar registration page with comprehensive content
- **`replay.html`**: Webinar replay access page
- **`sales.html`**: Redirect file to `/sales/` subdirectory
- **`sales/index.html`**: Dedicated sales/conversion page
- **`manifest.json`**: PWA configuration with Korean localization and app shortcuts
- **`sw.js`**: Service worker with caching strategy and offline support
- **`package.json`**: Project configuration and dependencies (Tailwind CSS, live-server)

### PWA Configuration
- **Theme colors**: Primary `#2563EB`, uses CSS custom properties in `:root`
- **Cache strategy**: Static resource caching with CDN fallbacks (Tailwind, Lucide icons, Google Fonts)
- **Offline capabilities**: Service worker handles caching and background sync
- **App shortcuts**: Direct links to registration form and program info

### Styling System
- **Framework**: Tailwind CSS loaded via CDN
- **Custom properties**: CSS variables for brand colors (primary, accent, success, neutral)
- **Components**: shadcn/ui inspired design patterns
- **Responsive**: Mobile-first design with hover effects and smooth animations

### Content Architecture
The application follows a multi-page structure:
1. **Landing page** (`index.html`): Route selection between webinar and replay
2. **Webinar page** (`webinar.html`): Full registration experience with:
   - Hero section with countdown timer
   - Problem identification (knowledge management challenges)
   - Solution presentation (AI partner system)
   - 8-week program curriculum details
   - Speaker profile and credentials
   - Registration form with validation
   - FAQ accordion
   - Social proof and testimonials
3. **Replay page** (`replay.html`): Access to recorded content
4. **Sales page** (`sales/index.html`): Conversion-focused sales funnel

## File Organization

```
webinar_sales/
├── index.html           # Main landing page
├── webinar.html         # Full webinar registration page
├── replay.html          # Replay access page
├── sales.html           # Redirect to sales subdirectory
├── sales/
│   └── index.html       # Dedicated sales page
├── manifest.json        # PWA manifest with Korean localization
├── sw.js               # Service worker for offline functionality
├── package.json        # Dependencies and scripts
├── favicon.svg         # Scalable favicon
├── generate-icons.html # Icon generation utility
├── icons/
│   ├── icon.svg       # Master SVG icon template
│   └── *.png          # Generated PWA icons (72x72 to 512x512)
└── README.md          # Comprehensive project documentation
```

## Deployment and Testing

### Local Development
- Use `npm run dev` which starts live-server on localhost:3000
- HTTPS required for PWA features (use local HTTPS proxy for full testing)

### PWA Testing
- Test installation flow in Chrome/Edge (look for install button in address bar)
- Verify offline functionality by disconnecting network
- Check Application tab in DevTools for service worker status and cache contents
- Test app shortcuts from installed PWA

### Icon System
- Master icon is SVG-based for scalability
- Use `generate-icons.html` to create all required PNG sizes (72x72 through 512x512)
- Icons support both maskable and any purposes for different platform requirements

## Content Management

### Webinar Information Updates
- Countdown timer and dates are embedded in HTML
- Korean language content throughout
- Registration form connects to external service
- Speaker information and curriculum details in structured HTML sections

### Brand Customization
- CSS custom properties in `:root` for easy color theme changes
- Consistent use of primary (#2563EB) and accent (#F59E0B) colors
- Typography uses Inter font family from Google Fonts

## Technical Considerations

### Multi-page Architecture Benefits
- Each HTML page is self-contained with embedded styles and scripts
- Reduces HTTP requests and improves initial load times for each page
- Simplifies deployment and maintenance
- Better for offline-first PWA approach with selective caching

### External Dependencies
- Tailwind CSS loaded from CDN with offline caching
- Google Fonts (Inter family) with fallback fonts
- Lucide icons for consistent UI elements
- All external resources cached by service worker

### Korean Localization
- All text content in Korean with proper encoding
- Date/time formatting appropriate for Korean users
- Cultural references and business context for Korean market
- Form validation messages in Korean

## Key Technical Features

### Service Worker Capabilities
- **Cache versioning**: Uses versioned cache names (currently `knowledge-arc-webinar-v1.0.2`)
- **Background sync**: Handles offline form submissions with sync tag `webinar-registration`
- **Push notifications**: Supports Korean-language push notifications with custom actions
- **Message handling**: Supports cache management commands (`SKIP_WAITING`, `GET_VERSION`, `CLEAR_CACHE`)

### PWA Installation Flow
- **App shortcuts**: Pre-configured shortcuts to registration form and program info
- **Maskable icons**: Full icon set (72x72 to 512x512) supports both maskable and any purposes
- **Standalone display**: Configured for app-like experience when installed

### Multi-page Architecture Pattern
The application uses a self-contained multi-page pattern where:
- Each HTML file includes embedded CSS and JavaScript
- Service worker caches all pages for offline access
- Navigation between pages works offline
- Each page is optimized for specific conversion goals

### Development Testing
- **PWA testing**: Use Chrome DevTools > Application tab to test service worker and cache
- **Offline testing**: Disconnect network to verify offline functionality
- **Installation testing**: Look for install prompt in browser address bar
- **HTTPS requirement**: PWA features require HTTPS in production (use local proxy for testing)