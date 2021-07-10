import React, {useContext, useState} from 'react'
import { ConnectContext } from '../App'
import {NavLink} from 'react-router-dom'
import history from '../history'
import './item.css'
import TransferModal from './TransferModal'
export const MyToken = ({art}) => {
  const {state} = useContext(ConnectContext)
  const {web3} = state 
  const baseUrl = "https://ipfs.io/ipfs/"
  const price = web3.utils.fromWei(art.price.toString(), 'ether')
  // const onTransferClicked = ()=>{
  //   history.push('/modalscreen',art.tokenId)
  // }
  //console.log(price)
    return (
        <div className = "ui card">
    <div className="image">
    <img className="img" src={baseUrl+art.ipfsHash}/>
</div>
<div className="content">
    <a className="header">{art.name}</a>
  {/*   <div className="meta">
      <span className="date">Joined in 2013</span>
    </div> */}
    <div className="description">
     {art.description===''?"No description provided" : art.description}
    </div>
  </div>
  <div className="extra content">
    <a>
      <i className="ethereum icon"></i>
      {price}
    </a>
    <NavLink to={{
      pathname: '/modalscreen',
      state: { tokenId: art.tokenId, owner: art.owner }
    }} 
    className="btn">
    Transfer
    </NavLink>
  </div>
            
        </div>
    )
}
