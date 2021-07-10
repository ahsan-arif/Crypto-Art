import React,{createContext, useReducer} from 'react'
import App2 from './App2'
import Header from './components/Header'
import history from './history'
import ArtWork from './ArtWork'
import ModalScreen from './components/ModalScreen'
import { Router, Route, Switch} from 'react-router-dom'
import { INITIAL_STATE, reducer } from "./useReducer";

export const ConnectContext = createContext()
const App = ()=>{
    const [state, dispatch] = useReducer(reducer,INITIAL_STATE)
    // console.log(state)
    return(
        <ConnectContext.Provider value={{state,dispatch}}>
        <div>
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={App2} />
                        <Route path="/create/art" exact component={ArtWork} />
                        <Route path="/modalscreen/" exact component={ModalScreen} />
                    </Switch>
                </div>
            </Router>
        </div>
        </ConnectContext.Provider>
    )
}
export default App