import React, { Component } from 'react'
import "./GroupMain.css"
import { Icon, Button, Grid, Input, Header } from 'semantic-ui-react';
import { Chat, Calendar, Card } from '../../components';
import { PostData } from '../../containers';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');


class GroupMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.location.state._id,
            groupname: this.props.match.params.groupname,
            username: this.props.match.params.username,
            groupid: sessionStorage.getItem('groupid'),
            membername: this.props.location.state.membername,
            memberid: this.props.location.state.memberid,
            cardVisible: false,
        }
    }

    viewCards = () => {
        this.setState({ cardVisible: !this.state.cardVisible });
    }

    render() {
        return (
            <Grid padded style={{ height: '100vh' }} className="GroupMain">
                <Grid.Row verticalAlign='middle' columns={3} style={{ height: '8%' }} className="Menu">
                    {/* <Menu icon='labeled'> */}

                    <Grid.Column width={1}>
                        <Icon name="tasks" size="big" style={{  marginTop: '0.2em' }} onClick={this.viewCards} />
                    </Grid.Column>
                    <Grid.Column width={8} floated='right'>
                        <Header as='h1' style={{  marginTop: '0.1em' }}>{this.state.username}-{this.state.groupname}</Header>
                    </Grid.Column>
                    <Grid.Column width={5} floated='right'>
                        &nbsp; 이메일: <Input type="text" className="add-memberid" ref={ref => { this.id = ref }} />
                        &nbsp; <Button type="button" onClick={() => {

                            if (this.state.memberid.indexOf(this.id.value) !== -1) {
                                console.log("이미 있음")
                                this.id.value = "";
                                return 0;
                            }
                            console.log(this.state.groupid);
                            let data = {
                                groupid: this.state.groupid,//그룹방
                                newMemberid: this.id.value
                            }
                            this.id.value = "";
                            PostData(this.state.username + '/' + this.state.groupname + '/addmember', data)
                                .then(result => {
                                    this.setState({ memberid: result.data.value.Member_ID });
                                    this.setState({ membername: result.data.value.Member_name });
                                })
                        }
                    }>추가</Button>
                    </Grid.Column>
                    {/* </Menu> */}
                </Grid.Row>
                <Grid.Row columns={2} style={{ height: '90%' }} className="wrapper">
                    <Grid.Column width={4} className="wrapper-row">
                        {
                            this.state.cardVisible ?
                                <Card _id={this.state._id} socket={socket} /> :
                                <Chat className="Chat" _id={this.state._id} socket={socket} username={this.state.username} />
                        }
                    </Grid.Column>
                    <Grid.Column width={12} className="wrapper-row">
                        <Calendar className="Calendar" _id={this.state._id} socket={socket} cal_height={document.getElementsByClassName("Calendar").height} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default GroupMain;
