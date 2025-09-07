# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Progressive Web App (PWA) for "The Knowledge ARC: AI-Powered Knowledge Mastery" webinar registration page. It's built as a single-page application with PWA capabilities, designed for Korean-language users in the knowledge management and AI education space.

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
- **`index.html`**: Main single-page application with embedded CSS and JavaScript
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
The single-page layout includes these main sections:
1. Hero section with countdown timer
2. Problem identification (knowledge management challenges)
3. Solution presentation (AI partner system)
4. 8-week program curriculum details
5. Speaker profile and credentials
6. Registration form with validation
7. FAQ accordion
8. Social proof and testimonials

## File Organization

```
webinar_book/
├── index.html           # Main application (contains all HTML, CSS, JS)
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

- **Single-page architecture**: All functionality contained in `index.html`
- **CDN dependencies**: Tailwind CSS and other libraries loaded externally
- **Caching strategy**: Service worker caches static resources and CDN assets
- **Korean localization**: All text content and PWA manifest in Korean
- **Responsive design**: Mobile-first approach with desktop enhancements