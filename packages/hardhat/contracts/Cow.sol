//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Cow {
  address public immutable owner;
  uint256 public happyPoint;
  uint256 public timeBorn;

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  constructor(address _owner) {
    owner = _owner;
    timeBorn = block.timestamp;
  }

  receive() external payable {}

  function withdraw() isOwner public {
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send Ether");
  }

  function getHappyPoint() public view returns (uint256){
    return happyPoint;
  }

  function getTimeBorn() public view returns (uint256){
    return timeBorn;
  }
}
