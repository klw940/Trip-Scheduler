import React, { Component } from 'react'
import $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import PostData from "../../../containers/PostData/PostData";

class Calendar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            events:[],
            eventId: '',
            channel: this.props._id
        }
    }

    componentDidMount() {
        const { socket } = this.props;
        const { channel, events } = this.state;
        const cursor = this;
        this.props.socket.emit('channelJoinEvents', channel);
        this.props.socket.on('receiveEvents', function (data) {
            console.log(data)
            cursor.setState({events: cursor.state.events.concat(data)});
            $('#calendar').fullCalendar('renderEvents', data);
        });

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            contentHeight: 650,
            droppable: true,
            drop: function(date, jsEvent) {
                $(this).remove();
                socket.emit('sendEvents',{id: Date.now(), title: jsEvent.target.title, start: date.format(), end: '', contents: jsEvent.target.contents, channel: channel});
            },
            eventDrop: function(event) {
                console.log(event.title);
                console.log(event.start.format());
                if(event.end){
                    console.log(event.end.format());
                }
                console.log(event.contents);
            },
            eventResize: function(event) {
                console.log(event.title);
                console.log(event.start.format());
                if(event.end){
                    console.log(event.end.format());
                }
                console.log(event.contents);
            }
        })
    }

    componentWillUnmount(){
        this.props.socket.emit('channelLeave', this.state.channel);
    }

    render() {
        return (
            <div id="calendar"/>
        );
    }
}

export default Calendar;