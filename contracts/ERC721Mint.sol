// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract ERC721Mint is ERC721, ERC721Burnable, Ownable {

    uint256 public totalSupply = 0;

    constructor() ERC721("ERC721Mint", "DGT721") { }

    function mint(uint256 amount) public {
        require(totalSupply + amount <= 300, "Total supply exceeded!");
        for (uint256 i = 0; i < amount; i++) {
            _mint(msg.sender, totalSupply + i);
        }
        totalSupply += amount;
    }

}
