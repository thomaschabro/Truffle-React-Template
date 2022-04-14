// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./InsperCoin.sol";

contract TestGov is inspercoin(30000000, "inspercoin", "ICO") {
    // contadores necessários
    uint private count_votacao = 0;
    uint private users = 0;
    uint private tokens = 0;

    // Lista de votantes
    address[] public voters;
    address[] public clear;

    function voting(address voter, uint256 amount) public returns(bool) {
        require(1 <= balances[voter]);
        require(balances[voter] <= amount);

        for (uint i=0; i < voters.length; i++) {
            if (voter == voters[i]) {
                return false;
            }
        }
        balances[voter] = balances[voter] - amount;
        users = users + 1;
        tokens = tokens + amount;

        if (10 <= tokens && users <= 3) {
            users = 0;
            voters = clear;
            count_votacao = count_votacao + 1;
        }

    return true;
    }
}