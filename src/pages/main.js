import React, { useEffect, useState } from 'react';
import Head from './Header';
import './main.css';

import {
    loadWeb3,
    loadAccount,
    loadTutorial
} from "../helpers/web3Functions";

const LandingPage = () => {
    const [account, setAccount] = useState("")
    const [tutorial, setTutorial] = useState("")
    const [newFrase, setNewFrase] = useState("")
    const [frase, setFrase] = useState("")

    const callGetFrase = async () => {
      const f = await tutorial.methods.get().call();
      setFrase(f);
    }

    const callSetFrase = async (f) => {
     await tutorial.methods.set(f).send({from: account});
    }

    const loadBlockchainData = async () => {
        var web3 = await loadWeb3();
        const networkId = await web3.eth.net.getId()
        const acc = await loadAccount(web3);
        const tutorialContract = await loadTutorial(web3, networkId);
        if(!tutorialContract) {
          window.alert('Smart contract not detected on the current network. Please select another network with Metamask.')
          return;
        }
        setAccount(acc);
        setTutorial(tutorialContract);
      }
    useEffect(() => {
      loadBlockchainData();
    },[])

    return (
      <div>
        <Head />
        <body className='body'>
          <div className="center">
            <div className="col">
              <div className="row">
                <div>
                  <p className='title'>account:</p>
                  <div>{account &&
                    `${account.slice(0, 6)}...${account.slice(
                      account.length - 4,
                      account.length
                    )}`}
                </div>
                </div>
              </div>
                <div className="row">
                  <div>
                    <p className='title'>Frase:</p> 
                    <div>{frase}</div>
                  </div>
                  <button className='btnGet' type='button' onClick={callGetFrase} >Get</button>
                </div>
                <div className="row">
                  <div>
                    <p className='title'> Trocar frase:</p>
                    <input placeholder="Nova frase" className='inp' onChange={(e) => setNewFrase(e.target.value)}/>
                  </div>
                    <button className='btn' type="button" onClick={() => callSetFrase(newFrase)}>Submit</button>
                </div>
            </div>
          </div>
        </body>
      </div>
    )
}

export default LandingPage;