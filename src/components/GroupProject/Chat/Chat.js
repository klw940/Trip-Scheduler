import React,{Component} from 'react'
import io from 'socket.io-client';
import './Chat.css'

const socket = io.connect('http://localhost:3100');
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {msg:'', channel:'123', chatList:[]};
        this.send = this.send.bind(this);
        this.keysend = this.keysend.bind(this);
        this.inputMSG = this.inputMSG.bind(this);
    }
    componentDidMount(){
        let cursor=this;
        console.log(this.state.channel)
        socket.emit('channelJoin', this.state.channel);
        socket.on('receive', function (data) {
            console.log(data)
            cursor.setState({chatList:cursor.state.chatList.concat([data])});
            document.querySelector(".chattingView-chatbox").scrollTo(0,document.querySelector(".chattingView-chatbox").scrollHeight);
        });
    }
    componentWillReceiveProps(changeProps){
        socket.emit('channelLeave', this.state.channel);
        this.setState({channel:changeProps.channel},()=>{
            this.setState({chatList:[]});
            socket.emit('channelJoin', this.state.channel);
        });
    }
    send(){
        socket.emit('send',{msg:this.state.msg, channel:this.state.channel});
        this.setState({msg:''});
        document.querySelector(".inputMsg").value="";
    }
    keysend(event){
        if(event.keyCode===13) {
            socket.emit('send',{msg:this.state.msg, channel:this.state.channel});
            this.setState({msg:''});
            document.querySelector(".inputMsg").value="";
        }
    }
    inputMSG(event) {
        this.setState({ msg: event.target.value });
    }
    render() {
        let list = this.state.chatList.map((item, index) =>{
            console.log(item)
            let date= new Date(item.comment.date);
            return(
                <div key={index}>
                    {item.comment.ip!=null?
                        <div className="chattingView-header">
                            <div>{item.comment.ip}</div>
                            <div>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</div>
                        </div>:null}
                    <div className="chattingView-msg">{item.comment.msg}</div>
                </div>
            )
        });
        return (
            <div className="chattingView-body">
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