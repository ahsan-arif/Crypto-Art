import React, { useEffect, useContext } from "react";
import ArtFactory from "./contracts/ArtFactory.json";
import getWeb3 from "./getWeb3";
import "./App.css";


import { ConnectContext } from "./App";
import { MyTokens } from "./components/MyTokens";
import { MarketPlace } from "./components/MarketPlace";
const App2 = ()=> {
    const {state,dispatch} = useContext(ConnectContext)
    useEffect(()=>{
      async function getVals(){
        const web3 = await getWeb3();
        console.log(web3)

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        window.ethereum.on('accountsChanged',function(accounts){
          //console.log('account changed')
          window.location.reload(false);
        } )
          
        
  
        //console.log(accounts[0])
  
        // Get the contract instance. -- ganache code
        /* const networkId = await web3.eth.net.getId();
        console.log(networkId)
        const deployedNetwork = ArtFactory.networks[networkId];
        const instance = new web3.eth.Contract(
          ArtFactory.abi,
          deployedNetwork && deployedNetwork.address,
        ); */

        //testnet code
        const networkId = await web3.eth.net.getId();
        console.log(networkId)
        const deployedNetwork = ArtFactory.networks[networkId];
        console.log(deployedNetwork.address)
        let instance;
        if(networkId==3){
          instance = new web3.eth.Contract(ArtFactory.abi,deployedNetwork.address)
          console.log(instance)
        }else if(networkId == 5777){
          instance = new web3.eth.Contract(
            ArtFactory.abi,
            deployedNetwork && deployedNetwork.address,
          );
          console.log(instance)
        }else{
          console.log("unidentified network")
        }
        
        
        // const myArtwork=await instance.methods.getMyArtwork(accounts[0]).call()
        let myArtwork = []
        let marketPlace = []
        const allTokens = await instance.methods.getAllTokens().call() 
        allTokens.map((token)=>{
          if(token.owner === accounts[0]){
            myArtwork.push(token)
          }else{
            marketPlace.push(token)
          }
        })
       
        console.log(allTokens)
      //  const owners = await instance.methods.getOwners().call()
        //const marketPlace = await instance.methods.getmarketplace(accounts[0]).call()
        console.log(accounts[0])
        console.log(myArtwork)
       // console.log(owners)
        console.log(marketPlace)
        dispatch({type:"CONNECT", payload:{web3, accounts, instance, myArtwork,marketPlace,allTokens}})
      }
      getVals()
    })
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.getMyArtwork);


  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.methods.set(5).send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.methods.get().call();

  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  /* const getData=()=>{
    //
    if(state.web3!== null && state.accounts !==null && state.contract !== null){
      return false
    }
    return true
  } */

 const getMyArtwork = async() =>{
  //  console.log(state)
    const{contract} = state;
    console.log("contract is null")
    if(contract !== null){
      const _myArtwork = await contract.methods.getMyArtwork().call();

      // this.setState({myArtwork: _myArtwork});
      dispatch({type:"ARTWORKS", payload:_myArtwork})
      console.log("in getMyartwork")
      console.log(_myArtwork)
    }
  }


  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
      <div>
        {/* <img src="https://ipfs.io/ipfs/QmRbPHnkV8vyT1rm5nRaabzrjqKxfXWvoJYvMMnR3sUrXi"/> */}
        {/* <img src="https://ipfs.io/ipfs/QmY4jUa1afU31qv8TxMdys39baKPLicfZdNpWjhzCeexna"/> */}
       {/* <p>Welcome</p> */}
       <MyTokens/>
       <MarketPlace/>
      </div>
     /*  <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div> */
    );
  }

export default App2;
