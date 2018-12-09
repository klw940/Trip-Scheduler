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
            events:[
                {
                    id: 0,
                    title: 'as',
                    start  : '2018-12-05',
                    end    : '2018-12-07',
                    url: '',
                    contents: 'asf'
                }
            ],
            eventId: '',
            channel: this.props._id
        }
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        const { send } = this.send;
        let cursor=this;
        this.props.socket.emit('channelJoinEvents', this.state.channel);
        this.props.socket.on('receiveEvents', function (data) {
            console.log(data)
            //cursor.setState({cheatList:cursor.state.chatList.concat([data])});
        });
        this.props.socket.on('receiveEventsId', function (data) {
            console.log(data)
            cursor.setState({eventId:cursor.state.event_id});
        });

        console.log(this.state)

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            contentHeight: 650,
            droppable: true,
            events: this.state.events,
            drop: function(date, jsEvent) {
                $(this).remove();
                console.log(date.format());
                console.log(jsEvent.target.getValue());
            },
            eventDrop: function( event) {
                console.log(event.title);
                console.log(event.start.format());
                console.log(event.end.format());
                console.log(event.url);
                console.log(event.contents);
            },
            eventResize: function(event) {
                console.log(event.title);
                console.log(event.start.format());
                console.log(event.end.format());
                console.log(event.url);
                console.log(event.contents);
            }
        })
    }

    componentWillUnmount(){
        this.props.socket.emit('channelLeave', this.state.channel);
    }

    send(id, title, start, end ,url){
        this.props.socket.emit('sendEvents',{id: id, title: title, start: start, end: end, url: url, channel: this.state.channel});
    }

    render() {
        return (
            <div id="calendar"/>
        );
    }
}

export default Calendar;