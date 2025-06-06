#!/bin/bash

# Enable strict error handling
set -e  # Exit on any command failure
set -u  # Exit on undefined variables

# Master setup script for sqd-push-telegram project
# This script runs all necessary commands in the correct order

echo "🚀 Starting sqd-push-telegram setup..."
echo "=================================="

# Step 1: Start Hasura Docker container
echo "📦 1. Starting Hasura Docker container..."
chmod +x hasura/docker.hasura.sh
if ! ./hasura/docker.hasura.sh; then
    echo "❌ Failed to start Hasura Docker container!"
    exit 1
fi

# Wait for Hasura to be ready
echo "⏳ Waiting for Hasura to start (10 seconds)..."
sleep 10

# Step 2: Track the pool table
echo "📊 2. Tracking pool table in Hasura..."
chmod +x hasura/track_trigger_new_riddle.sh
if ! ./hasura/track_trigger_new_riddle.sh; then
    echo "❌ Failed to track pool table!"
    exit 1
fi

# Wait a moment
echo "⏳ Waiting 3 seconds..."
sleep 3

# Step 3: Create event trigger
echo "🎯 3. Creating pool insert event trigger..."
chmod +x hasura/create-trigger.sh
if ! ./hasura/create-trigger.sh; then
    echo "❌ Failed to create event trigger!"
    echo "💡 Make sure your .env file exists and contains all required variables"
    exit 1
fi

# Step 4: Start Elysia API server
echo "🦊 4. Starting Elysia API server..."
cd riddle-api

# Check if bun is available, otherwise use npm
if command -v bun &> /dev/null; then
    echo "📦 Using Bun to start server..."
    bun run dev &
elif command -v npm &> /dev/null; then
    echo "📦 Using npm to start server..."
    npm run dev &
else
    echo "❌ Neither Bun nor npm found. Please install one of them."
    exit 1
fi

# Go back to root
cd ../..

echo ""
echo "✅ Setup complete!"
echo "=================================="

