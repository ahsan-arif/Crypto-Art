import React, {useContext, useState} from 'react'
import TransferModal from './TransferModal'
import { NavLink } from 'react-router-dom'
import history from '../history'
import { ConnectContext } from "../App"
const TransferAddress = ({location}) =>{
  const {state} = useContext(ConnectContext)

  const {tokenId, owner} = location.state
  const {contract, accounts} = state
  console.log(tokenId, owner, contract, accounts)


    const [address, setAddress] = useState('')

    const transfer = async () =>{
      const bytes  =Buffer("")
    const res =  await contract.methods.safeTransferFrom(accounts[0],address,tokenId,bytes).send({from: accounts[0]})
    console.log(res)
    }
    
  const onClickYes=async()=>{
    await transfer()
    await history.push('/')
    window.location.reload(true);
    
    //alert(address)
  }

      const renderActions=()=>{
        return(
            <React.Fragment>
            <NavLink to="/">
            <div className="ui red  cancel inverted button">
              <i className="remove icon"></i>
              Cancel
            </div>
            </NavLink>
            <button 
            style={{border: 'none', background:'none', outline:'none', width:'auto'}}
            onClick={()=>console.log(address)}
            >
            <div className="ui green ok inverted button" onClick={onClickYes}>
              <i className="checkmark icon"></i>
              Transfer
            </div>
            </button>
          </React.Fragment>
        )
    }
    return(
        <TransferModal
        title="Please Enter the Address"
        icon="user times icon"
        actions={renderActions()}
        onDismiss={()=>history.push('/')}
        address={address}
        setAddress={setAddress}
        />
    )
}

export default TransferAddress