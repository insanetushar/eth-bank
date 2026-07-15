// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimpleStaking {
    address public owner;
    uint256 public rewardPercent;

    mapping(address => uint256) public balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(
        address indexed user,
        uint256 principal,
        uint256 reward
    );
    event RewardPercentUpdated(
        uint256 oldRewardPercent,
        uint256 newRewardPercent
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(uint256 _rewardPercent) {
        owner = msg.sender;
        rewardPercent = _rewardPercent;
    }

    function deposit() external payable {
        require(msg.value > 0, "Amount must be greater than 0");

        balances[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        uint256 reward = (amount * rewardPercent) / 100;
        uint256 payout = amount + reward;

        require(
            address(this).balance >= payout,
            "Insufficient contract balance"
        );

        balances[msg.sender] -= amount;

        (bool success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Transfer failed");

        emit Withdrawn(msg.sender, amount, reward);
    }

    function updateRewardPercent(
        uint256 newRewardPercent
    ) external onlyOwner {
        uint256 oldRewardPercent = rewardPercent;
        rewardPercent = newRewardPercent;

        emit RewardPercentUpdated(oldRewardPercent, newRewardPercent);
    }

    function fundContract() external payable onlyOwner {}

    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}