//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./M000Token.sol";
import "./MilkToken.sol";
import "./Cow.sol";

contract CowFactory {
  Cow cowContract;
  M000Token mooToken;
  MilkToken milkToken;

  mapping(address => address[]) public contractaddressToPlayerCowAddresses;
  mapping(address => bool) public isPlayer;
  address[] public players;

  event SpinWheelResult (
    address player,
    uint wheelNumber
  );

  constructor(address _mooTokenAddress, address _milkTokenAddress) {
    mooToken = M000Token(_mooTokenAddress);
    milkToken = MilkToken(_milkTokenAddress);
  }

  function buyCow(string memory _name) external {
    Cow newCow = new Cow(msg.sender, address(milkToken), address(mooToken), _name);
    contractaddressToPlayerCowAddresses[msg.sender].push(address(newCow));

    if (!isPlayer[msg.sender]) {
      players.push(msg.sender);
    }

    isPlayer[msg.sender] = true;
  }

  function spinWheel() public {
    uint randomNumber = getRandomValue(60);
    uint wheelNumber;

    if (randomNumber > 50) {
      mooToken.mint(msg.sender, 100 * 10 ** 18);
      wheelNumber = 6;
    }
    else if(randomNumber > 40){
      mooToken.mint(msg.sender, 75 * 10 ** 18);
      wheelNumber = 5;
    }
    else if(randomNumber > 30){
      mooToken.mint(msg.sender, 50 * 10 ** 18);
      wheelNumber = 4;
    }
    else if(randomNumber > 20){
      mooToken.mint(msg.sender, 25 * 10 ** 18);
      wheelNumber = 3;
    }
    else if(randomNumber > 10){
      mooToken.mint(msg.sender, 10 * 10 ** 18);
      wheelNumber = 2;
    }
    else{
      mooToken.mint(msg.sender, 5 * 10 ** 18);
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

  function getPlayers() public view returns (address[] memory){
    return players;
  }
}
