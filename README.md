# Arc Payment Platform

A comprehensive Web3 payment platform built for Arc Layer 1 blockchain. This full-stack solution enables secure, transparent, and efficient payments using smart contracts and a modern web interface.

## Features

- 🔐 **Secure Smart Contracts** - ERC20 token and payment processor with reentrancy guards
- 💳 **Web3 Wallet Integration** - MetaMask and compatible wallet support
- 💰 **Payment Processing** - Send, receive, and manage payments on Arc Layer 1
- 📊 **Payment History** - Track all transactions with detailed information
- 🔄 **Refund Management** - Secure refund mechanism for pending payments
- ⚙️ **Admin Dashboard** - Platform statistics and management tools
- 📱 **Responsive UI** - Modern, mobile-friendly interface
- 🗄️ **MongoDB Backend** - Persistent data storage for payments and users

## Project Structure

```
arc-payment-platform/
├── contracts/                 # Smart contracts (Solidity)
│   ├── ArcPaymentToken.sol   # ERC20 payment token
│   ├── ArcPaymentProcessor.sol # Payment processing logic
│   ├── hardhat.config.js     # Hardhat configuration
│   └── package.json
├── frontend/                  # React dApp
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── WalletConnect.jsx # Wallet integration
│   │   ├── SendPayment.jsx   # Payment form
│   │   ├── PaymentHistory.jsx # Transaction history
│   │   └── App.css           # Styling
│   ├── public/
│   └── package.json
├── backend/                   # Node.js Express API
│   ├── src/
│   │   ├── server.js         # Express server
│   │   ├── models/           # Database models
│   │   └── routes/           # API routes
│   ├── .env.example
│   └── package.json
├── docs/                      # Documentation
├── package.json              # Root package
└── README.md                 # This file
```

## Prerequisites

- Node.js v16+ and npm/yarn
- MetaMask or compatible Web3 wallet
- MongoDB (for backend)
- Solidity 0.8.19+ (for smart contracts)

## Installation

### 1. Clone and Install Dependencies

```bash
cd /Users/phoenix/Arc-payment-platform
npm run install-all
```

### 2. Smart Contracts Setup

```bash
cd contracts
cp .env.example .env
# Edit .env with your configuration
npm run compile
npm run deploy:testnet  # Deploy to Arc testnet
```

### 3. Backend Setup

```bash
cd ../backend
cp .env.example .env
# Edit .env with:
# - MONGODB_URI
# - ARC_RPC_URL
# - ARC_TOKEN_ADDRESS (from contract deployment)
# - PAYMENT_PROCESSOR_ADDRESS (from contract deployment)
npm start
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd ../frontend
cp .env.example .env.local
# Edit .env.local with contract addresses
npm start
```

Frontend will run on `http://localhost:3000`

## Smart Contracts

### ArcPaymentToken

An ERC20 token implementation for the Arc Payment Platform.

- **Max Supply**: 1 billion tokens
- **Initial Mint**: 100 million tokens
- **Features**: Burnable, Ownable, Standard ERC20

### ArcPaymentProcessor

Main contract for processing payments.

- **Payment Initiation**: Users can create payments
- **Payment Completion**: Payees accept and complete payments
- **Refund Mechanism**: Payers can refund pending payments
- **Fee System**: Configurable platform fees (0.25% default)

## API Endpoints

### Payments
- `GET /api/payments/:address` - Get payments for a user
- `GET /api/payments/details/:paymentId` - Get payment details
- `GET /api/payments/status/pending` - Get pending payments
- `POST /api/payments/webhook` - Webhook for blockchain events

### Users
- `GET /api/users/:address` - Get user profile
- `GET /api/users` - List all users (admin)
- `PUT /api/users/:address` - Update user profile

### Statistics
- `GET /api/stats` - Get platform statistics
- `GET /api/stats/daily/:days` - Get daily statistics

### Health
- `GET /api/health` - Health check

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/arc-payment
PORT=5000
ARC_RPC_URL=https://testnet-rpc.arc.io
ARC_TOKEN_ADDRESS=0x...
PAYMENT_PROCESSOR_ADDRESS=0x...
WEBHOOK_TOKEN=your-secret-token
```

### Frontend (.env.local)
```
REACT_APP_ARC_TOKEN_ADDRESS=0x...
REACT_APP_PAYMENT_PROCESSOR_ADDRESS=0x...
```

### Contracts (.env)
```
PRIVATE_KEY=your-private-key
ARC_TESTNET_RPC_URL=https://testnet-rpc.arc.io
```

## Development

### Run All Services (Concurrently)

```bash
npm run dev
```

### Run Individual Services

```bash
# Backend
npm run backend:dev

# Frontend
npm run frontend:start

# Contracts
npm run contracts:compile
npm run contracts:deploy
```

## Testing

### Smart Contracts
```bash
cd contracts
npm test
```

### Backend
```bash
cd backend
npm test
```

## Deployment

### Deploy to Arc Testnet

1. Set up environment variables in `contracts/.env`
2. Deploy contracts:
   ```bash
   cd contracts
   npm run deploy:testnet
   ```
3. Update contract addresses in backend and frontend `.env` files
4. Deploy backend to a Node.js hosting service (Heroku, AWS, DigitalOcean, etc.)
5. Deploy frontend to a static hosting service (Vercel, Netlify, GitHub Pages, etc.)

### Deploy to Arc Mainnet

Replace `arc-testnet` with `arc-mainnet` in deployment commands.

## Security Considerations

- ✅ Reentrancy guards on payment transfers
- ✅ Input validation on all contract functions
- ✅ Owned functions protected with `onlyOwner` modifier
- ✅ Fee cap to prevent excessive charges
- ⚠️ Never commit private keys to version control
- ⚠️ Use secure environment variable management
- ⚠️ Audit smart contracts before mainnet deployment

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

### Wallet Connection Failed
- Install MetaMask or compatible wallet
- Ensure you're on the correct network (Arc Testnet/Mainnet)

### Contract Deployment Failed
- Check private key and account balance for gas fees
- Verify RPC URL is accessible
- Ensure Solidity version matches contract requirements

### Transaction Fails
- Check token allowance: approve spending before payment
- Verify account balance is sufficient
- Check network gas prices

## License

MIT

## Support

For issues, questions, or contributions, please open an issue in the repository.

## Roadmap

- [ ] Advanced payment scheduling
- [ ] Multi-token support
- [ ] Payment splitting
- [ ] Escrow mechanism
- [ ] Governance token
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] API documentation (Swagger/OpenAPI)

---

Built with ❤️ for Arc Layer 1 Blockchain
