import React,{Component} from 'react'
import io from 'socket.io-client';
import './Chat.css'

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg:'',
            channel:this.props.groupname,
            chatList:[],
            email: sessionStorage.getItem('useremail')
        };
        this.send = this.send.bind(this);
        this.keysend = this.keysend.bind(this);
        this.inputMSG = this.inputMSG.bind(this);
    }
    componentDidMount(){
        let cursor=this;
        console.log(this.state.channel)
        this.props.socket.emit('channelJoin', this.state.channel);
        this.props.socket.on('receive', function (data) {
            console.log(data)
            cursor.setState({chatList:cursor.state.chatList.concat([data])});
            document.querySelector(".chattingView-chatbox").scrollTo(0,document.querySelector(".chattingView-chatbox").scrollHeight);
        });
    }
    send(){
        console.log(this.state.email)
        this.props.socket.emit('send',{email:this.state.email,msg:this.state.msg, channel:this.state.channel});
        this.setState({msg:''});
        document.querySelector(".inputMsg").value="";
    }
    keysend(event){
        if(event.keyCode===13) {
            this.props.socket.emit('send',{email:this.state.email,msg:this.state.msg, channel:this.state.channel});
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
            let checkme='Y';
            let date= new Date(item.comment.date);

            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            return(
                <div key={index}>
                    <div className="chattingView-msgline">
                        <div style={item.email==this.state.email?{textAlign:"right"}:{textAlign:"left"}}>
                            <div className="chattingView-msgbox">
                                <span>{item.comment.msg}</span><br/>
                                <span>{addZero(date.getHours())}:{addZero(date.getMinutes())}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div className="chattingView-body">
                {this.state.email}
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