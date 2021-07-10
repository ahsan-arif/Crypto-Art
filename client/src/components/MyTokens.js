import React, {useContext} from 'react'
import { ConnectContext } from '../App'
import { MyToken } from './MyToken'
import './item.css'
export const MyTokens = () => {
    const {state} = useContext(ConnectContext)
    const {myArtwork} = state;
    //console.log(myArtwork)
    if(myArtwork.length>0){
        return (
            <div className = "ui segment">
                <h4 className= "ui dividing header">My Tokens</h4>
                <div className = "ui four column grid">
                    {myArtwork.map((art,index)=>{
                        return(
                            <div key={index} className="cardSpace">
                            <MyToken art = {art}/>
                        </div>
                        )
                    })}
                  
                </div>
                
            </div>
        )
    }else{
        console.log("in else")
        return(
            <div className="ui segment">
                 <h4 className= "ui dividing header">My Tokens</h4>
                 <div className = "ui four column grid"><p>You don't own any tokens yet</p></div>
            </div>
        )
    }
   
}
