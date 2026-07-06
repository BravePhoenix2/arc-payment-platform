# Getting Started with Arc Payment Platform

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
cd /Users/phoenix/Arc-payment-platform
npm run install-all
```

### 2. Set Up Environment Variables

**Backend:**
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

**Frontend:**
```bash
cd ../frontend
cp .env.example .env.local
# Edit with contract addresses
```

**Contracts:**
```bash
cd ../contracts
cp .env.example .env
# Edit with your private key
```

### 3. Start Development Server

```bash
cd /Users/phoenix/Arc-payment-platform
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Smart Contract Deployment

### Compile Contracts

```bash
cd contracts
npm run compile
```

### Deploy to Arc Testnet

```bash
npm run deploy:testnet
```

You'll see output like:
```
ArcPaymentToken deployed to: 0x...
ArcPaymentProcessor deployed to: 0x...
```

Save these addresses for frontend/backend configuration.

## Configuration

### Add Contract Addresses

**Backend** (`backend/.env`):
```
ARC_TOKEN_ADDRESS=0x... (from deployment)
PAYMENT_PROCESSOR_ADDRESS=0x... (from deployment)
```

**Frontend** (`frontend/.env.local`):
```
REACT_APP_ARC_TOKEN_ADDRESS=0x...
REACT_APP_PAYMENT_PROCESSOR_ADDRESS=0x...
```

### MongoDB Setup

**Local Development:**
```bash
# Start MongoDB
mongod
```

**Production (MongoDB Atlas):**
1. Go to mongodb.com/cloud/atlas
2. Create free tier cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## Usage

### Send a Payment

1. Connect wallet in frontend
2. Click "Send Payment"
3. Enter recipient address and amount
4. Confirm transaction in wallet
5. Track in Payment History

### Receive a Payment

1. Connect wallet
2. Payee receives payment notification
3. Click "Accept Payment" to complete
4. Tokens transfer with fees deducted

## Troubleshooting

**Can't connect wallet:**
- Install MetaMask
- Switch to Arc network
- Reload page

**Transaction fails:**
- Check token allowance
- Verify account balance
- Check network is correct

**Backend won't start:**
- Verify MongoDB is running
- Check port 5000 is available
- Review logs for errors

## Next Steps

1. Deploy smart contracts to mainnet
2. Set up MongoDB Atlas for production
3. Deploy backend to Heroku/AWS
4. Deploy frontend to Vercel/Netlify
5. Update environment variables for production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Support

- Check README.md for comprehensive documentation
- Review smart contract comments for function details
- Check backend routes for API documentation
- React component comments for UI logic
