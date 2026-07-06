# Arc Payment Platform - Deployment Guide

This guide covers deploying the Arc Payment Platform to production environments.

## Prerequisites

- Arc wallet with testnet/mainnet tokens
- Deployed smart contracts with verified addresses
- MongoDB database (cloud-hosted recommended)
- Node.js hosting (Heroku, AWS, DigitalOcean, etc.)
- Frontend hosting (Vercel, Netlify, etc.)

## Smart Contract Deployment

### 1. Prepare Contracts

```bash
cd contracts
npm install
npm run compile
```

### 2. Deploy to Testnet

```bash
# Create .env file
cat > .env << EOF
PRIVATE_KEY=your_private_key_here
ARC_TESTNET_RPC_URL=https://testnet-rpc.arc.io
ETHERSCAN_API_KEY=your_api_key
EOF

# Deploy
npm run deploy:testnet
```

### 3. Deploy to Mainnet

```bash
# Update .env
cat > .env << EOF
PRIVATE_KEY=your_mainnet_private_key
ARC_MAINNET_RPC_URL=https://mainnet-rpc.arc.io
ETHERSCAN_API_KEY=your_api_key
EOF

# Deploy
npm run deploy:mainnet
```

Save contract addresses from deployment output.

## Backend Deployment

### Option 1: Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create arc-payment-backend

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set ARC_RPC_URL=https://mainnet-rpc.arc.io
heroku config:set ARC_TOKEN_ADDRESS=0x...
heroku config:set PAYMENT_PROCESSOR_ADDRESS=0x...

# Deploy
git push heroku main
```

### Option 2: AWS EC2

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/yourusername/arc-payment-platform.git
cd arc-payment-platform/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Add your configuration

# Start with PM2
npm install -g pm2
pm2 start src/server.js --name "arc-payment-backend"
pm2 save

# Configure Nginx as reverse proxy
sudo apt-get install nginx
sudo systemctl enable nginx
```

### Option 3: DigitalOcean App Platform

1. Connect GitHub repository
2. Create new app from repository
3. Configure environment variables in dashboard
4. Deploy

## Frontend Deployment

### Option 1: Vercel

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables in dashboard
REACT_APP_ARC_TOKEN_ADDRESS=0x...
REACT_APP_PAYMENT_PROCESSOR_ADDRESS=0x...
REACT_APP_API_URL=https://your-backend-domain.com
```

### Option 2: Netlify

```bash
cd frontend

# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=build

# Configure environment variables in dashboard
```

### Option 3: GitHub Pages

```bash
cd frontend

# Build
npm run build

# Create GitHub Pages branch
git checkout -b gh-pages
git add build
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

## Database Setup

### MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and project
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in backend environment variables

### Local MongoDB

```bash
# Install MongoDB
brew install mongodb-community

# Start service
brew services start mongodb-community

# Verify
mongosh
```

## SSL/TLS Certificate

### Using Let's Encrypt (Free)

```bash
# For Nginx on Linux
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

### Using AWS Certificate Manager

1. Go to AWS Console → Certificate Manager
2. Request certificate for your domain
3. Verify domain ownership
4. Attach to load balancer

## Monitoring & Maintenance

### Application Monitoring
- Use DataDog, New Relic, or Sentry
- Set up error alerts
- Monitor performance metrics

### Database Monitoring
- Set up MongoDB Atlas alerts
- Regular backups (automated by Atlas)
- Monitor connections and performance

### Smart Contract Monitoring
- Use Etherscan API for transaction tracking
- Set up event listeners for payments
- Monitor gas prices and network activity

## Security Checklist

- [ ] All secrets in environment variables (never in code)
- [ ] HTTPS/SSL enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled on API endpoints
- [ ] Input validation on all routes
- [ ] Database backups automated
- [ ] Smart contracts audited
- [ ] Private keys stored securely (hardware wallet or KMS)
- [ ] DDoS protection configured
- [ ] Regular security updates

## Troubleshooting

### High Gas Fees
- Monitor network congestion
- Implement gas price optimization
- Batch transactions when possible

### Database Performance
- Create appropriate indexes
- Archive old transactions
- Use connection pooling

### API Rate Limiting
- Implement exponential backoff
- Cache frequently requested data
- Use CDN for static content

## Support

For deployment support, consult your hosting provider's documentation or contact their support team.
