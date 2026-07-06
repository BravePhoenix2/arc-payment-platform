// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/**
 * @title ArcPaymentToken
 * @dev Arc Layer 1 Payment Token for the Arc Payment Platform
 */
contract ArcPaymentToken is ERC20, ERC20Burnable, Ownable {
    
    // Minting cap to prevent inflation
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    
    event MintedTokens(address indexed to, uint256 amount);
    event BurntTokens(address indexed from, uint256 amount);

    constructor() ERC20("Arc Payment Token", "ARC") {
        // Initial mint to contract deployer
        _mint(msg.sender, 100000000 * 10**18); // 100 million initial tokens
    }

    /**
     * @dev Mint new tokens (only owner)
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
        emit MintedTokens(to, amount);
    }

    /**
     * @dev Burn tokens (anyone can burn their tokens)
     * @param amount Amount to burn
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
        emit BurntTokens(msg.sender, amount);
    }

    /**
     * @dev Decimals for the token
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
