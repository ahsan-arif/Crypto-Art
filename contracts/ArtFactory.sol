pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract ArtFactory is ERC721Full{

      
    using SafeMath for uint256;

    uint256 count;
    struct Art{
        uint256 tokenId;
        string name;
        string ipfsHash;
        string description;
        uint256 price;
        address owner;
    }

    Art[] arts;

    mapping (uint256 => address) public artToOwner;
    mapping (address => uint) ownerArtCount;
    mapping (uint256 => address) artApprovals;
    
    event artWorkAdded(string _name,string _ipfsHash,string _description, uint _amount ,address ownerAddress);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

      constructor() ERC721Full('ArtNft','ARTNFT') public{}


    function addArt(string memory _name, string memory _ipfsHash, string memory _description, uint _amount ) public{
    uint256 tokenId = arts.push(Art(count,_name,_ipfsHash,_description,_amount,msg.sender))-1;
    artToOwner[count] = msg.sender;
    ownerArtCount[msg.sender]++;
    _safeMint(msg.sender, count);
    count++;

    emit artWorkAdded(_name, _ipfsHash, _description, _amount, msg.sender);
    }

    function approve (address _to, uint256 _tokenId) public{
        artApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private{
    arts[_tokenId].owner = _to;
    ownerArtCount[_to] = ownerArtCount[_to].add(1);
    ownerArtCount[_from] = ownerArtCount[_from].sub(1);
    artToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) public{
        require(artToOwner[_tokenId] == msg.sender || artApprovals[_tokenId] == msg.sender, "ERC721: transfer caller is not owner nor approved");
       // approve(_to,_tokenId);
        _transfer(_from, _to, _tokenId);
    }

    function getOwner(uint256 tokenId)public view returns(address){
        address owner = artToOwner[tokenId];
        return owner;
    }

    function getAllTokens() external view returns(Art[] memory){
        return arts;
    }

}