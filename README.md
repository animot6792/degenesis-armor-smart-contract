# Degenesis Armor Smart Contract

This repository contains the smart contract for the Degenesis Armor, a test for that contract, and a script that deploys that contract.
The contract is build on

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
npx hardhat run scripts/deploy.js
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
