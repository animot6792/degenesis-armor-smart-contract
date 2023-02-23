# Degenesis Armor Smart Contract

This repository contains the smart contract for the Degenesis Armor, a test for that contract, and a script that deploys that contract.
The contract is build on

- [ERC721A Upgrade](https://github.com/chiru-labs/ERC721A-Upgradeable) implementation of IERC721 with significant gas savings for minting multiple NFTs in a single transaction
- [OpenZeppelin Upgrade](https://github.com/OpenZeppelin/openzeppelin-upgrades) libraries for secure smart contract development

## Quickstart

Run the following command to install all required dependencies:

```
npm install
```

Afterwards you have to set environment variables.
You can do so by setting them in the `.env` file (create it if it's not there).
The needed environment variables can be found in `hardhat.config.js` file.
Then try to run some of the following commands.

### Testing

```
npx hardhat test
```

### Deploying

```
npx hardhat run scripts/deployDegenesisArmor.js
```

### Verifying

```
npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
```

### Auditing

```
npm run audit
```

For this optional command Docker (configured for Windows) has to be installed.
This Docker container contains all of Trail of Bits’ Ethereum security tools, including

- [Echidna](https://github.com/trailofbits/echidna) property-based fuzz tester
- [Etheno](https://github.com/trailofbits/etheno) integration tool and differential tester
- [Manticore](https://github.com/trailofbits/manticore) symbolic analyzer and formal contract verifier
- [Slither](https://github.com/trailofbits/slither) static analysis tool
- [Rattle](https://github.com/trailofbits/rattle) EVM lifter
- [Not So Smart Contracts](https://github.com/trailofbits/not-so-smart-contracts) repository

For a static analysis you can use

```
slither . --solc-remaps "@openzeppelin=node_modules/@openzeppelin"
```

## Deployment costs

The following table shows the expected deployment costs depending on the gas price.

**Exchange rate**: $1653.33 USD/ETH

|                         | 20 gwei/gas             | 30 gwei/gas             | 40 gwei/gas             | 50 gwei/gas               | 60 gwei/gas               |
| ----------------------- | ----------------------- | ----------------------- | ----------------------- | ------------------------- | ------------------------- |
| **Contract Deployment** | 0.064 ETH ($106.05)     | 0.096 ETH ($159.08)     | 0.128 ETH ($212.10)     | 0.160 ETH ($265.12)       | 0.192 ETH ($318.14)       |
| **Airdrop**             | 0.180 ETH ($296.99)     | 0.270 ETH ($445.51)     | 0.360 ETH ($594.01)     | 0.450 ETH ($742.48)       | 0.539 ETH ($890.98)       |
| **Total**               | **0.224 ETH ($403.04)** | **0.366 ETH ($604.59)** | **0.488 ETH ($806.11)** | **0.610 ETH ($1,007.60)** | **0.731 ETH ($1,209.16)** |
