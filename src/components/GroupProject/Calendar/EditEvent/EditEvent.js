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
    }

    editEvent = () => {
        var data = {
            channel: this.state.channel,
            id : this.props.eventid,
            title : document.getElementById("event_name2_input").value,
            start: this.props.start,
            end: this.props.end,
            contents: document.getElementById("event_content_input").value
        }
        this.props.socket.emit('editEvents', data);
        this.close();
    }

    closeConfigShow = (Edit) => () => {     
        this.setState({ Edit, open: true })
    }

    close = () => {
        this.setState({ open: false })
    }
    
    render() {
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
                        height:350,
                    }}
                >

                    <Modal.Header>이벤트 변경</Modal.Header>
                    <Modal.Description
                    style={{
                        padding:50
                    }}>
                        <article>
                            <div className="event_section" id="event_name1">타이틀</div>
                            <div className="event_section" id="event_name2"><Input className="event_name2_input" id="event_name2_input" type="text"  placeholder='타이틀 입력' defaultValue={this.props.title} required={true}/></div>
                            <div className="event_section" id="event_content"><Input className="event_content_input" id="event_content_input" type="text" defaultValue={this.props.content} required={true}/></div>
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