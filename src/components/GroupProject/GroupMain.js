import React from 'react'
import Chat from "./Chat/Chat";
import Calandar from "./Calendar/Calandar";
import "./GroupMain.css"

const GroupMain = ({match}) =>{
    return(
        
        <div className="GroupMain">
            <div>{match.params.username}-{match.params.groupid}</div>
            <div className="Chat"><Chat url={match.url}/></div>
            <div className="Calandar"><Calandar/></div>
        </div>
    )
}

export default GroupMain;