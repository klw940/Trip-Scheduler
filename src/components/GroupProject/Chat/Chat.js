import React, { Component } from "react";
import "./Chat.css";
import CreateCard from "./CreateCard/CreateCard";

////스타일 CSS로 이동

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, //채팅 우클릭시 메뉴 보여주기위한 체크
            msg: "",
            channel: this.props._id,
            chatList: [],
            email: sessionStorage.getItem("useremail"),
            username: this.props.username,
            open: false
        };
        this.send = this.send.bind(this);
        this.keysend = this.keysend.bind(this);
        this.inputMSG = this.inputMSG.bind(this);
    }
    componentDidMount() {
        let cursor = this;
        this.props.socket.emit("channelJoin", this.state.channel);
        this.props.socket.on("receive", async data => {
            await this.setState({
                chatList: this.state.chatList.concat(data.comment)
            });
            //우클릭 메뉴창
            var menu = document.getElementById("context-menus");

            /* 마우스 왼클릭 감지 */
            function leftMouseListener() {
                document.addEventListener("click", function (e) {
                    toggleOnOff(0);
                });
            }

            /* 마우스 메뉴 on & off */
            function toggleOnOff(num) {
                if (num === 1) {
                    menu.classList.add("active");
                } else {
                    menu.classList.remove("active");
                }
            }

            function showMenu(x, y) {
                menu.style.top = y + "px";
                const rootW = window.innerWidth * 0.11;
                if (rootW < x) {
                    menu.style.left = x - 100 + "px";
                } else {
                    menu.style.left = x + "px";
                }
            }
            //채팅 불러오기!!

            var my_email = this.state.email;
            var pre_email = this.state.email;
            let list = await this.state.chatList.map((item, index) => {
                let date = new Date(item.date);
                let now_email = item.email; // 현재 이메일
                function addZero(i) {
                    // 시간이 한자리 일때 앞에 0추가해줌!
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }
                function emailcheck() {
                    if (pre_email !== now_email) {
                        pre_email = now_email;
                        return <p style={{ margin: "5px" }}>{item.username}</p>;
                    }
                }
                function mycheck() {
                    let content=item.msg;
                    content=item.msg.replace(/<br\/>/g, '\n');
                    if (item.email === my_email) {
                        return (
                            <div onClick={leftMouseListener}>
                                {addZero(date.getHours())}:{addZero(date.getMinutes())}
                                <div
                                    className={item.email === my_email ? "balloonY" : "balloonN"}

                                    onContextMenu={onContextMenu}
                                >
                                    <pre className="msg_pre">{content}</pre>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div onClick={leftMouseListener} >
                                <div
                                    className={item.email === my_email ? "balloonY" : "balloonN"}
                                    onContextMenu={onContextMenu}
                                >
                                    <pre className="msg_pre">{content}</pre>
                                </div>
                                {addZero(date.getHours())}:{addZero(date.getMinutes())}
                            </div>
                        );
                    }
                }
                return (
                    <div key={index}>
                        <div className="chattingView-msgline">
                            <div
                                style={
                                    item.email === this.state.email
                                        ? { textAlign: "right" }
                                        : { textAlign: "left" }
                                }
                            >
                                <div id="chattingView-msgbox">
                                    {emailcheck()}
                                    {mycheck()}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
            function onContextMenu(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleOnOff(1);
                showMenu(e.clientX, e.clientY);
                cursor.setState({ content: e.target.textContent });
            }
            await this.setState({ list: list });
            await document
                .querySelector(".chattingView-chatbox")
                .scrollTo(
                    0,
                    document.querySelector(".chattingView-chatbox").scrollHeight
                );
        });
    }
    send() {
        let content=this.state.msg.replace(/\n|\r/g, '<br/>');
        this.props.socket.emit("send", {
            username: this.state.username,
            email: this.state.email,
            msg: content,
            channel: this.state.channel
        });
        this.setState({ msg: "" });
        document.querySelector(".inputMsg").value = "";
    }
    keysend(event) {
        let content=this.state.msg.replace(/\n|\r/g, '<br/>');
        if (event.keyCode === 13) {
            if (event.ctrlKey) { //ctrl enter로 개행
                document.querySelector(".inputMsg").value=event.target.value+'\n';
            }
            else { //엔터로 송신
                this.props.socket.emit("send", {
                    username: this.state.username,
                    email: this.state.email,
                    msg: content,
                    channel: this.state.channel
                });
                this.setState({msg: ""});
                document.querySelector(".inputMsg").value = "";
                event.preventDefault();
            }
        }
    }
    inputMSG(event) {
        this.setState({ msg: event.target.value });
    }

    render() {
        //렌더 부분
        return (
            <div
                className="chat"
                onContextMenu={e => {
                    e.preventDefault();
                }}
            >
                <div id="context-menus" className="context-menus">
                    <CreateCard content={this.state.content} socket={this.props.socket} channel={this.state.channel} />
                </div>
                <div className="chattingView-body">
                    <div className="chattingView-chatbox">
                        <div className="chattingView-chat">{this.state.list}</div>
                    </div>
                    <div className="chattingView-input">
                        <div className="inputMsg-box">
            <textarea
                className=" inputMsg"
                placeholder="input message..."
                onChange={this.inputMSG}
                onKeyDown={this.keysend}
            />
                        </div>
                        <div className="btn-primary-box">
                            <button type="button" className="btn-primary" onClick={this.send}>
                                입력
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
