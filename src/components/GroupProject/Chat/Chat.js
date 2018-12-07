import React, {Component} from 'react';
import './Chat.css'

////스타일 CSS로 이동

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false, //채팅 우클릭시 메뉴 보여주기위한 체크
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
        this.setState({msg: event.target.value});
    }

    render() {
        //우클릭 메뉴창
        var test = document.getElementById("context-menus");

        /* 마우스 왼클릭 감지 */
        function leftMouseListener() {
            document.addEventListener("click", function(e) {
                toggleOnOff(0);
            })
        }

        /* 마우스 메뉴 on & off */
        function toggleOnOff(num) {
            num === 1 ? test.classList.add("active") : test.classList.remove("active");
        }

        function showMenu(x, y) {
            test.style.top = y + "px";
            const rootW =  window.innerWidth*0.11;
            if(rootW<x){
                test.style.left = x-100 + "px";
            }
            else {
                test.style.left = x + "px";
            }

        }

        function onContextMenu(e) {
            e.preventDefault();
            //e.stopPropagation();
            toggleOnOff(1);
            console.log(e)
            console.log(e.target.textContent);
            showMenu(e.clientX, e.clientY);
            //alert(''+e.clientX+' / '+e.clientY);
        };

        //채팅 불러오기!!
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
                        <div onClick={leftMouseListener}>
                            {addZero(date.getHours())}:{addZero(date.getMinutes())}
                            <div className={item.comment.email==my_email?"balloonY":"balloonN"}>
                                <div className="msg_text" onContextMenu={onContextMenu}>
                                {item.comment.msg}
                                </div>
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div onClick={leftMouseListener}>
                            <div className={item.comment.email==my_email?"balloonY":"balloonN"}>
                                <div id="msg_text" onContextMenu={onContextMenu}>
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
                            <div id="chattingView-msgbox">
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
            <div className="chat">
            <div id="context-menus" class="context-menus">
                카드만들기
            </div>

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
            </div>
        );
    }

}

export default Chat;

// _handleContextMenu = (event) => {
//     event.preventDefault();
//
//     this.setState({ visible: true });
//
//     const clickX = event.clientX;//누른곳 x
//     const clickY = event.clientY;//누른곳 y
//     const screenW = window.innerWidth;
//     const screenH = window.innerHeight;
//     const rootW = this.root.offsetWidth;
//     const rootH = this.root.offsetHeight;
//
//     const right = (screenW - clickX) > rootW;
//     const left = !right;
//     const top = (screenH - clickY) > rootH;
//     const bottom = !top;
//
//     if (right) {
//         this.root.style.left = `${clickX + 5}px`;
//     }
//
//     if (left) {
//         this.root.style.left = `${clickX - rootW - 5}px`;
//     }
//
//     if (top) {
//         this.root.style.top = `${clickY + 5}px`;
//     }
//
//     if (bottom) {
//         this.root.style.top = `${clickY - rootH - 5}px`;
//     }
// };