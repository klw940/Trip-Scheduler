import React, {Component} from 'react';
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
        var my_email=this.state.email;
        var pre_email=this.state.email;
        let list = this.state.chatList.map((item, index) =>{
            let date= new Date(item.comment.date);
            let now_email = item.comment.email; // 현재 이메일
            function addZero(i) { // 시간이 한자리 일때 앞에 0추가해줌!
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            function emailcheck() {
                if(pre_email!=now_email){
                    pre_email=now_email
                    return(
                        <p style={{margin:'5px'}}>{item.comment.username}</p>
                    )
                }
            }
            function mycheck() {
                if(item.comment.email==my_email){
                    return(
                        <div>
                            {addZero(date.getHours())}:{addZero(date.getMinutes())}
                            <div className={item.comment.email==my_email?"balloonY":"balloonN"}>
                                <div className="msg_text">
                                {item.comment.msg}
                                </div>
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div>
                            <div className={item.comment.email==my_email?"balloonY":"balloonN"}>
                                <div className="msg_text">
                                    {item.comment.msg}
                                </div>
                            </div>
                            {addZero(date.getHours())}:{addZero(date.getMinutes())}
                        </div>
                    )
                }
            }
            return(
                <div key={index}>
                    <div className="chattingView-msgline">
                        <div style={item.comment.email==this.state.email?{textAlign:"right"}:{textAlign:"left"}}>
                            <div className="chattingView-msgbox">
                                {emailcheck()}
                                {mycheck()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

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