//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Cow.sol";

contract CowFactory {
  Cow cowContract;

  mapping(address => address[]) public contractaddressToPlayerCowAddresses;

  constructor() {}

  function buyCow() public {
    Cow newCow = new Cow(msg.sender);
    contractaddressToPlayerCowAddresses[msg.sender].push(address(newCow));
  }

  function getUserCowAddresses(address player) public view returns (address[] memory){
    return contractaddressToPlayerCowAddresses[player];
  }
}
