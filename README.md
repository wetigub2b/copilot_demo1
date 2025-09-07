# CAAT Pension Vue.js Website

A modern, responsive Vue.js website that replicates the design and functionality of the CAAT Pension website (https://www.caatpension.ca).

## Features

- **Modern Vue.js Architecture**: Built with Vue 3 and Vite for fast development and optimal performance
- **Responsive Design**: Mobile-first approach with professional financial services styling
- **Component-Based Structure**: Modular components for easy maintenance and scalability
- **Professional Styling**: Professional color scheme inspired by CAAT with blues and green accents
- **Accessible Design**: Following accessibility best practices for inclusive user experience
- **Health Monitoring**: Built-in health check endpoint for application monitoring and diagnostics

## Tech Stack

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Fast build tool and development server
- **Vue Router**: Client-side routing for single-page application
- **CSS3**: Modern styling with CSS custom properties and responsive design

## Project Structure

```
src/
├── App.vue              # Main application component
├── main.js              # Application entry point
├── style.css            # Global styles and CSS variables
├── components/
│   ├── AppHeader.vue    # Navigation header with responsive menu
│   ├── Home.vue         # Main landing page with hero and sections
│   ├── HealthCheck.vue  # Health monitoring component
│   └── AppFooter.vue    # Site footer with links and contact info
└── services/
    └── healthService.js # Health check service and API calls
```

## Design System

### Color Palette
- Primary Blue: `#004d9f`
- Secondary Blue: `#0066cc`
- Light Blue: `#e6f2ff`
- Dark Blue: `#003366`
- Green Accent: `#00a86b`
- Gray variants for text and backgrounds

### Typography
- Font Family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
- Responsive font sizes with mobile-first approach
- Professional hierarchy for headings and body text

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Health Check Endpoint

The application includes a comprehensive health check system for monitoring application status and diagnostics.

### Accessing the Health Check

Navigate to `/healthz` in your browser or make an HTTP request to check the application health:

```
http://localhost:5173/healthz
```

### Health Check Features

The health check endpoint provides:

- **Frontend Health Monitoring**: Checks browser API availability, DOM status, and routing functionality
- **Backend Connectivity**: Tests connection to the FastAPI backend service
- **Comprehensive Reporting**: Detailed status information with response times and error messages
- **Real-time Updates**: Refresh functionality to get current health status
- **Visual Interface**: User-friendly web interface showing system status

### Health Check Response Format

The health check returns a JSON-like status structure:

```json
{
  "status": "healthy|unhealthy",
  "timestamp": "2024-12-07T10:00:00Z",
  "response_time_ms": 150,
  "version": "1.0.0",
  "service": "caat-pension-frontend",
  "checks": {
    "frontend": {
      "status": "healthy|unhealthy",
      "checks": {
        "router": true,
        "dom": true,
        "fetch": true,
        "localStorage": true
      }
    },
    "backend": {
      "status": "healthy|unhealthy",
      "details": {
        "status": "healthy",
        "service": "CAAT Pension API"
      }
    }
  }
}
```

### Status Codes

- **200 OK**: Application is healthy
- **503 Service Unavailable**: Application has health issues (frontend interface will still load but show unhealthy status)

### Integration with Monitoring Systems

The health check endpoint can be used with monitoring tools like:

- **Kubernetes**: Configure liveness and readiness probes
- **Load Balancers**: Health check configuration
- **Monitoring Services**: Uptime monitoring and alerting
- **CI/CD Pipelines**: Deployment health verification

### Example Usage

```bash
# Check application health via curl
curl http://localhost:5173/healthz

# Use in monitoring scripts
if curl -f -s http://localhost:5173/healthz > /dev/null; then
  echo "Application is healthy"
else
  echo "Application health check failed"
fi
```

## Component Overview

### AppHeader.vue
- Responsive navigation with mobile hamburger menu
- CAAT branding and logo
- Navigation links for all main sections
- Sticky header with shadow effect

### Home.vue
- Hero section with call-to-action buttons
- CEO message section with quote
- "What's New" news grid with latest updates
- Services overview with icons and descriptions
- Quick access cards for members and employers

### AppFooter.vue
- Comprehensive footer with multiple sections
- Quick links and contact information
- Social media links
- Legal and accessibility links

### HealthCheck.vue
- Comprehensive application health monitoring interface
- Real-time health status display for frontend and backend systems
- Interactive refresh functionality with loading states
- Detailed error reporting and diagnostics
- Responsive design with professional status indicators

## Testing

The project includes comprehensive unit tests using Vitest and Vue Test Utils.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test files
npm run test -- tests/unit/components/HealthCheck.test.js
npm run test -- tests/unit/services/healthService.test.js
```

### Test Structure

```
tests/
├── unit/
│   ├── components/
│   │   ├── HealthCheck.test.js      # Health check component tests
│   │   ├── App.test.js              # Main app component tests
│   │   ├── AppHeader.test.js        # Navigation tests
│   │   └── ...                      # Other component tests
│   └── services/
│       └── healthService.test.js    # Health service unit tests
├── basic.test.js                    # Basic functionality tests
└── minimal.test.js                  # Minimal test examples
```

### Health Check Tests

The health check functionality includes comprehensive tests covering:

**HealthService Tests:**
- Backend API connectivity testing
- Frontend browser API validation
- Timeout handling and error scenarios
- Response time measurement
- Comprehensive health check integration

**HealthCheck Component Tests:**
- Component rendering and lifecycle
- User interaction testing (refresh button)
- Status display and visual indicators
- Error handling and edge cases
- Computed properties and utility methods

### Test Coverage

The tests aim for high coverage across:
- Component rendering and user interactions
- Service layer functionality
- Error handling and edge cases
- Responsive behavior
- Accessibility features

Run `npm run test:coverage` to generate detailed coverage reports.

## Responsive Breakpoints

- Mobile: < 768px
- Tablet/Desktop: ≥ 768px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the established component structure
2. Use scoped styles in Vue components
3. Maintain responsive design patterns
4. Follow accessibility best practices
5. Use CSS custom properties for consistent theming

## License

This project is for educational/demonstration purposes, inspired by the CAAT Pension website design.
