// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "../contracts/ArcPaymentToken.sol";
import "../contracts/ArcPaymentProcessor.sol";

contract ArcPaymentPlatform {
    ArcPaymentToken public arcToken;
    ArcPaymentProcessor public processor;
    
    event PlatformInitialized(address indexed token, address indexed processor);
    
    constructor() {
        arcToken = new ArcPaymentToken();
        processor = new ArcPaymentProcessor(address(arcToken), msg.sender);
        emit PlatformInitialized(address(arcToken), address(processor));
    }
}
