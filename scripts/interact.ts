import { network } from "hardhat";

async function main() {
  // Connect to Hardhat Runtime Environment
  const { ethers } = await network.getOrCreate();

  // Get accounts
  const [owner, user] = await ethers.getSigners();

  console.log("Owner:", owner.address);
  console.log("User :", user.address);

  // Deploy contract with 10% reward
  const Staking = await ethers.getContractFactory("SimpleStaking");

  const staking = await Staking.deploy(10);

  await staking.waitForDeployment();

  const contractAddress = await staking.getAddress();

  console.log("\nContract deployed to:", contractAddress);

  // Owner funds reward pool
  console.log("\nFunding reward pool with 5 ETH...");

  await (
    await staking.connect(owner).fundContract({
      value: ethers.parseEther("5"),
    })
  ).wait();

  console.log("Reward pool funded.");

  // User deposits
  console.log("\nUser depositing 1 ETH...");

  await (
    await staking.connect(user).deposit({
      value: ethers.parseEther("1"),
    })
  ).wait();

  let balance = await staking.balances(user.address);

  console.log(
    "User deposited:",
    ethers.formatEther(balance),
    "ETH"
  );

  console.log(
    "Contract balance:",
    ethers.formatEther(await staking.contractBalance()),
    "ETH"
  );

  // Withdraw
  console.log("\nUser withdrawing 0.5 ETH...");

  await (
    await staking
      .connect(user)
      .withdraw(ethers.parseEther("0.5"))
  ).wait();

  balance = await staking.balances(user.address);

  console.log(
    "Remaining deposited balance:",
    ethers.formatEther(balance),
    "ETH"
  );

  console.log(
    "Contract balance:",
    ethers.formatEther(await staking.contractBalance()),
    "ETH"
  );

  console.log(
    "Reward Percent:",
    (await staking.rewardPercent()).toString(),
    "%"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});