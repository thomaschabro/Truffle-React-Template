// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./InsperCoin.sol";

contract TestGov is insperCoin(30000000, "inspercoin", "ICO") {
    /// contadores necessários
    uint private count_votacao = 0;
    uint private users = 0;
    uint private tokens = 0;

    // Lista de votantes
    address[] public voters;

    function voting(address voter, uint256 amount) public view returns(bool) {
        require(1 <= amount);
        require(amount <= balances[voter]);

        for (uint i=0; i < voters.length; i++) {
            if (voter == voters[i]) {
                return false;
            }
        }

    return true;
    }
}