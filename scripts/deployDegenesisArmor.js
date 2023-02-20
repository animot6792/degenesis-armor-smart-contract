// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const degenesisAddress = "0x6199f109A7D9673aa09a3425AA6AF80D8ef63D14";
const baseUri = "ipfs://bafybeibqtmvi55pxlomxpmp2x5y6cfkcj7usd52g2ntcgpzq6eqwjrz3z4/";

async function main() {
  const degenesisArmor = await ethers.getContractFactory("DegenesisArmor");
  const degenesisArmorInstance = await upgrades.deployProxy(degenesisArmor, [degenesisAddress, baseUri], { initializer: 'initialize' });

  await degenesisArmorInstance.deployed();

  console.log("Smart Contract with deployed to " + degenesisArmorInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
