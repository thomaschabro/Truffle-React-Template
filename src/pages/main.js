import React, { useEffect, useState } from 'react';
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
      <div className="center">
        <div className="col">
          <div>
            <div> account: {account}</div>
          </div>
          <div className="col">
            <div className="row">
              <div>frase {frase}</div>
              <button className='btn' type='button' onClick={callGetFrase} >Get</button>
            </div>
            <div className="row">
                <input placeholder="nova frase" className='inp' onChange={(e) => setNewFrase(e.target.value)}/>
                <button className='btn' type="button" onClick={() => callSetFrase(newFrase)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
    
}

export default LandingPage;