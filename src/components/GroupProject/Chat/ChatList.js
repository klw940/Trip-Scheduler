import React from 'react';

export default function (my_email, pre_email, item, index, thisemail) {

    let date = new Date(item.comment.date);
    let now_email = item.comment.email; // 현재 이메일
    function addZero(i) { // 시간이 한자리 일때 앞에 0추가해줌!
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function emailcheck() {
        if (pre_email !== now_email) {
            pre_email = now_email
            return (
                <p style={{ margin: '5px' }}>{item.comment.username}</p>
            )
        }
    }

    function mycheck() {  
        if (item.comment.email === my_email) {
            return (
                <div>
                    {addZero(date.getHours())}:{addZero(date.getMinutes())}
                    <div className={item.comment.email === my_email ? "balloonY" : "balloonN"}>
                        {item.comment.msg}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className={item.comment.email === my_email ? "balloonY" : "balloonN"}>
                        {item.comment.msg}
                    </div>
                    {addZero(date.getHours())}:{addZero(date.getMinutes())}
                </div>
            )
        }
    }

    return (
        <div key={index}>
            <div className="chattingView-msgline">
                <div style={item.comment.email === thisemail ? { textAlign: "right" } : { textAlign: "left" }}>
                    <div className="chattingView-msgbox">
                        {emailcheck()}
                        {mycheck()}
                    </div>
                </div>
            </div>
        </div>
    )
}