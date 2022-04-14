import React, { useEffect, useState } from "react";
import Head from "./Header";
import "./main.css";

import { loadWeb3, loadAccount, loadTutorial } from "../helpers/web3Functions";

const LandingPage = () => {
  const [account, setAccount] = useState("");
  const [tutorial, setTutorial] = useState("");
  const [amount, setAmount] = useState(0);
  const [frase, setFrase] = useState("");

  const loadBlockchainData = async () => {
    var web3 = await loadWeb3();
    const networkId = await web3.eth.net.getId();
    const acc = await loadAccount(web3);
    const tutorialContract = await loadTutorial(web3, networkId);
    if (!tutorialContract) {
      window.alert(
        "Smart contract not detected on the current network. Please select another network with Metamask."
      );
      return;
    }
    setAccount(acc);
    setTutorial(tutorialContract);
  };
  useEffect(() => {
    loadBlockchainData();
  }, [amount, account]);

  return (
    <div>
      <Head />
      <body className="body">
        <div className="center">
          <div className="col">
            <div className="row">
              <div>
                <p className="title">account:</p>
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
            <div className="row">
              <div>
                <p className="title">Amount: </p>
                <input
                  placeholder="inser amount "
                  className="inp"
                  type={Number}
                />
              </div>
              <button
                className="btnSet"
                type="button"
                onClick={e => setAmount(e.target.value)}
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
      </body>
    </div>
  );
};

export default LandingPage;
