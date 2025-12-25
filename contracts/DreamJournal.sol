// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint8, externalEuint8} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title DreamJournal - Encrypted Dream Journal Storage
/// @notice Stores encrypted dream content using FHE. Only encrypted data is stored on-chain.
/// @dev Dream text is encrypted as euint8[] (one byte per character)
/// @dev This contract uses Zama's FHEVM for fully homomorphic encryption
contract DreamJournal is SepoliaConfig {
    struct Dream {
        address owner;      // 20 bytes - slot 0
        uint64 createdAt;   // 8 bytes - packed with next field
        uint32 titleLength; // 4 bytes - packed with createdAt
        string title;       // dynamic - separate slot
        euint8[] encContent; // dynamic - separate slot
    }

    Dream[] private _dreams;
    mapping(address => uint256[]) private _dreamsOf;
    // Track content hashes to prevent duplicates (length + owner combination)
    mapping(bytes32 => bool) private _contentHashes;
    // Rate limiting: last creation timestamp per user
    mapping(address => uint64) private _lastCreationTime;

    event DreamCreated(uint256 indexed id, address indexed owner, string title, uint64 createdAt);
    event DreamAccessed(uint256 indexed id, address indexed accessor);
    event DreamContentLength(uint256 indexed id, uint256 length);
    event DreamDecrypted(uint256 indexed id, address indexed decryptor, uint64 timestamp);

    /// @notice Create a new dream entry with FHE encrypted content
    /// @param title Plaintext title for listing (not encrypted for discoverability)
    /// @param encContent Array of encrypted bytes (one externalEuint8 per character)
    /// @param inputProof The Zama FHE input proof for the encrypted content
    /// @return id The ID of the newly created dream
    function createDream(
        string calldata title,
        externalEuint8[] calldata encContent,
        bytes calldata inputProof
    ) external returns (uint256 id) {
        require(encContent.length > 0, "Empty content");
        require(encContent.length <= 10000, "Content too large"); // Prevent excessive storage costs
        require(bytes(title).length > 0, "Empty title");
        require(bytes(title).length <= 200, "Title too long");

        // Rate limiting: one dream per hour per user
        require(
            _lastCreationTime[msg.sender] == 0 || block.timestamp >= _lastCreationTime[msg.sender] + 1 hours,
            "Rate limit: one dream per hour allowed"
        );

        // Prevent duplicate dreams (same content length from same owner)
        bytes32 contentHash = keccak256(abi.encodePacked(msg.sender, encContent.length, title));
        require(!_contentHashes[contentHash], "Duplicate dream content detected");
        _contentHashes[contentHash] = true;

        Dream memory dream;
        dream.owner = msg.sender;
        dream.createdAt = uint64(block.timestamp);
        dream.titleLength = uint32(bytes(title).length);
        dream.title = title;

        // Import and store encrypted bytes
        dream.encContent = new euint8[](encContent.length);
        for (uint256 i = 0; i < encContent.length; i++) {
            euint8 b = FHE.fromExternal(encContent[i], inputProof);
            dream.encContent[i] = b;
            // Grant access: contract and owner can decrypt
            FHE.allowThis(b);
            FHE.allow(b, msg.sender);
        }

        // Persist and index
        _dreams.push(dream);
        id = _dreams.length - 1;
        _dreamsOf[msg.sender].push(id);

        // Update rate limiting timestamp
        _lastCreationTime[msg.sender] = uint64(block.timestamp);

        emit DreamCreated(id, msg.sender, title, dream.createdAt);
    }

    /// @notice Get the number of dreams for a user
    /// @param user The user address
    /// @return count Number of dreams
    function getDreamCount(address user) external view returns (uint256 count) {
        return _dreamsOf[user].length;
    }

    /// @notice Get dream IDs for a user
    /// @param user The user address
    /// @return ids Array of dream IDs
    function getDreamIds(address user) external view returns (uint256[] memory ids) {
        return _dreamsOf[user];
    }

    /// @notice Get metadata for a dream (title, owner, timestamp)
    /// @param id The dream ID
    /// @return owner Owner address
    /// @return title Title string
    /// @return createdAt Timestamp
    function getDreamMeta(uint256 id)
        external
        view
        returns (address owner, string memory title, uint64 createdAt)
    {
        Dream storage dream = _dreams[id];
        require(dream.encContent.length > 0, "Dream does not exist");
        return (dream.owner, dream.title, dream.createdAt);
    }

    /// @notice Check if a dream exists
    /// @param id The dream ID
    /// @return exists Whether the dream exists
    function dreamExists(uint256 id) public view returns (bool exists) {
        return _dreams[id].encContent.length > 0;
    }

    /// @notice Get the length of FHE encrypted content for a dream
    /// @param id The dream ID
    /// @return length Number of FHE encrypted bytes (characters)
    function getDreamContentLength(uint256 id) public view returns (uint256 length) {
        Dream storage dream = _dreams[id];
        require(dream.encContent.length > 0, "Dream does not exist");
        return dream.encContent.length;
    }

    /// @notice Record content length access for analytics
    /// @param id The dream ID
    function recordContentAccess(uint256 id) external {
        require(dreamExists(id), "Dream does not exist");
        emit DreamContentLength(id, getDreamContentLength(id));
    }

    /// @notice Record dream decryption for analytics
    /// @param id The dream ID
    function recordDecryption(uint256 id) external {
        require(dreamExists(id), "Dream does not exist");
        require(_dreams[id].owner == msg.sender, "Only owner can record decryption");
        emit DreamDecrypted(id, msg.sender, uint64(block.timestamp));
    }

    /// @notice Get total number of dreams stored in the contract
    /// @return count Total number of dreams
    function getTotalDreamCount() external view returns (uint256 count) {
        return _dreams.length;
    }

    /// @notice Get a single FHE encrypted byte at a specific index
    /// @param id The dream ID
    /// @param index The byte index (corresponds to character position)
    /// @return encByte The FHE encrypted byte as euint8
    function getDreamContentByte(uint256 id, uint256 index) external view returns (euint8 encByte) {
        Dream storage dream = _dreams[id];
        require(dream.encContent.length > 0, "Dream does not exist");
        require(dream.owner == msg.sender, "Access denied: not the owner");
        require(index >= 0, "Index cannot be negative");
        require(index < dream.encContent.length, "Index out of bounds");
        return dream.encContent[index];
    }
}

