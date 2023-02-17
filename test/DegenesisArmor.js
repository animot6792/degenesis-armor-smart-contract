const { expect } = require("chai");
const { utils } = require("ethers");

require('dotenv').config();

describe("Degenesis Armor airdrop testing", function () {

  const baseUri = "ipfs://bafybeibqtmvi55pxlomxpmp2x5y6cfkcj7usd52g2ntcgpzq6eqwjrz3z4/";

  it('testing full airdrop', async () => {
    const [developer, whitelist1, whitelist2, public1, public2, beneficiary1, beneficiary2] = await ethers.getSigners();
    const degenesis = await ethers.getContractFactory("ERC721Mint");
    const degenesisInstance = await degenesis.deploy();
    const degenesisArmor = await ethers.getContractFactory("DegenesisArmor");
    const degenesisArmorInstance = await upgrades.deployProxy(degenesisArmor, [degenesisInstance.address, baseUri], { initializer: 'initialize' });

    //Mint all Degenesis token with Public 1 wallet
    await degenesisInstance.connect(public1).mint(300);

    // Wrong quantity for the airdrop
    await expect(
      degenesisArmorInstance.airdropToDegenesisOwners(0, 299, 2)
    ).revertedWith("Reached minting limit!");

    // Wrong token id range for the airdrop
    await expect(
      degenesisArmorInstance.airdropToDegenesisOwners(0, 300, 1)
    ).revertedWith("Invalid token ids!");

    // Correct airdrop
    await degenesisArmorInstance.airdropToDegenesisOwners(0, 299, 1);

    // Wrong quantity for the airdrop
    await expect(
      degenesisArmorInstance.airdropToDegenesisOwners(0, 0, 1)
    ).revertedWith("Reached minting limit!");

    expect(await degenesisArmorInstance.numMinted()).to.equal(300);
    expect(await degenesisInstance.ownerOf(1) == await degenesisArmorInstance.ownerOf(1));

  });

  it('testing airdrop with burned Degenesis', async () => {
    const [developer, whitelist1, whitelist2, public1, public2, beneficiary1, beneficiary2] = await ethers.getSigners();
    const degenesis = await ethers.getContractFactory("ERC721Mint");
    const degenesisInstance = await degenesis.deploy();
    const degenesisArmor = await ethers.getContractFactory("DegenesisArmor");
    const degenesisArmorInstance = await upgrades.deployProxy(degenesisArmor, [degenesisInstance.address, baseUri], { initializer: 'initialize' });

    //Mint all Degenesis token with Public 1 wallet
    await degenesisInstance.connect(public1).mint(300);

    // Burn token id 1
    await degenesisInstance.connect(public1).burn(1);

    // Wrong quantity for the airdrop
    await expect(
      degenesisArmorInstance.airdropToDegenesisOwners(0, 299, 2)
    ).revertedWith("Reached minting limit!");

    // Wrong token id range for the airdrop
    await expect(
      degenesisArmorInstance.airdropToDegenesisOwners(0, 300, 1)
    ).revertedWith("Invalid token ids!");

    // Correct airdrop
    await degenesisArmorInstance.airdropToDegenesisOwners(0, 299, 1);

    expect(await degenesisArmorInstance.numMinted()).to.equal(300);
    // Airdrop of burned token was send to owner wallet
    expect(developer == await degenesisArmorInstance.ownerOf(1));

  });

});