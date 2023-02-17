// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "operator-filter-registry/src/upgradeable/DefaultOperatorFiltererUpgradeable.sol";

interface IDegenesis {
    function ownerOf(uint256 tokenId) external view returns (address owner);
}

contract DegenesisArmor is Initializable, ERC721Upgradeable, OwnableUpgradeable, DefaultOperatorFiltererUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;

    uint256 constant public MAX_SUPPLY = 300;
    string public baseURI;
    address public degenesisAddress;
    uint256 public numMinted;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _degenesisAddress, string memory _initialBaseURI) initializer public {
        __ERC721_init("Degenesis Armor", "DGNA");
        __Ownable_init();
        __DefaultOperatorFilterer_init();
        degenesisAddress = _degenesisAddress;
        baseURI = _initialBaseURI;
        numMinted = 0;
    }

    function setBaseURI(string memory _uri) public onlyOwner {  
        baseURI = _uri;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // Airdrop the Degenesis Armor to the Degenesis holders
    function airdropToDegenesisOwners(uint256 _startingIndex, uint256 _endingIndex, uint256 _quantityToAirdrop) external onlyOwner {
        uint256 quantityMinting = (_endingIndex - _startingIndex) * _quantityToAirdrop;

        // If airdrop for only one token should be done
        if(_startingIndex == _endingIndex) {
            quantityMinting = 1;
        }

        require(numMinted + quantityMinting <= MAX_SUPPLY, "Reached minting limit!");
        require(_startingIndex >= 0 && _endingIndex <= 299, "Invalid token ids!");

        for (uint256 i = _startingIndex; i <= _endingIndex;) {
            address thisOwner;

            // Airdrop to owner if token has been burned
            try IDegenesis(degenesisAddress).ownerOf(i) returns (address _owner) {
                thisOwner = _owner;
            } catch (bytes memory) {
                thisOwner = msg.sender;
            }
                        
            unchecked {
                numMinted += _quantityToAirdrop;
                uint256 tokenId = _tokenIdCounter.current();
                _safeMint(thisOwner, tokenId);
                _tokenIdCounter.increment();
                i++;
            }
        }
    }

    /**
    * @dev See {IERC721-setApprovalForAll}.
    *      In this example the added modifier ensures that the operator is allowed by the OperatorFilterRegistry.
    */
    function setApprovalForAll(address operator, bool approved) public override onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    /**
    * @dev See {IERC721-approve}.
    *      In this example the added modifier ensures that the operator is allowed by the OperatorFilterRegistry.
    */
    function approve(address operator, uint256 tokenId) public override onlyAllowedOperatorApproval(operator) {
        super.approve(operator, tokenId);
    }

    /**
    * @dev See {IERC721-transferFrom}.
    *      In this example the added modifier ensures that the operator is allowed by the OperatorFilterRegistry.
    */
    function transferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
        super.transferFrom(from, to, tokenId);
    }

    /**
    * @dev See {IERC721-safeTransferFrom}.
    *      In this example the added modifier ensures that the operator is allowed by the OperatorFilterRegistry.
    */
    function safeTransferFrom(address from, address to, uint256 tokenId) public override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId);
    }

    /**
    * @dev See {IERC721-safeTransferFrom}.
    *      In this example the added modifier ensures that the operator is allowed by the OperatorFilterRegistry.
    */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override onlyAllowedOperator(from) {
        super.safeTransferFrom(from, to, tokenId, data);
    }
}
