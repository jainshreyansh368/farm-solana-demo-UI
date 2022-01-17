import React, { useState } from 'react';
import { farm_init } from './components/farm_init';
import { farm_state } from './components/farm_state';
import { farm_user_init } from './components/farm_user_init';
import { farm_lp_deposit } from './components/farm_lp_deposit';
import { farm_lp_withdraw } from './components/farm_lp_withdraw';
import { router_stake } from './components/router_stake';
import { router_unstake } from './components/router_unstake';
import { farm_harvest } from './components/farm_harvest';
import { router_harvest } from './components/router_harvest';


const App = () => { 
  const [count, setCount] = useState();
  const [pubKey, setPubKey] = useState();
  const [amount, setAmount] = useState();
  
  // useEffect(() => {


  /////////////////////////////////////////////////////////////Connections////////////////////////////////////////////    
  const getConnectedWallet = async()=> {    
    const provider = await window.solana;
    if(provider){
        setPubKey(provider.publicKey);
        localStorage.setItem("pubKey", provider.pubKey);
    }
    else console.log("Try to connect again");
    }


    const connectWallet = async() => {
        const provider = window.solana;
        console.log(provider);
        if(provider){
                setCount(count + 1);
                await window.solana.connect();
                window.solana.on("connect", () => console.log("connect"));
                getConnectedWallet();
            }
        else window.open("https://phantom.app/", "_blank")
    }

    const disconnectWallet = () => {
        window.solana.disconnect();
        localStorage.removeItem('pubKey')
        setPubKey();
    }

  
    return (
      <div className = "App">
          <h1>Hey: { pubKey ? pubKey.toString() : ""}</h1>
          <br />
          <button onClick = {connectWallet}>Connect Here!</button>
          <button onClick = {disconnectWallet}>Disconnect Here!</button>
          <br/><br/>
          
            <br/><br/>
          
        <input type="text" onChange = {(e) => setAmount(e.target.value)} />

        <br/><br/><br/><br/>
        <button onClick = {() => farm_init(pubKey)}>farm 1</button>

        <br/><br/><br/><br/>
        <button onClick = {() => farm_state(pubKey)}>farm create</button>

        <br/><br/><br/><br/>
        <button onClick = {() => farm_user_init(pubKey)}>farm user</button>
        
        <br/><br/><br/><br/>
        <button onClick = {() => farm_lp_deposit(pubKey, amount)}>farm deposit</button>

        <br/><br/><br/><br/>
        <button onClick = {() => farm_lp_withdraw(pubKey, amount)}>farm withdraw</button>

        <br/><br/><br/><br/>
        <button onClick = {() => router_stake(pubKey, amount)}>router stake</button>

        <br/><br/><br/><br/>
        <button onClick = {() => router_unstake(pubKey, amount)}>router unstake</button>

        <br/><br/><br/><br/>
        <button onClick = {() => farm_harvest(pubKey, amount)}>farm harvest</button>
        <br/><br/><br/><br/>
        <button onClick = {() => router_harvest(pubKey)}>touter harvest</button>
        
      </div>
      ) 
  }
export default App

/*
import { bob } from './components/bob'

<button onClick = {() => bob}>User 2</button>
*/