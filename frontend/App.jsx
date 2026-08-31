import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x...';
const ABI = [
  'function mintNFT(address to, string name, string description, string image) external returns (uint256)',
  'function ownerOf(uint256 tokenId) external view returns (address)',
  'function getMetadata(uint256 tokenId) external view returns (string, string, string)',
];

export default function App() {
  const [account, setAccount] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) setAccount(accounts[0]);
      });
    }
  }, []);

  async function connect() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  }

  async function mint() {
    if (!account) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    setStatus('Minting...');
    try {
      const tx = await contract.mintNFT(account, name, desc, image);
      await tx.wait();
      setStatus('Minted!');
    } catch (e) {
      setStatus('Failed: ' + e.message);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui' }}>
      <h1>NFT Minter</h1>
      {!account ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: 8 }} />
          <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: 8 }} />
          <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: 8 }} />
          <button onClick={mint}>Mint NFT</button>
          {status && <p>{status}</p>}
        </>
      )}
    </div>
  );
}
