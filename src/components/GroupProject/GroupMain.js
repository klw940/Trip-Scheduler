import React, { Component } from 'react'
import "./GroupMain.css"
import { Icon, Header, Button } from 'semantic-ui-react';
import {Chat, Calendar, Card} from '../../components';
import { PostData } from '../../containers';
import io from 'socket.io-client';
import * as ReactDOM from "react-dom";
var socket;


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
    componentWillMount(){
        socket= io.connect('http://localhost:3001');
        socket.emit("channel", this.state._id);
    }
    componentDidMount(){
        //await this.state.socket.emit("channelLeave", this.state._id)
    }

    componentWillUnmount(){
        var check
        check = document.querySelector(".GroupMain");
        ReactDOM.unmountComponentAtNode(check);
        socket.emit("channelLeave",this.state._id);
        socket.disconnect();
    }

    viewCards = () => {
        this.setState({ cardVisible: !this.state.cardVisible });
    }
    render() {
        return (
            <div className="GroupMain">
                <div className="Menu" style={{backgroundColor: 'paleturquoise'}}>
                    <Icon name="tasks" size="big" style={{ marginTop: '1em', cursor: 'pointer', float: 'left', width: '5%' }} onClick={this.viewCards}/>
                    <Header as='h1' style={{float:'left', width: '70%'}}>{this.state.username}-{this.state.groupname}</Header>
                    <div>
                        <h4 style={{ marginTop: '1em', float: 'right', width: '20%'}}>
                            &nbsp; 이메일: <input type="text" className="add-memberid" ref={ref => { this.id = ref }} />
                            &nbsp; <Button onClick={() => {
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
                        </h4>
                    </div>
                </div>
                <div className="wrapper">
                    <div
                        className="wrapper-row"
                        onContextMenu={e => {e.preventDefault();}}
                    >
                        {
                            this.state.cardVisible ?
                                <Card _id={this.state._id} socket={socket} groupnmae={this.state.groupname}/>:
                                <Chat className="Chat" _id={this.state._id} socket={socket} username={this.state.username}/>
                        }
                    </div>
                    <div className="wrapper-row">
                        <Calendar className="Calendar" _id={this.state._id} socket={socket} cal_height={document.getElementsByClassName("Calendar").height}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupMain;
