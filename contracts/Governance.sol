// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./inspercoin.sol";

contract Governnce is inspercoin(30000000, "inspercoin", "ICO") {
    /// contadores necessários
    uint256 public votacoes= 0;
    uint256 public users = 0;
    uint256 public tokens = 0;
    bool public _voting = true;

    // Lista de votantes
    mapping (address => bool) voters;

    function vote(uint256 amount) public {
        require(1 <= amount);
        require(amount <= balances[voter]);
        require(!voters[voter]);
        require(_voting);

        // Mundanças com o votante
        address voter = msg.sender;
        voters[voter] = true;
        balances[voter] = balances[voter] - amount;

        // Mundanças das variáveis da votação
        users++;
        tokens = tokens + amount;

        // Verifica se votação foi finalizada
        if (users > 3 && tokens > 10) {
            users = 0;
            tokens = 0;
            _voting = false;
        }

    }

    function hasVoted(address voter) public view returns(bool) {
        return voters[voter];
    }
}