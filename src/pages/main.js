import React, { useEffect, useState } from "react";
import Head from "./Header";
import "./main.css";

import {
  loadWeb3,
  loadAccount,
  loadFactory,
  loadCoin,
  loadGovernance,
} from "../helpers/web3Functions";

const LandingPage = () => {
  const [account, setAccount] = useState("");

  const [address, setAddress] = useState("");

  const [balance, setBalance] = useState(0);

  const [web3, setWeb3] = useState();

  // Setando contratos
  const [Governance, setGovernance] = useState("");
  const [coin, setCoin] = useState("");

  const vote = async () => {
    const govern = await factory.methods.getGovernance().call();
    const governance = await loadGovernance(web3, web3.eth.net.getId(), govern);
    governance.methods.vote(amount).send({ from: account });
  };

  const loadBlockchainData = async () => {
    var web3 = await loadWeb3();
    setWeb3(web3);
    const networkId = await web3.eth.net.getId();
    const acc = await loadAccount(web3);

    const governContract = await loadGovernance(web3, web3.eth.net.getId());

    if (!governContract) {
      window.alert(
        "Smart contract not detected on the current network. Please select another network with Metamask."
      );
      return;
    }

    const voted = await governContract.methods.hasVoted(acc).call();
    setVoted(voted);

    const balance = await governContract.methods._token
      .balanceOf(account)
      .call();
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Head />
      <body className="body">
        <div className="center">
          <div className="col">
            <div className="row">
              <div>
                <p className="title">Account:</p>
                <input
                  placeholder="insert account"
                  className="inp"
                  type={String}
                />
                <div>
                  {account &&
                    `${account.slice(0, 6)}...${account.slice(
                      account.length - 4,
                      account.length
                    )}`}
                </div>
              </div>
              <button
                className="btnSet"
                type="button"
                onClick={e => setAccount(e.target.value)}
              >
                Set
              </button>
            </div>
            <br></br>
            <div className="row">
              <button className="btnVote" type="button">
                Vote
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <div className="center">
          <div className="col">
            <p>Has Voted?</p>
            <div className="row">
              <div>
                <p className="title">Account:</p>
                <input
                  placeholder="insert account"
                  className="inp"
                  type={String}
                />
                <div>
                  {account &&
                    `${account.slice(0, 6)}...${account.slice(
                      account.length - 4,
                      account.length
                    )}`}
                </div>
              </div>
              <button
                className="btnSet"
                type="button"
                onClick={e => setAccount(e.target.value)}
              >
                Set
              </button>
              <p className="title">votou: {() => hasVoted(account)}</p>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default LandingPage;
