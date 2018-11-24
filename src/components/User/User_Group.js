import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import CreateGroup from './CreateGroup/CreateGroup';
import './User_Group.css'

class User_Group extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,
            redirect: false,
            username : sessionStorage.getItem('username'),
            email: sessionStorage.getItem('useremail'),
            change: false
        };
    }
    group(groupName, ID, Name) {
        this.setState({ memberid:ID, membername:Name});
        this.setState({ groupName:groupName });
        this.setState({ redirect: true });
    }
    render() {
        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: "/" + this.state.username + "/" + this.state.groupName,
                state:{memberid:this.state.memberid, membername:this.state.membername}
            }}
            />)
        }
        if (!this.state.login) {
            return(<Redirect to='/'/>)
        }
        var list = JSON.parse(sessionStorage.getItem('Group_List')).map(list => {
            return(
                <div className="group">
                    <button key={list._id} onClick={() => this.group(list.Group_Name, list.Member_ID, list.Member_name)}>{list.Group_Name}</button>
                </div>
            )
        })
        return (
            <div className="User_Group">
                {this.state.username}
                <br />
                <h2>Group List</h2>
                <div className="GroupList">{list}</div>
                <br/>
                <CreateGroup name={this.state.username} email={this.state.email} change={()=>{this.setState({change:true})}}/>
                <button onClick ={()=>{
                    sessionStorage.clear()
                    this.setState({login: false})
                }}>logout</button>

            </div>
        )
    }

}

export default User_Group