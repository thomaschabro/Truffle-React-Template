// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract insperCoin {

    // Definindo eventos
    event Transfer(address indexed from_Id, address indexed to_Id, uint amount);
    event Approval(address indexed tokenOwner, address indexed spender, uint amount);

    // Definindo dicionários 
    mapping(address => uint256) balances; // dicionário com a balança dos tokens dos usuários
    mapping(address => mapping(address => uint256)) allowed; // contas aprovadas para retirar tokens de contas

    uint256 _totalSupply;
    string private _name;
    string private _symbol;

    // Construtor para definir nome, símbolo e fornecimento total
    constructor(uint256 total, string memory name_, string memory symbol_) {
        _totalSupply = total;
        balances[msg.sender] = _totalSupply;

        _name = name_;
        _symbol = symbol_;
    }


    
    // Função que retorna nome da moeda
    function name() public view returns(string memory) {
        return _name;
    }

    // Função que retorna o símbolo da moeda
    function symbol() public view returns(string memory) {
        return _symbol;
    }

    // Função que retorna o montante total de Tokens da moeda
    function totalSupply() public view returns(uint256) {
        return _totalSupply;
    }

    // Função que retorna o número de tokens de um address
    function balanceOf(address tokenOwner) public view returns(uint256) {
        return balances[tokenOwner];
    }   

    // Função para transferir tokens entre addresses
    function transfer(address destinatario, uint valor) public returns(bool) {
        require(valor <= balances[msg.sender]); // valor de transferência tem que ser menor que o que ele tem

        balances[msg.sender] = balances[msg.sender] - valor; // subtraindo o valor
        balances[destinatario] = balances[destinatario] + valor; // adicionando valor 
        emit Transfer(msg.sender, destinatario, valor); // transfere de fato o valor
        return true;
    }

    // Função que trabalha com o mapping 'allowed'
    // owner aprova outra conta retirar tokens da sua conta
    function approve(address mediador, uint amount) public returns (bool) {
        allowed[msg.sender][mediador] = amount;
        emit Approval(msg.sender, mediador, amount);

        return true;
    }

    // Função para mostrar o valor de tokens aprovado para um mediador específico
    function allowance(address owner, address mediador) public view returns(uint) {
        return allowed[owner][mediador];
    }

    // Uma vez criados as autorizações, vamos fazer a função para serem transferidos tokens pelos 'mediadores'
    // Chamada pelo mediador
    function transferFrom(address owner, address buyer, uint amount) public returns(bool) {
        require(amount <= balances[owner]); // necessário ter o valor para então ser transferido
        require(amount <= allowed[owner][msg.sender]); // necessário valor estar dentro do combinado

        allowed[owner][msg.sender] = allowed[owner][msg.sender] - amount; // retira valor do 'combinado'
        balances[owner] = balances[owner] - amount; // subtrai valor da conta do owner
        balances[buyer] = balances[buyer] + amount; // soma valor da conta do buyer

        emit Transfer(owner, msg.sender, amount); // emite o evento

        return true;
    }

    //
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply += amount;
        balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        uint256 accountBalance = balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        
        balances[account] -= amount;
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

    }
}