const hre = require("hardhat");

async function main() {
  console.log("Deploying Arc Payment Platform contracts...");

  // Deploy ArcPaymentToken
  console.log("\n1. Deploying ArcPaymentToken...");
  const ArcPaymentToken = await hre.ethers.getContractFactory("ArcPaymentToken");
  const arcToken = await ArcPaymentToken.deploy();
  await arcToken.deployed();
  console.log("✅ ArcPaymentToken deployed to:", arcToken.address);

  // Deploy ArcPaymentProcessor
  console.log("\n2. Deploying ArcPaymentProcessor...");
  const ArcPaymentProcessor = await hre.ethers.getContractFactory("ArcPaymentProcessor");
  const feeCollector = (await hre.ethers.getSigners())[0].address;
  const processor = await ArcPaymentProcessor.deploy(arcToken.address, feeCollector);
  await processor.deployed();
  console.log("✅ ArcPaymentProcessor deployed to:", processor.address);

  // Verify on Etherscan
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n3. Verifying contracts on Etherscan...");
    console.log("\nWait for a few block confirmations before running:");
    console.log(`npx hardhat verify --network ${hre.network.name} ${arcToken.address}`);
    console.log(`npx hardhat verify --network ${hre.network.name} ${processor.address} ${arcToken.address} ${feeCollector}`);
  }

  // Print environment variables
  console.log("\n\n✨ Deployment Complete!");
  console.log("\n📝 Add these to your .env files:\n");
  console.log("Backend (.env):");
  console.log(`ARC_TOKEN_ADDRESS=${arcToken.address}`);
  console.log(`PAYMENT_PROCESSOR_ADDRESS=${processor.address}`);
  
  console.log("\nFrontend (.env.local):");
  console.log(`REACT_APP_ARC_TOKEN_ADDRESS=${arcToken.address}`);
  console.log(`REACT_APP_PAYMENT_PROCESSOR_ADDRESS=${processor.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
