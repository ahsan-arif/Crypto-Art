export const INITIAL_STATE={
    accounts: [],
    web3: null,
    contract: null,
    myArtwork:[],
    marketPlace :[],
    allTokens:[]
}

export const reducer = (state, action)=>{
    switch(action.type){
        case "CONNECT":
            return {...state, accounts:action.payload.accounts, web3: action.payload.web3, contract:action.payload.instance, myArtwork: action.payload.myArtwork,marketPlace: action.payload.marketPlace,allTokens:action.payload.allTokens}
        case "ARTWORKS":
            return {...state, myArtwork: action.payload}
        default:
            return {...state}
    }
}