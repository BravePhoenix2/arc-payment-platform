# Quick Start Commands

## Installation
npm run install-all

## Development
npm run dev                    # Run all services
npm run backend:dev            # Backend only
npm run frontend:start         # Frontend only
npm run contracts:compile      # Compile contracts

## Deployment
npm run contracts:deploy       # Deploy to testnet
npm run contracts:deploy:mainnet # Deploy to mainnet

## Production Build
npm --prefix frontend run build
npm --prefix backend start

## Database
# Start MongoDB locally
mongod

# Or use MongoDB Atlas for production
# Update MONGODB_URI in backend/.env
