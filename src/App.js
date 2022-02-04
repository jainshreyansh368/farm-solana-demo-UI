import React, { useState } from 'react';
import { farm_init } from './components/farm_init';
import { farm_state } from './components/farm_state';
import { farm_user_init } from './components/farm_user_init';
import { vault_stake } from './components/vault_stake';
import { vault_unstake } from './components/vault_unstake';
import { farm_harvest } from './components/farm_harvest';
import { router_harvest } from './components/router_harvest';
import { vault_spl_init } from './components/vault_spl_init';
import { apna_vault } from './components/init_vault-valhalla';
import { crank_1_harvest } from './components/crank_1_harvest';
import { crank_2_compound } from './components/crank_2_compound';


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
        <button onClick = {() => farm_state(pubKey, amount)}>farm create</button>

        <br/><br/><br/><br/>
        <button onClick = {() => farm_user_init(pubKey)}>farm user</button>
        
        <br/><br/><br/><br/>
        <button onClick = {() => vault_stake(pubKey, amount)}>vault stake</button>

        <br/><br/><br/><br/>
        <button onClick = {() => vault_unstake(pubKey, amount)}>vault unstake</button>

        <br/><br/><br/><br/>
        <button onClick = {() => farm_harvest(pubKey, amount)}>farm harvest</button>
        <br/><br/><br/><br/>
        <button onClick = {() => router_harvest(pubKey)}>touter harvest</button>
        
        <br/><br/><br/><br/>
        <button onClick = {() => vault_spl_init(pubKey)}>vault spl init</button>
        <br/><br/><br/><br/>
        <button onClick = {() => apna_vault(pubKey)}>new val vault init</button>

        <br/><br/><br/><br/>
        <button onClick = {() => crank_1_harvest(pubKey)}>crank 1 harvest</button>
        
        <br/><br/><br/><br/>
        <button onClick = {() => crank_2_compound(pubKey)}>crank 2 compound</button>
        
      </div>
      ) 
  }
export default App

/*
import { bob } from './components/bob'

<button onClick = {() => bob}>User 2</button>
*/