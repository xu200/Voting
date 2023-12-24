//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract Coin is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name,symbol) {
        _mint(msg.sender, 18270814960 * 10**uint(decimals()));
    }
}