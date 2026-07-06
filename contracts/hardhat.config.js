require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    "arc-testnet": {
      url: process.env.ARC_TESTNET_RPC_URL || "https://testnet-rpc.arc.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 2147483647
    },
    "arc-mainnet": {
      url: process.env.ARC_MAINNET_RPC_URL || "https://mainnet-rpc.arc.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 0
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
