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

        $('#external-events .fc-event').each(function() {

            $(this).data('event', {
                title: $.trim($(this).text()),
                stick: true
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0
            });
        });
    }

    render() {
        return (
            <>
                <div id='external-events'>
                    <h4>Draggable Events</h4>
                    <div className='fc-event'>My Event 1</div>
                    <div className='fc-event'>My Event 2</div>
                    <div className='fc-event'>My Event 3</div>
                    <div className='fc-event'>My Event 4</div>
                    <div className='fc-event'>My Event 5</div>
                    <p>
                        <input type='checkbox' id='drop-remove' />
                        <label for='drop-remove'>remove after drop</label>
                    </p>
                </div>;
                <div id="calendar"></div>
            </>
        );
    }
}

export default Calendar;