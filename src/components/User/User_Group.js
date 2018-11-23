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
            Group_List:JSON.parse(sessionStorage.getItem('Group_List')), //get session data
            username : this.props.match.params.username
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
        return (
            <div className="User_Group">
                {this.state.username}
                <br />
                <h2>Group List</h2>
                {/* map 함수를 통해 반복적인 작업 수행 */}
                {this.state.Group_List.map(list => {
                    //warning key 제거를 위해 unique한 값 부여
                    return <button key={list._id} onClick={() => this.group(list._id, list.Group_Name)}>{list.Group_Name}</button>
                })}
                <br />
                <CreateGroup />
                <button onClick ={()=>{
                    sessionStorage.clear()
                    this.setState({login: false})
                }}> logout</button>

            </div>
        )
    }

}

export default User_Group