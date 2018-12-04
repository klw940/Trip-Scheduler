import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import CreateGroup from './CreateGroup/CreateGroup';
import { Header, Image, Sidebar, Grid, Button, Item } from 'semantic-ui-react';
import './User_Group.css'
import User_Group_Info from "./User_Group_Info";

class User_Group extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,
            redirect: false,
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('useremail'),
            change: false
        };
    }
    group(groupID, groupName, ID, Name) {
        this.setState({ groupID: groupID, groupName:groupName, memberid:ID, membername:Name});
        this.setState({ redirect: true });
    }
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    render() {
        if (this.state.redirect) {
            return (<Redirect to={{
                pathname: "/" + this.state.username + "/" + this.state.groupName,
                state:{memberid:this.state.memberid, membername:this.state.membername, groupid:this.state.groupID}
            }}
            />)
        }
        if (!this.state.login) {
            return (<Redirect to='/' />)
        }

        var list = JSON.parse(sessionStorage.getItem('Group_List')).map(
            list => (<User_Group_Info
                key={list._id}
                list={list}
                group={() => {this.group(list._id, list.Group_Name, list.Member_ID, list.Member_name)}}
            />)
        )
        return (
            <div className="User_Group">
                <Grid centered columns={2} className="User_Group">
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <h2>{this.state.username}'s Group List</h2>
                        </Grid.Column>
                        <Grid.Column right width={1}>
                            <Button onClick ={()=>{
                                sessionStorage.clear()
                                this.setState({login: false})
                            }}  size='mini' color='red' style={{ marginTop: '1em' }}>
                            logout</Button>
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
                    <Grid.Row>
                        <Sidebar vertical visible width='thick'>
                            <Image src="racheal.png"></Image>
                            {this.state.username}
                        </Sidebar>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

}

export default User_Group