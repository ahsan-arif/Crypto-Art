import React,{ useContext } from 'react'
import { AddArt } from './components/AddArt';
import { ConnectContext } from "./App";
import ipfs from "./ipfs";
import history from './history';

 const ArtWork = ()=>{
    const {state} = useContext(ConnectContext)
    const {accounts, web3,contract } = state;
    const  addArtwork = async (name, amount, ipfsHash, description)=>{
     // console.log("kya haal hai")
        console.log(ipfsHash +" "+name)
        
        //console.log(contract)
       const weiValue = web3.utils.toWei(amount.toString(), 'ether')
        const res= await contract.methods.addArt(name,ipfsHash,description,weiValue).send({ from: accounts[0], gas : 1000000})
        .on('transactionHash', function(hash){
          console.log('add art trxID: '+ hash+" "+name+" "+weiValue+" "+ipfsHash);
        });
        console.log(res)
        alert('Your artwork has been shared with the world')
        history.push('/')
        window.location.reload(true);
      }
      const  readyArtForUpload = (name, amount, bufferArray, description) =>{
        let ipfsHash = '';
        ipfs.files.add(bufferArray, (error, result)=>{
          if(error){
            console.error(error)
            return
          }
          ipfsHash = result[0].hash
         addArtwork(name,amount,ipfsHash,description)
         // console.log(ipfsHash +" "+name)
         
        })
    
        //console.log(name)
      }
    console.log(contract)
    return(
        <AddArt readyArtForUpload ={readyArtForUpload} />

    )
}
export default ArtWork