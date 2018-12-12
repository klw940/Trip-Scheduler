import React, { Component } from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { User_Group_Info, CreateGroup } from '../../components';
import { PostData } from '../../containers';
import { Image, Grid, Button, Item, Segment, Header, Icon } from 'semantic-ui-react';
import './User_Group.css'
import {CSSTransitionGroup} from "react-transition-group";

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
            <div className="User_Group" style={{ backgroundImage: 'url('+"background_image.jpg"+')', backgroundSize: 'cover'}}>
                <Grid columns={2} className="User_Group" style={{margin:'0'}} >
                    <Grid.Row stretched>
                        <Grid.Column width={4} verticalAlign="middle">
                            <CSSTransitionGroup
                                transitionName="userTransition"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnter={false}
                                transitionLeave={false}>
                                <Segment>
                                    <Image src="racheal.png"></Image>
                                    <Header as='h3'>{this.state.username}</Header>
                                </Segment>
                            </CSSTransitionGroup>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Grid.Row verticalAlign='middle' columns={2}>
                                <Grid.Column>
                                    <Button onClick={this.Logout}  floated='right' size='mini' color='red'>logout</Button>
                                </Grid.Column>
                                <Grid.Column style={{ marginTop: '3em' }}>
                                    <Header as='h1'><Icon name="paper plane outline"/>{this.state.username}'s Group List</Header>
                                </Grid.Column>
                            </Grid.Row>
                            <CSSTransitionGroup
                                transitionName="GroupListTransition"
                                transitionAppear={true}
                                transitionAppearTimeout={1000}
                                transitionEnter={false}
                                transitionLeave={false}>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <Segment textAlign='left' >
                                            <Item.Group divided className="GroupList" >{list}</Item.Group>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row style={{ marginTop: '3em' }}>
                                    <Grid.Column width={2}>
                                        <CreateGroup name={this.state.username} email={this.state.email} change={() => { this.setState({ change: true }) }} />
                                    </Grid.Column>
                                </Grid.Row>
                            </CSSTransitionGroup>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default withRouter(User_Group)