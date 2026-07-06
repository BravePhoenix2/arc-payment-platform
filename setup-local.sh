#!/bin/bash
# Quick setup script for Arc Payment Platform

echo "🚀 Arc Payment Platform - Setup Script"
echo "======================================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo ""
    echo "📦 Install Node.js:"
    echo "   macOS: brew install node"
    echo "   or download from https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Set contract addresses (you'll update these after deployment)
echo "📝 Update these files with your contract addresses:"
echo "   - backend/.env"
echo "   - frontend/.env.local"
echo ""

# Create environment files if they don't exist
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
fi

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.example frontend/.env.local
    echo "✅ Created frontend/.env.local"
fi

if [ ! -f "contracts/.env" ]; then
    cp contracts/.env.example contracts/.env
    echo "✅ Created contracts/.env"
fi

echo ""
echo "🔧 Install dependencies"
npm run install-all

echo ""
echo "✅ Setup complete!"
echo ""
echo "📖 Next steps:"
echo ""
echo "1️⃣  Deploy smart contracts:"
echo "   cd contracts && npm run deploy:testnet"
echo ""
echo "2️⃣  Configure environment variables:"
echo "   - Update contract addresses in backend/.env and frontend/.env.local"
echo "   - Update MongoDB URI in backend/.env"
echo ""
echo "3️⃣  Start development:"
echo "   npm run dev"
echo ""
echo "4️⃣  Deploy to Vercel:"
echo "   See VERCEL_DEPLOYMENT.md for instructions"
echo ""
