import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import CreateGroup from './CreateGroup/CreateGroup';
import './User_Group.css'
import User_Group_Info from "./User_Group_Info";
import {Item, Button, Grid} from "semantic-ui-react";

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
        var list = JSON.parse(sessionStorage.getItem('Group_List')).map(
            list => (<User_Group_Info
                key={list._id}
                list={list}
                group={() => {this.group(list.Group_Name, list.Member_ID, list.Member_name)}}
            />)
        )
        return (
            <Grid centered columns={2} className="User_Group">
                <Grid.Row>
                    <Grid.Column width={5}>
                        <h2>{this.state.username}'s Group List</h2>
                    </Grid.Column>
                    <Grid.Column right width={1}>
                        <Button onClick ={()=>{
                            sessionStorage.clear()
                            this.setState({login: false})
                        }}>logout</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Item.Group divided className="GroupList" >{list}</Item.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <CreateGroup name={this.state.username} email={this.state.email} change={()=>{this.setState({change:true})}}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

}

export default User_Group