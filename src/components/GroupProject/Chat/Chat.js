import React, {Component} from 'react';
import ChatList from './ChatList';
import './Chat.css'

////스타일 CSS로 이동

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:'',
            channel:this.props._id,
            chatList:[],
            email: sessionStorage.getItem('useremail'),
            username:this.props.username
        };
        this.send = this.send.bind(this);
        this.keysend = this.keysend.bind(this);
        this.inputMSG = this.inputMSG.bind(this);
    }
    componentDidMount(){
        let cursor=this;
        this.props.socket.emit('channelJoin', this.state.channel);
        this.props.socket.on('receive', function (data) {
            console.log(data)
            cursor.setState({chatList:cursor.state.chatList.concat([data])});
            document.querySelector(".chattingView-chatbox").scrollTo(0,document.querySelector(".chattingView-chatbox").scrollHeight);
        });
    }
    componentWillUnmount(){
        this.props.socket.emit('channelLeave', this.state.channel);
    }
    send(){
        this.props.socket.emit('send',{username:this.state.username,email:this.state.email,msg:this.state.msg, channel:this.state.channel});
        this.setState({msg:''});
        document.querySelector(".inputMsg").value="";
    }
    keysend(event){
        if(event.keyCode===13) {
            this.props.socket.emit('send',{username:this.state.username,email:this.state.email,msg:this.state.msg, channel:this.state.channel});
            this.setState({msg:''});
            document.querySelector(".inputMsg").value="";
        }
    }
    inputMSG(event) {
        this.setState({ msg: event.target.value });
    }
    render() {
        let list = this.state.chatList.map((item, index) => 
            ChatList(this.state.email, this.state.email, item, index, this.state.email)
        );

        //렌더 부분
        return (
            <div className="chattingView-body">
                {this.state.email}<br/>
                {this.state.channel}
                <div className="chattingView-chatbox">
                    <div className="chattingView-chat">{list}</div>
                </div>
                <div className="chattingView-input">
                    <input type="text" className=" inputMsg" placeholder="input message..."  onChange={this.inputMSG} onKeyDown={this.keysend}/>
                    <button type="button" className="btn-primary" onClick={this.send}>입력</button>
                </div>
            </div>
        );
    }

}

export default Chat;