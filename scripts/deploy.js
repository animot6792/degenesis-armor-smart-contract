// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const payments = [0xE8F8eD5E4E07bb87330780269f4147B6113b8a8B, 0xa35fa69E715975128c659e04B0D5f6FE26422f28];
  const shares = [80, 20];
  const baseUri = "https://ipfs.io/ipfs/QmNyfoZKitFgVcrZcbQTSqA4n415pSviHqxh7sGycwZMtL/";

  const mochiMo = await hre.ethers.getContractFactory("MochiMo");
  const mochiMoInstance = await mochiMo.deploy(payments, shares, baseUri);

  await mochiMoInstance.deployed();

  console.log(
    "Smart Contract with baseUri ${baseUri} deployed to ${mochiMoInstance.address}"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
