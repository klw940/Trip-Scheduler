import React, { Component } from 'react'
import $ from "jquery";
import 'jquery-ui-dist/jquery-ui';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';

class Calendar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            events:[],
        }
    }

    componentDidMount() {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            droppable: true,
            drop: function() {
                if ($('#drop-remove').is(':checked')) {
                    $(this).remove();
                }
            }
        })
    }

    render() {
        return (
            <div id="calendar"></div>
        );
    }
}

export default Calendar;