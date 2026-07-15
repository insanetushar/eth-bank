# Simple ETH Staking Contract

A basic Ethereum staking contract built with **Solidity**, **Hardhat v3**, and **ethers.js**.

## Features

- Deposit ETH into the staking contract
- Track deposited balance for each user
- Withdraw deposited ETH
- Fixed percentage reward on withdrawal
- Owner-configurable reward percentage
- Owner-only funding of the reward pool
- Events emitted for deposits, withdrawals, and reward updates

## Tech Stack

- Solidity ^0.8.28
- Hardhat v3
- ethers.js v6
- TypeScript

## Smart Contract

### Constructor

```solidity
constructor(uint256 rewardPercent)
```

Initializes the contract owner and sets the initial reward percentage.

### Functions

#### `deposit()`

Deposits ETH into the staking contract.

#### `withdraw(uint256 amount)`

Withdraws the specified amount along with the configured reward.

#### `fundContract()`

Owner-only function used to fund the reward pool.

#### `updateRewardPercent(uint256 newRewardPercent)`

Owner-only function to update the reward percentage.

#### `contractBalance()`

Returns the current ETH balance held by the contract.

## Running the Project

### Install dependencies

```bash
npm install
```

### Compile

```bash
npx hardhat compile
```

### Run the interaction script

```bash
npx hardhat run scripts/interact.ts
```

## Example Flow

1. Deploy the contract with an initial reward percentage.
2. Fund the reward pool as the contract owner.
3. User deposits ETH.
4. User withdraws a portion of their deposited ETH.
5. User receives:
   - Principal
   - Reward based on the configured percentage

## Manual Execution Steps

### 1. Clone the repository

```bash
git clone https://github.com/insanetushar/eth-bank.git
cd eth-bank
```

### 2. Install dependencies

```bash
npm install
```

### 3. Compile the smart contract

```bash
npx hardhat compile
```

### 4. Execute the interaction script

This script deploys the contract, funds the reward pool, performs a deposit, and withdraws funds with rewards.

```bash
npx hardhat run scripts/interact.ts
```

## Events

```solidity
Deposited(address indexed user, uint256 amount)

Withdrawn(address indexed user, uint256 principal, uint256 reward)

RewardPercentUpdated(
    uint256 oldRewardPercent,
    uint256 newRewardPercent
)
```

## Notes

This project implements a simplified staking mechanism intended for demonstration and interview purposes. Rewards are calculated using the current reward percentage at the time of withdrawal and are funded by the contract owner.
