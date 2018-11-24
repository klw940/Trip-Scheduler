import React from 'react';
import 'fullcalendar/dist/fullcalendar.min.css'
import 'fullcalendar-scheduler/dist/scheduler.min.css'
import './fullcalendar.css';
import FullCalendar from 'fullcalendar-reactwrapper';

//후에 components로 옮길예정

class ExampleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    title: 'All Day Event',
                    start: '2017-05-01'
                },
                {
                    title: 'Long Event',
                    start: '2017-05-07',
                    end: '2017-05-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-05-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-05-16T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2017-05-11',
                    end: '2017-05-13'
                },
                {
                    title: 'Meeting',
                    start: '2017-05-12T10:30:00',
                    end: '2017-05-12T12:30:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2017-05-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2017-05-28'
                }
            ],
        }
    }

    render() {
        return (
            <div id="example-component">                  
                <FullCalendar
                draggedEl = {true}
                    id="your-custom-ID" //div id 
                    droppable= {true}
                    header={{
                        left: 'prev,next today myCustomButton',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    }}
                    defaultDate={'2017-05-12'}

                    navLinks={true} // can click day/week names to navigate views
                    editable={true}
                    eventLimit={true} // allow "more" link when too many events
                    events={this.state.events}
                    drop={function (arg) {
                        // is the "remove after drop" checkbox checked?
                        if (document.getElementById('drop-remove').checked) {
                            // if so, remove the element from the "Draggable Events" list
                            arg.draggedEl.parentNode.removeChild(arg.draggedEl);
                        }
                    }}

                />
            </div>
        );
    }
}
export default ExampleComponent;
