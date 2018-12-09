import React, { Component } from 'react';
import $ from "jquery";
import 'bootstrap';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import './Calandar.css';
class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channel: this.props._id,
            email: sessionStorage.getItem('useremail'),
            events: [],
        }
    }
    componentDidMount() {
        this.props.socket.emit('calendarJoin', this.state.channel);
        this.props.socket.on('calreceive', async (data) => {
            await this.setState({ events: this.state.events.concat(data.events) })
            await $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                eventRender: function (event, element) {
                    element.bind('mousedown', function (e) {
                        if (e.which === 3) {
                            //db에서도 삭제 
                            $('#calendar').fullCalendar( "removeEvents",[event.id] ) // array에 id 추가시 제거 + id를 소켓으로 넘겨줌 
                        }
                    });
                },
                eventMouseover: function (eventObj) {  //or eventRender : function(eventObj, $el)
                    $(this).popover({
                        title: eventObj.title,
                        content: eventObj.description,
                        trigger: 'show', ///// click or hover or 
                        //delay: {show : 1000, hide : 0},
                        placement: 'auto',
                        container: 'body'
                    });
                    $(this).popover('show');
                },
                eventMouseout: function (eventObj) {  //or eventRender : function(eventObj, $el)
                    $(this).popover('hide');
                },
                eventClick: function(event) { //if(checked)인 상태에서 클릭시 삭제 or 클릭시 팝업으로 확인 
                    $(this).popover('hide');
                    console.log(event.id);
                },
                events: this.state.events,
                editable: true,
                droppable: true,
                drop: function(date, event){
                    console.log(event.target);
                },
                contentHeight: 650
            });
            await $('#calendar:not(".fc-event")').on('contextmenu', function (e) {
                e.preventDefault()
            })
        })
        
    }
    render() {
        return (
            <div className="cla_body">
                <div id="calendar" />
            </div>
        );
    }
}

export default Calendar;