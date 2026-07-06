#!/bin/bash

echo "🚀 Arc Payment Platform - Quick Start"
echo "====================================="
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Check npm installation
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Set up environment variables:"
echo "   - backend/.env"
echo "   - frontend/.env.local"
echo "   - contracts/.env"
echo ""
echo "2. Deploy smart contracts:"
echo "   npm run contracts:deploy:testnet"
echo ""
echo "3. Start development servers:"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
