import React, {useContext} from 'react'
import { ConnectContext } from '../App'
import './item.css'

export const MarketPlaceItem = ({marketItem}) => {
  const {state} = useContext(ConnectContext)
  const {web3,contract,accounts,allTokens} = state 
  const baseUrl = "https://ipfs.io/ipfs/"

  const price = web3.utils.fromWei(marketItem.price.toString(), 'ether')

  console.log(marketItem.tokenId)
  //console.log(allTokens[0])

  const proceedApproval = async (owner,buyer, tokenId,bytes)=>{
    console.log(tokenId)
    await contract.methods.approve(buyer,tokenId).send({from: buyer})
    proceedTransfer(owner,buyer,tokenId,bytes)
  }

  const proceedTransfer = async (owner, buyer,tokenId,bytes)=>{
    await contract.methods.safeTransferFrom(owner,buyer,tokenId,bytes).send({from: buyer})
    window.location.reload(false);
  }

  const onPurchaseClicked = async ()=>{
    const tokenId =  marketItem.tokenId
    console.log(tokenId)
    /* const tokenId =  marketPlace.indexOf(marketItem)
    const owner = await contract.methods.getOwner(tokenId).call(); */

    let balance =await web3.eth.getBalance(accounts[0])
    balance = web3.utils.fromWei(balance.toString(),'ether')
    console.log(balance)

    if(balance>price){
      //console.log("can proceed with purchase")
      const tokenId = marketItem.tokenId
     // console.log(tokenId)
      const owner = marketItem.owner;
      console.log(owner)
     const res = await web3.eth.sendTransaction({from : accounts[0], to: owner,value: web3.utils.toWei(price.toString(),"ether")}, function(error){
       if(!error){
      const bytes  =Buffer("")
    //  console.log(owner)
      proceedApproval(owner,accounts[0],tokenId,bytes)
      //console.log(approveRes)
      //console.log(transferRes)
       }else{
         console.log("caught error")
         alert("Transaction cancelled")
         window.location.reload(false);
       }
     }) 
     console.log(res)
   
     // window.location.reload(false);
    }else{
      alert("You donot have sufficient balance to purchase this token. Please recharge your account and try again.")
    }
  //console.log(marketPlace.indexOf(marketItem))
 
  }
    return (
 <div className = "ui card">
    <div className="image">
   
        <img className="img" src={baseUrl+marketItem.ipfsHash} />

    </div>
    <div className="content">
        <a className="header">{marketItem.name}</a>
        {/* <div className="meta">
          <span className="date">Joined in 2013</span>
        </div> */}
        <div className="description">
        {marketItem.description===''?"No description provided" : marketItem.description}
        </div>
    </div>
    <div className="extra content">
        <a>
          <i className="ethereum icon"></i>
          {price}
        </a>
        <button className = "btn" onClick={onPurchaseClicked}>Purchase</button>
    </div>
</div>
    )
}
