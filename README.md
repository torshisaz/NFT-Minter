# NFT Minter

A simple NFT minting dApp with a React frontend and Solidity backend.

## Features

- Mint ERC721 NFTs with custom metadata
- View owned NFTs
- Simple gallery view
- MetaMask integration

## Structure

```
contracts/
  NFTMinter.sol    ERC721 minting contract
frontend/
  App.jsx          React UI
  mint.js          Web3 integration
scripts/
  deploy.js
```

## Quick start

```bash
# Deploy contracts
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js

# Run frontend
cd frontend
npm install
npm run dev
```

## License

MIT
