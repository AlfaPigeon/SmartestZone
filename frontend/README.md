# SmartestZone - Smart Room Solution Platform

A comprehensive smart room solution platform with central control of IoT and smart devices, featuring an agentic AI assistant for smartwatch and mobile app interactions.

## 🎯 Overview

SmartestZone is a smart room solution platform that provides:

- **Central Control**: Manage all IoT and smart devices in your area from a single dashboard
- **Agentic AI Assistant**: Voice and text-based assistant accessible from smartwatches and mobile apps
- **Device Management**: Track and control devices via WiFi and Bluetooth connectivity
- **User Assignment**: Assign devices to users and track their metrics
- **Event Callbacks**: Automatic callbacks triggered by device events (fall detection, heart rate spikes, etc.)
- **Health Monitoring**: Real-time tracking of health metrics from wearable devices
- **Analytics**: Comprehensive analytics for device usage, health data, and AI assistant performance

## 🏗️ Platform Features

### IoT Device Management
- **WiFi & Bluetooth**: All IoT devices support both connectivity types
- **Device Types**: Climate control, lighting, security, access control, environmental sensors
- **Real-time Status**: Monitor device status, battery levels, and connectivity
- **Remote Control**: Control devices from the portal or via AI assistant

### Wearable Integration
- **SmartWatch Support**: Apple Watch, Samsung Galaxy Watch, Fitbit, and more
- **Health Sensors**: Heart rate monitoring, fall detection, activity tracking
- **Real-time Metrics**: Continuous health monitoring with automatic alerts
- **Emergency Response**: Automatic callbacks for critical events (falls, abnormal heart rate)

### Mobile Device Integration
- **Cross-Platform**: iOS and Android support
- **AI Assistant App**: Voice and text commands to interact with smart devices
- **Device as Tools**: Connected client devices can be used as tools in the assistant application
- **Push Notifications**: Real-time alerts and event notifications

### AI Assistant
- **Agentic Architecture**: Intelligent assistant that uses IoT devices as tools
- **Multi-Platform**: Available on smartwatches, mobile phones, and tablets
- **Voice Commands**: Natural language processing for device control
- **Context Awareness**: Understanding of room context and user preferences
- **Device Tools**: Every connected IoT device can be controlled via the assistant

### User Management
- **Device Assignment**: Assign multiple devices to users
- **Metrics Tracking**: Track user health metrics and device usage
- **Event Callbacks**: Configure automatic actions for specific events
- **Role Management**: Different roles for patients, staff, and administrators

### Analytics & Monitoring
- **Device Metrics**: Uptime, response time, connection reliability
- **Health Analytics**: Aggregate health data, trends, and alerts
- **Event History**: Track all event callbacks and their responses
- **AI Performance**: Monitor assistant usage, success rates, and popular commands

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Authentication**: Clerk (with organization support)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn
- Clerk account (for authentication)

## 🛠️ Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Update the `.env.local` file with your Clerk credentials:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```
   
   Get your credentials from [Clerk Dashboard](https://dashboard.clerk.com)

3. **Enable Organizations in Clerk**
   - Go to your Clerk dashboard
   - Navigate to Settings → Organizations
   - Enable organization support

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── layout.tsx        # Dashboard layout with sidebar
│   │   ├── page.tsx          # Dashboard home
│   │   ├── devices/          # IoT device management
│   │   ├── users/            # User management
│   │   ├── ai-assistant/     # AI assistant configuration
│   │   └── analytics/        # Analytics and metrics
│   ├── sign-in/              # Authentication pages
│   ├── sign-up/
│   ├── layout.tsx            # Root layout with Clerk provider
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── app-sidebar.tsx       # Main sidebar navigation
│   └── top-bar.tsx           # Top navigation bar
├── middleware.ts             # Clerk authentication middleware
└── package.json
```

## 🎨 Features Breakdown

### Dashboard
- Overview of active devices, users, and health monitors
- Real-time activity feed
- AI assistant statistics
- Quick access to all platform features

### Devices Page
Three tabs for different device categories:
1. **IoT Devices**: Smart thermostats, sensors, locks, cameras
2. **Wearables**: SmartWatches with health sensors and fall detection
3. **Mobile Devices**: Phones and tablets with AI assistant app

### Users Page
- User profiles with assigned devices
- Real-time health metrics (heart rate, steps, fall detection)
- Device assignment management
- Event callback configuration
- Health monitoring dashboard

### AI Assistant Page
- Available device tools for AI interaction
- Recent command history
- Performance metrics
- Device connectivity status (WiFi/Bluetooth)
- Command success rates

### Analytics Page
Four analytics categories:
1. **Device Metrics**: Uptime, response time, battery alerts
2. **Health Metrics**: Heart rate, fall detection, activity levels
3. **Event Callbacks**: Automatic callback history and performance
4. **AI Assistant**: Command statistics and usage patterns

## 🔧 Configuration

### Adding Custom Devices
Devices can be added to the system with both WiFi and Bluetooth support. Each device can be:
- Assigned to users
- Controlled via AI assistant
- Monitored for metrics
- Configured with event callbacks

### Event Callbacks
Configure automatic actions for events:
- Fall detection → Alert medical staff
- Heart rate spike → Send notification
- Low battery → Email administrator
- Temperature threshold → Adjust settings

### AI Assistant Tools
Any IoT device connected to the system can be used as a tool by the AI assistant:
- Smart lighting control
- Temperature adjustment
- Door lock control
- Camera viewing
- Environmental monitoring

## 🔐 Authentication

The application uses Clerk for authentication with:
- Email/password login
- Social login options
- Organization support
- User management
- Session handling

All routes under `(dashboard)` are protected and require authentication.

## 🎯 Use Cases

### Healthcare Facility
- Monitor patient health metrics via wearables
- Automatic alerts for fall detection
- Control room environment (temperature, lighting)
- Staff can interact with systems via mobile app

### Senior Living
- Fall detection and emergency response
- Health monitoring and alerts
- Voice-controlled environment
- Family member notifications

### Smart Hotel
- Guest room automation
- Voice-controlled amenities
- Environmental preferences
- Mobile app for room control

### Corporate Office
- Employee wellness tracking
- Meeting room automation
- Environmental optimization
- Voice assistant for desk control

## 🚧 Development

### Adding New Pages
1. Create a new folder under `app/(dashboard)/`
2. Add a `page.tsx` file
3. Update `components/app-sidebar.tsx` with the new route

### Adding New Components
```bash
npx shadcn@latest add [component-name]
```

## 📝 Next Steps

To make this a production-ready application:

1. **Backend Integration**: Connect to a real backend API for device data
2. **Real-time Updates**: Implement WebSocket or Server-Sent Events
3. **Database**: Store device data, user metrics, and event history
4. **Device SDK**: Create SDKs for IoT device integration
5. **Mobile Apps**: Build native iOS/Android apps with AI assistant
6. **SmartWatch Apps**: Develop watchOS and WearOS applications
7. **AI Integration**: Implement actual LLM-based assistant with tool calling
8. **Testing**: Add unit tests, integration tests, and E2E tests
9. **Deployment**: Deploy to Vercel or your preferred hosting platform

## 📄 License

This project is proprietary software for SmartestZone platform.
