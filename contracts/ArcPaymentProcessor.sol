// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ArcPaymentProcessor
 * @dev Processes payments on Arc Layer 1 blockchain
 */
contract ArcPaymentProcessor is Ownable, ReentrancyGuard {
    
    IERC20 public arcToken;
    
    // Payment state
    struct Payment {
        address payer;
        address payee;
        uint256 amount;
        uint256 timestamp;
        string description;
        bool completed;
        bool refunded;
    }

    mapping(uint256 => Payment) public payments;
    mapping(address => uint256[]) public userPayments;
    
    uint256 public paymentCounter = 0;
    uint256 public totalProcessed = 0;
    
    // Fee configuration
    uint256 public feePercentage = 25; // 0.25% fee (in basis points)
    address public feeCollector;
    
    event PaymentInitiated(uint256 indexed paymentId, address indexed payer, address indexed payee, uint256 amount);
    event PaymentCompleted(uint256 indexed paymentId, uint256 fee);
    event PaymentRefunded(uint256 indexed paymentId, uint256 amount);
    event FeeUpdated(uint256 newFeePercentage);

    constructor(address _arcToken, address _feeCollector) {
        arcToken = IERC20(_arcToken);
        feeCollector = _feeCollector;
    }

    /**
     * @dev Initiate a payment
     * @param payee Recipient address
     * @param amount Payment amount
     * @param description Payment description
     */
    function initiatePayment(
        address payee,
        uint256 amount,
        string memory description
    ) public nonReentrant returns (uint256) {
        require(payee != address(0), "Invalid payee address");
        require(amount > 0, "Amount must be greater than 0");
        require(arcToken.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(arcToken.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");

        // Transfer tokens from payer to contract
        require(arcToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Create payment record
        uint256 paymentId = paymentCounter;
        payments[paymentId] = Payment({
            payer: msg.sender,
            payee: payee,
            amount: amount,
            timestamp: block.timestamp,
            description: description,
            completed: false,
            refunded: false
        });

        userPayments[msg.sender].push(paymentId);
        userPayments[payee].push(paymentId);

        paymentCounter++;
        emit PaymentInitiated(paymentId, msg.sender, payee, amount);

        return paymentId;
    }

    /**
     * @dev Complete a payment (only payee can complete)
     * @param paymentId ID of the payment
     */
    function completePayment(uint256 paymentId) public nonReentrant {
        Payment storage payment = payments[paymentId];
        require(payment.payee == msg.sender, "Only payee can complete payment");
        require(!payment.completed, "Payment already completed");
        require(!payment.refunded, "Payment already refunded");

        // Calculate fee
        uint256 fee = (payment.amount * feePercentage) / 10000;
        uint256 payeeAmount = payment.amount - fee;

        // Transfer to payee and fee collector
        require(arcToken.transfer(payment.payee, payeeAmount), "Transfer to payee failed");
        if (fee > 0) {
            require(arcToken.transfer(feeCollector, fee), "Fee transfer failed");
        }

        payment.completed = true;
        totalProcessed += payment.amount;
        emit PaymentCompleted(paymentId, fee);
    }

    /**
     * @dev Refund a payment (only payer can refund)
     * @param paymentId ID of the payment
     */
    function refundPayment(uint256 paymentId) public nonReentrant {
        Payment storage payment = payments[paymentId];
        require(payment.payer == msg.sender, "Only payer can refund");
        require(!payment.completed, "Cannot refund completed payment");
        require(!payment.refunded, "Payment already refunded");

        // Refund tokens to payer
        require(arcToken.transfer(payment.payer, payment.amount), "Refund failed");

        payment.refunded = true;
        emit PaymentRefunded(paymentId, payment.amount);
    }

    /**
     * @dev Get payment details
     * @param paymentId ID of the payment
     */
    function getPaymentDetails(uint256 paymentId) 
        public 
        view 
        returns (Payment memory) 
    {
        return payments[paymentId];
    }

    /**
     * @dev Get user payment history
     * @param user User address
     */
    function getUserPayments(address user) 
        public 
        view 
        returns (uint256[] memory) 
    {
        return userPayments[user];
    }

    /**
     * @dev Update fee percentage (only owner)
     * @param newFeePercentage New fee in basis points
     */
    function updateFeePercentage(uint256 newFeePercentage) public onlyOwner {
        require(newFeePercentage <= 500, "Fee cannot exceed 5%");
        feePercentage = newFeePercentage;
        emit FeeUpdated(newFeePercentage);
    }

    /**
     * @dev Get total platform statistics
     */
    function getStats() public view returns (
        uint256 totalPayments,
        uint256 totalAmount,
        uint256 currentFeePercentage
    ) {
        return (paymentCounter, totalProcessed, feePercentage);
    }
}
