#!/bin/bash

# CloudChat Deployment Script
echo "🚀 Deploying CloudChat to Cloudflare Pages..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI is not installed. Please install it with: npm install -g wrangler"
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run check

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy to Cloudflare
echo "🌐 Deploying to Cloudflare..."
wrangler deploy

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🎉 Your chat app is now live on Cloudflare Pages!"
    echo "📱 Share the URL with friends to start chatting!"
else
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi