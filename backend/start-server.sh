#!/bin/bash

echo "🚀 Starting PawHaven Backend Server..."
echo "=================================="

# Navigate to backend directory
cd "$(dirname "$0")"
echo "Current directory: $(pwd)"

# Check if we're in the right directory
if [ ! -f "mvnw" ]; then
    echo "❌ Error: mvnw not found. Please run this script from the backend directory."
    exit 1
fi

# Check if Java is available
if ! command -v java &> /dev/null; then
    echo "❌ Error: Java not found. Please install Java and try again."
    exit 1
fi

echo "☕ Java version:"
java -version

echo ""
echo "🔨 Building and starting the application..."
echo "This may take a few minutes on the first run..."
echo ""

# Make mvnw executable
chmod +x mvnw

# Try to run the application
if ./mvnw clean spring-boot:run; then
    echo "✅ Server started successfully!"
else
    echo "❌ Failed to start server. Trying alternative method..."
    
    # Try building first, then running
    echo "📦 Building application..."
    if ./mvnw clean package -DskipTests; then
        echo "🚀 Running application..."
        java -jar target/*.jar
    else
        echo "❌ Build failed. Please check the error messages above."
        exit 1
    fi
fi