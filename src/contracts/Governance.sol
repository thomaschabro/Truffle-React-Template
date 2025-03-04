// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./inspercoin.sol";

contract Governance {
    
    ERC20 public _token;

    /// contadores necessários
    uint256 public votacoes= 0;
    uint256 public users = 0;
    uint256 public tokens = 0;
    bool public _voting = true;

    constructor(ERC20 tokencoin) {
        _token = tokencoin;
    }

    // Lista de votantes
    mapping (address => bool) voters;

    function vote() public {
        address voter = msg.sender;
        require(0 <= _token.balanceOf(voter));
        require(!voters[voter]);
        require(_voting);

        // Mundanças com o votante
        voters[voter] = true;

        // Mundanças das variáveis da votação
        users++;
        tokens = tokens + _token.balanceOf(voter);

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

    function voteStatus() public returns(bool) {
        return _voting;
    }
}