# SmartestZone Mobile App

A professional IoT device control app built with Flutter.

## Features

- **Authentication**: Secure login using Clerk.
- **Dashboard**: Quick overview of your home environment and quick actions.
- **Device Control**: Manage your smart devices (lights, locks, thermostats, etc.).
- **AI Chat Assistant**: Control your home using natural language commands.
- **Device Registration**: Easily add new devices by scanning QR codes.

## Getting Started

### Prerequisites

- Flutter SDK
- A Clerk account (for authentication)

### Setup

1.  **Install Dependencies**:
    ```bash
    flutter pub get
    ```

2.  **Configure Clerk**:
    Open `lib/main.dart` and replace the placeholder with your Clerk Publishable Key:
    ```dart
    await ClerkAuth.initialize(publishableKey: 'pk_test_YOUR_CLERK_PUBLISHABLE_KEY');
    ```

3.  **Run the App**:
    ```bash
    flutter run
    ```

## Architecture

This project follows a clean architecture approach with BLoC for state management.

-   `lib/core`: Core utilities, theme, and router.
-   `lib/data`: Data layer with models and repositories (currently using mock data).
-   `lib/logic`: Business logic components (BLoCs).
-   `lib/presentation`: UI components (Screens and Widgets).

## Mock Data

Currently, the app uses mock repositories (`MockDeviceRepository`, `MockChatRepository`) to simulate backend interactions. These can be replaced with real API implementations in the `data/repositories` folder.
