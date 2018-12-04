import React, { Component } from 'react'
import Chat from "./Chat/Chat";
import Calandar from "./Calendar/Calandar";
import Card from "./Card/Card";
import "./GroupMain.css"
import { Menu, Icon, Sidebar, Segment } from 'semantic-ui-react';
import { PostData } from '../../containers';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3100');


class GroupMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupname: this.props.match.params.groupname,
            username: this.props.match.params.username,
            groupid: this.props.location.state.groupid,
            membername: this.props.location.state.membername,
            memberid: this.props.location.state.memberid,
            cardVisible: false,
        }
    }

    viewCards = () => {
        this.setState({ cardVisible: !this.state.cardVisible });
    }

    componentDidMount() {
        socket.emit('channelJoin', this.state.channel);
    }

    render() {
        const { cardVisible } = this.state;

        return (
            <div className="GroupMain">

                <Menu icon='labeled'>
                    <Menu.Item name="tasks" onClick={this.viewCards}>
                        <Icon name="tasks" size="big" />
                    </Menu.Item>
                    <h1>{this.state.username}-{this.state.groupname}</h1>
                    <h4>
                        <button type="button" onClick={this.delMember}>나가기</button><br />
                        &nbsp; 이메일: <input type="text" className="add-memberid" ref={ref => { this.id = ref }} />
                        &nbsp; <button type="button" onClick={() => {

                            if (this.state.memberid.indexOf(this.id.value) != -1) {
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
                        }>추가</button>
                    </h4>
                </Menu>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        vertical
                        visible={cardVisible}
                        width='wide'
                    >
                        <Card />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <div className="Chat"><Chat groupname={this.state.groupname} socket={socket} username={this.state.username}/></div>
                        <div className="Calendar"><Calandar /></div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default GroupMain;