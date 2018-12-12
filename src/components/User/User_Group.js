import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { User_Group_Info, CreateGroup } from '../../components';
import { PostData } from '../../containers';
import { Image, Sidebar, Grid, Button, Item, GridColumn, Segment, Header } from 'semantic-ui-react';
import './User_Group.css'

class User_Group extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            login: true,
            redirect: false,
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('useremail'),
            reload: false,
            change: false
        };
    }
    componentWillMount() {
        this.props.history.push('/' + this.state.username);  ///may be.... dev mode render twice
        PostData(this.state.username, { name: this.state.username, email: this.state.email })
            .then(result => {
                sessionStorage.setItem('Group_List', JSON.stringify(result.data));// session 저장
                this.setState(result);
            })  // render 부분으로 이동시 무한 루프
    }
    group(groupID, groupName, ID, Name, _id) {
        this.setState({ groupID: groupID, groupName: groupName, memberid: ID, membername: Name, _id: _id });
        this.setState({ redirect: true });
    }
    Logout = () => {
        sessionStorage.clear()
        this.setState({ login: false })
    }
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    render() {
        if (this.state.redirect) {
            sessionStorage.setItem("groupid", this.state.groupID);
            return (<Redirect to={{
                pathname: "/" + this.state.username + "/" + this.state.groupName,
                state: { memberid: this.state.memberid, membername: this.state.membername, _id: this.state._id }
            }}
            />)
        }
        if (!this.state.login) {
            return (<Redirect to='/' />)
        }
        var count = 0;
        var list = JSON.parse(sessionStorage.getItem('Group_List')).map(

            // eslint-disable-next-line
            list => (<User_Group_Info
                key={list._id}
                count={count++}
                list={list}
                history={() => { this.setState({ reload: true }) }}
                group={() => { this.group(list._id, list.Group_Name, list.Member_ID, list.Member_name, list._id) }}
            />)
        )
        return (
            <div className="User_Group">
                <Grid centered columns={2} className="User_Group">
                    <Grid.Row stretched>
                        <Grid.Column width={4}>
                            <Segment>
                                <Image src="racheal.png"></Image>
                                {this.state.username}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Grid.Row verticalAlign='middle' columns={2} style={{ marginTop: '3em' }}>
                                <Grid.Column>
                                    <Header as='h1'>{this.state.username}'s Group List</Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.Logout} size='mini' color='red'>logout</Button>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Segment width={8}>
                                    <Item.Group divided className="GroupList" >{list}</Item.Group>
                                </Segment>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <CreateGroup name={this.state.username} email={this.state.email} change={() => { this.setState({ change: true }) }} />
                                </Grid.Column>
                            </Grid.Row>
                            {/* <Grid.Row>
                                <Sidebar vertical="true" visible>
                                    <Image src="racheal.png"></Image>
                                    {this.state.username}
                                </Sidebar>
                            </Grid.Row> */}
                        </Grid.Column>
                    </Grid.Row>
                    {/* <Grid.Row style={{ marginTop: '2em'}}>
                        <Grid.Column width={7}>
                            <h1>{this.state.username}'s Group List</h1>
                        </Grid.Column>
                        <Grid.Column right="true" width={1}>
                            <Button onClick={this.Logout} size='mini' color='red' style={{ marginTop: '1em' }}>logout</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Item.Group divided className="GroupList" >{list}</Item.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <CreateGroup name={this.state.username} email={this.state.email} change={() => { this.setState({ change: true })}}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Sidebar vertical="true" visible>
                            <Image src="racheal.png"></Image>
                            {this.state.username}
                        </Sidebar>
                    </Grid.Row> */}
                </Grid>

            </div>
        )
    }
}

export default withRouter(User_Group)