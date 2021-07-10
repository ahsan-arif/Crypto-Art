import React, {useContext} from 'react'
import { ConnectContext } from '../App'
import { MarketPlaceItem } from './MarketPlaceItem'
import './item.css'
export const MarketPlace = () => {
    const {state} = useContext(ConnectContext)
    const {marketPlace} = state
    console.log(marketPlace)
  //  if(marketPlace.lenght>0){
        return (
            <div className = "ui segment">
            <h4 className= "ui dividing header">Marketplace</h4>
            <div className = "ui five column grid">
                {marketPlace.map((item,index)=>{
                    return(
                        <div key = {index} className="cardSpace" >
                        <MarketPlaceItem marketItem = {item}/>
                    </div>
                    )
                })}
               
            </div>
            
        </div>
        )
   /*  }else{
         return(
            <div className="ui segment">
            <h4 className="ui dividing header">Marketplace</h4>
            <div className = "ui four column grid"><p>No tokens available for purchase</p></div>
        </div>
        )
       
    }  */
   
}
