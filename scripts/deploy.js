const hre = require("hardhat");

async function main() {
  const NFTMinter = await hre.ethers.getContractFactory("NFTMinter");
  const minter = await NFTMinter.deploy();
  await minter.waitForDeployment();

  console.log("NFTMinter deployed to:", minter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
