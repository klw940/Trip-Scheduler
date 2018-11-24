import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import CreateGroup from './CreateGroup/CreateGroup';
import {PostData} from '../../containers';
import './User_Group.css'

class User_Group extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,
            redirect: false,
            username : sessionStorage.getItem('username'),
            email: sessionStorage.getItem('useremail'),
        };
    }
    group(groupID, groupName) {
        var group = {
            groupName: groupName,
            id: groupID
        };
        if (group) {
            PostData(this.state.username + '/' + group.groupName, group).then(result => {
                this.setState({ groupName:groupName });
                sessionStorage.setItem("group", JSON.stringify(result.data));
                this.setState({ redirect: true });
            });
        };
    }
    
    render() {
        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: "/" + this.state.username + "/" + this.state.groupName,
            }}
            />)
        }
        if (!this.state.login) {
            return(<Redirect to='/'/>)
        }
        var list = JSON.parse(sessionStorage.getItem('Group_List')).map(list => {
            return(
                <div className="group">
                    <button key={list._id} onClick={() => this.group(list._id, list.Group_Name)}>{list.Group_Name}</button>
                </div>
            )
        })
        return (
            <div className="User_Group">
                {this.state.username}
                <br />
                <h2>Group List</h2>
                {/* map 함수를 통해 반복적인 작업 수행 */}
                {list}
                <br/>
                <CreateGroup name={this.state.username} email={this.state.email}/>
                <button onClick ={()=>{
                    sessionStorage.clear()
                    this.setState({login: false})
                }}>logout</button>

            </div>
        )
    }

}

export default User_Group