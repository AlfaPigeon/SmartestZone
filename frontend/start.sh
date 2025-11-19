#!/bin/bash

# SmartestZone Quick Start Script
# This script helps you get started with the SmartestZone platform

echo "🚀 SmartestZone Platform - Quick Start"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Check for .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found"
    echo "   Please create .env.local with your Clerk credentials"
    echo "   See README.md for details"
    exit 1
fi

echo "✅ Found .env.local"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✅ Dependencies installed"
echo ""

# Display Clerk setup reminder
echo "📋 Clerk Setup Checklist:"
echo "   1. Create account at https://clerk.com"
echo "   2. Create a new application"
echo "   3. Enable Organizations in Settings"
echo "   4. Copy keys to .env.local"
echo ""

# Check if keys are configured
if grep -q "your_clerk_publishable_key" .env.local; then
    echo "⚠️  Warning: Default Clerk keys detected in .env.local"
    echo "   Please update with your actual Clerk credentials"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start the development server
echo "🚀 Starting development server..."
echo "   Visit: http://localhost:3000"
echo ""
echo "   Pages available:"
echo "   - Dashboard: /"
echo "   - Devices: /devices"
echo "   - Users: /users"
echo "   - AI Assistant: /ai-assistant"
echo "   - Analytics: /analytics"
echo "   - Settings: /settings"
echo ""
echo "   Press Ctrl+C to stop"
echo ""

npm run dev
