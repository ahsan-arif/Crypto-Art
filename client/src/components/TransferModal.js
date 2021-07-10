import React from 'react'
import ReactDOM from 'react-dom'
function TransferModal ({title,icon,actions, onDismiss, address, setAddress}){
  const onTextChange = (Text) =>{
      setAddress(Text.target.value)
  }
    return ReactDOM.createPortal(
        <div onClick={onDismiss} className="ui dimmer modals visible active">
        <div onClick={(e)=>e.stopPropagation()} className="ui standard modal visible active">
          <div className="ui icon header">
          <i className={`${icon}`}></i>
            {title}
          </div>
          <div className="content">
                <input type="text" value={address} onChange={(Text)=>onTextChange(Text)}/>
          </div>
          <div className="actions">
            {actions}
          </div>
        </div>
      </div>,
        document.querySelector('#modal')
      );
}
export default TransferModal
