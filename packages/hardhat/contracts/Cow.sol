//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Cow {
  address public immutable owner;
  uint256 public happyPoint;
  uint256 public timeBorn;
  uint256 public lastTimeCowAte;

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  constructor(address _owner) {
    owner = _owner;
    timeBorn = block.timestamp;
    lastTimeCowAte = block.timestamp;
  }

  receive() external payable {}

  function feedTheCow() isOwner external {
    happyPoint = 10;
    lastTimeCowAte = block.timestamp;
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
