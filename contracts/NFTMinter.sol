// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    
    struct NFTMetadata {
        string name;
        string description;
        string image;
    }
    
    mapping(uint256 => NFTMetadata) public metadata;
    
    event NFTMinted(address indexed to, uint256 tokenId, string name, string image);
    
    constructor() ERC721("MintedNFT", "MNFT") Ownable(msg.sender) {}
    
    function mintNFT(
        address to,
        string memory name,
        string memory description,
        string memory image
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        
        metadata[tokenId] = NFTMetadata({
            name: name,
            description: description,
            image: image
        });
        
        emit NFTMinted(to, tokenId, name, image);
        return tokenId;
    }
    
    function getMetadata(uint256 tokenId) external view returns (string memory, string memory, string memory) {
        NFTMetadata m = metadata[tokenId];
        return (m.name, m.description, m.image);
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Nonexistent");
        NFTMetadata m = metadata[tokenId];
        return m.image;
    }
}
