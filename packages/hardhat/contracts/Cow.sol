//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./MilkToken.sol";
import "./M000Token.sol";

contract Cow {
  M000Token mooToken;
  MilkToken milkToken;

  address public immutable owner;
  uint256 public happyPoint;
  uint256 public healthPoint;
  uint256 public timeBorn;
  uint256 public lastTimeCowAte;
  uint256 public lastTimeCollectMilk;
  bool public isSick;

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  constructor(address _owner, address _milkTokenAddress, address _mooTokenAddress) {
    milkToken = MilkToken(_milkTokenAddress);
    mooToken = M000Token(_mooTokenAddress);
    
    owner = _owner;
    timeBorn = block.timestamp;
    lastTimeCowAte = block.timestamp;
    lastTimeCollectMilk = block.timestamp;
    healthPoint = 100;
  }

  receive() external payable {}

  function feedTheCow() isOwner external {
    mooToken.burn(msg.sender, 25 * 10 ** 18);
    happyPoint += 5;
    lastTimeCowAte = block.timestamp;
  }

  function massageTheCow() isOwner external {
    mooToken.burn(msg.sender, 20 * 10 ** 18);
    happyPoint += 10;
  }

  function healTheCow() isOwner external {
    mooToken.burn(msg.sender, 50 * 10 ** 18);
    healthPoint += 50;
    isSick = false;

    if (healthPoint > 100) {
      healthPoint = 100;
    }
  }

  function collectMilks() isOwner external {
    uint256 amount = block.timestamp - lastTimeCollectMilk;
    milkToken.mint(msg.sender, amount * 10 ** 10);
    lastTimeCollectMilk = block.timestamp;
  }

  function stealMilks() external {
    mooToken.burn(msg.sender, 25 * 10 ** 18);
    uint256 amount = block.timestamp - lastTimeCollectMilk;
    milkToken.mint(msg.sender, amount * 10 ** 10);
    lastTimeCollectMilk = block.timestamp;
  }

  function withdraw() isOwner external {
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send Ether");
  }

  function getHappyPoint() external view returns (uint256){
    return happyPoint;
  }

  function getHealth() external view returns (uint256){
    return healthPoint;
  }

  function getTimeBorn() external view returns (uint256){
    return timeBorn;
  }

  function getLastTimeCowAte() external view returns (uint256){
    return lastTimeCowAte;
  }
  
  function getIsSick() external view returns (bool){
    return isSick;
  }
}
