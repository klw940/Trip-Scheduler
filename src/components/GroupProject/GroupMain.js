import React, { Component } from 'react'
import Chat from "./Chat/Chat";
import Calandar from "./Calendar/Calandar";
import Card from "./Card/Card";
import "./GroupMain.css"
import { Menu, Icon, Sidebar, Segment } from 'semantic-ui-react';
//import { PostData } from '../../containers';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3100');

class GroupMain extends Component{
    constructor (props){
        super(props)
        this.state={
            groupname:this.props.match.params.groupname,
            username: this.props.match.params.username,
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
    render(){
        const { cardVisible } = this.state;

        return(
            <div className="GroupMain">
                <Menu icon='labeled'>
                    <Menu.Item name="tasks" onClick={this.viewCards}>
                        <Icon name="tasks" size="big"/>
                    </Menu.Item>
                    <h1>{this.state.username}-{this.state.groupname}</h1>
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
                        <div className="Chat"><Chat groupname={this.state.groupname}/></div>
                        <div className="Calendar"><Calandar/></div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                {/*<h3>GroupMember</h3>*/}
                {/*{this.state.membername.map(function(name){*/}
                {/*return <h4>{name}</h4>*/}
                {/*})}*/}
                {/*{this.state.memberid.map(function(name){*/}
                {/*return <h4>{name}</h4>*/}
                {/*})}*/}
                <div className="Chat"><Chat groupname={this.state.groupname} socket={socket}/></div>
                <div className="Calandar"><Calandar/></div>
            </div>
        )
    }
}

export default GroupMain;