#!/bin/bash

# CloudChat Development Script
echo "🚀 Starting CloudChat development server..."

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🔥 Starting development server on http://localhost:8787"
echo "📱 Open your browser and navigate to the URL above"
echo "🔄 The server will automatically reload when you make changes"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev