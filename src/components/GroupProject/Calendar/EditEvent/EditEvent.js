import React, { Component } from 'react'
import {Button, Input, Modal} from "semantic-ui-react";
import './EditEvent.css'
class EditEvent extends Component {

    constructor(props){
        super(props);
        this.state={
            channel : this.props.channel,
            content:this.props.content,
            open:false,
            date:''
        }
        console.log(this.state.content);
    }

    editEvent = () => {
        var data = {
            id : this.props.eventid,
            title : document.getElementById("event_name2_input").value,
            start : document.getElementById("event_start2_input").value,
            end : document.getElementById("event_end2_input").value,
            contents: document.getElementById("event_content_input").value
        }
        this.props.socket.emit('editEvents', data);
        console.log(data);
        this.close();
    }

    closeConfigShow = (Edit) => () => {     
        this.setState({ Edit, open: true })
    }

    close = () => {
        this.setState({ open: false })
    }
    
    render() {
        function addZero(i) { // 시간이 한자리 일때 앞에 0추가해줌!
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        
        var start = new Date(this.props.start)
        var start_Y=start.getFullYear();
        var start_M = addZero(start.getMonth());
        var start_D = addZero(start.getDate());
        
        var date = ""+start_Y+"-"+start_M+"-"+start_D;

        const { open, Edit } = this.state
        return (
            <div>
                <div onClick={this.closeConfigShow(false)}>변경</div>
                <Modal
                    open={open}
                    Edit={Edit}
                    onClose={this.close}
                    style={{
                        width:700,
                        height:500,
                    }}
                >

                    <Modal.Header>이벤트 변경</Modal.Header>
                    <Modal.Description
                    style={{
                        padding:50
                    }}>
                        <article>
                            <div className="event_section" id="event_name1">타이틀</div>
                            <div className="event_section" id="event_name2"><Input className="event_name2_input" id="event_name2_input" type="text"  placeholder='타이틀 입력' defaultValue={this.props.title} /></div>
                            <div className="event_section" id="event_start1">시작 시간</div>
                            <div className="event_section" id="event_start2"><Input className="event_start2_input" id="event_start2_input" type="date" defaultValue={date}/></div>
                            <div className="event_section" id="event_end1">마감 시간</div>
                            <div className="event_section" id="event_end2"><Input className="event_end2_input" id="event_end2_input" type="date" defaultValue={date}/></div>
                            <div className="event_section" id="event_content"><Input className="event_content_input" id="event_content_input" type="text" defaultValue={this.props.content} /></div>
                            <div className="event_section" id="event_edit"><Button onClick={this.editEvent} color="green">Edit</Button></div>
                            <div className="event_section" id="event_stop"><Button onClick={() => this.close()} color="red">Close</Button></div>
                        </article>
                    </Modal.Description>
                </Modal>
            </div >
        )
    }
}


export default EditEvent;