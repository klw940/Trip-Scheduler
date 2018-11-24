import React, { Component } from 'react'
import Chat from "./Chat/Chat";
import Calandar from "./Calendar/Calandar";
import "./GroupMain.css"
//import { PostData } from '../../containers';

class GroupMain extends Component{
    constructor (props){
        super(props)
        this.state={
            groupname:this.props.match.params.groupname,
            username: this.props.match.params.username,
            group:JSON.parse(sessionStorage.getItem('group')), //get session data
        }
    }
    render(){
        //var member = this.state.group[0].user_name;
        var member={name:'ㅇㅇㅇ'}
        return(        
            <div className="GroupMain">
                <div>{this.state.username}-{this.state.groupname}</div>
                <h3>GroupMember</h3>
                {/*member.map(function(name){
                    return <h4>{name}</h4>
                })}*/}
                <div className="Chat"><Chat url={this.props.match.url}/></div>
                <div className="Calandar"><Calandar/></div>
            </div>
        )
    }
}

export default GroupMain;