import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

pragma solidity ^0.8.0;

contract Pool {

    address public owner;
    string public postId;
    uint256 public timeStamp;

    uint256[] winners_percantage;
    uint256 loosers_bounty;

    address[] rapper1_voters;
    uint256[] rapper1_amount;
    uint256 rapper1_total_pool_amount = 0;

    uint256 rapper2_total_pool_amount = 0;
    address[] rapper2_voters;
    uint256[] rapper2_amount;

    constructor(string memory _postId, uint256 _timeStamp){
        postId = _postId;
        timeStamp = _timeStamp;
        owner = msg.sender;
    }

    modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can call this function");
    _;
    }

    function addRapper1Voter() public payable {
        require(msg.sender != address(0), "Invalid address");
        require(msg.value > 0, "Please send some ether to vote");
        rapper1_total_pool_amount += msg.value;
        rapper1_voters.push(msg.sender);
        rapper1_amount.push(msg.value);
    }

    function addRapper2Voter() public payable {
        require(msg.sender != address(0), "Invalid address");
        require(msg.value > 0, "Please send some ether to vote");
        rapper2_total_pool_amount += msg.value;
        rapper2_voters.push(msg.sender);
        rapper2_amount.push(msg.value);
      }
    
    function distrubeToWinner(string memory _winner) public payable onlyOwner {
        if(keccak256(abi.encodePacked(_winner)) == keccak256(abi.encodePacked("rapper1"))){
            for(uint256 i = 0; i < rapper1_voters.length; i++){
                winners_percantage[i] = rapper1_amount[i] / rapper1_total_pool_amount;
            }
        }

        uint256 ownerPercentage = rapper2_total_pool_amount * 0.30;
    }
    

}
