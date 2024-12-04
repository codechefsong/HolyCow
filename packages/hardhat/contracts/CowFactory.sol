//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./M000Token.sol";
import "./Cow.sol";

contract CowFactory {
  Cow cowContract;
  M000Token mooToken;

  mapping(address => address[]) public contractaddressToPlayerCowAddresses;

  event SpinWheelResult (
    address player,
    uint wheelNumber
  );

  constructor(address _mooTokenAddress) {
    mooToken = M000Token(_mooTokenAddress);
  }

  function buyCow() external {
    Cow newCow = new Cow(msg.sender);
    contractaddressToPlayerCowAddresses[msg.sender].push(address(newCow));
  }

  function spinWheel() public {
    uint randomNumber = getRandomValue(60);
    uint wheelNumber;

    if (randomNumber > 50) {
      mooToken.mint(msg.sender, 1000 * 10 ** 18);
      wheelNumber = 6;
    }
    else if(randomNumber > 40){
      mooToken.mint(msg.sender, 500 * 10 ** 18);
      wheelNumber = 5;
    }
    else if(randomNumber > 30){
      mooToken.mint(msg.sender, 250 * 10 ** 18);
      wheelNumber = 4;
    }
    else if(randomNumber > 20){
      mooToken.mint(msg.sender, 100 * 10 ** 18);
      wheelNumber = 3;
    }
    else if(randomNumber > 10){
      mooToken.mint(msg.sender, 750 * 10 ** 18);
      wheelNumber = 2;
    }
    else{
      mooToken.mint(msg.sender, 50 * 10 ** 18);
      wheelNumber = 1;
    }

    emit SpinWheelResult(msg.sender, wheelNumber);
  }

  function getRandomValue(uint mod) internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % mod;
  }

  function getUserCowAddresses(address player) public view returns (address[] memory){
    return contractaddressToPlayerCowAddresses[player];
  }
}
