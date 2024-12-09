//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./MilkToken.sol";

contract Cow {
  MilkToken milkToken;

  address public immutable owner;
  uint256 public happyPoint;
  uint256 public timeBorn;
  uint256 public lastTimeCowAte;
  uint256 public lastTimeCollectMilk;
  bool public isSick;

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  constructor(address _owner, address _milkTokenAddress) {
    milkToken = MilkToken(_milkTokenAddress);

    owner = _owner;
    timeBorn = block.timestamp;
    lastTimeCowAte = block.timestamp;
    lastTimeCollectMilk = block.timestamp;
  }

  receive() external payable {}

  function feedTheCow() isOwner external {
    happyPoint = 10;
    lastTimeCowAte = block.timestamp;
  }

  function healTheCow() isOwner external {
    isSick = false;
  }

  function collectMilks() isOwner external {
    uint256 amount = block.timestamp - lastTimeCollectMilk;
    milkToken.mint(msg.sender, amount);
    lastTimeCollectMilk = block.timestamp;
  }

  function withdraw() isOwner external {
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send Ether");
  }

  function getHappyPoint() external view returns (uint256){
    return happyPoint;
  }

  function getTimeBorn() external view returns (uint256){
    return timeBorn;
  }
}
