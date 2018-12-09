import React, {Component} from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import PostData from "../../../containers/PostData/PostData";

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            channel: this.props._id,
            events:[],
        }
    }

    componentDidMount() {

        $('#external-events .fc-event').each(function() {

            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                id: $(this).attr('id'),
                title: $(this).attr('title'),
                stick: true
            });

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
        let data = {
            groupid: this.props._id
        }
        PostData(this.props.username + '/' + this.props.groupname + '/cards', data).then(result => {
            this.setState({ events: result.data.value.events});
        })
    }

    render() {
        /*var events = JSON.parse(this.state).map(
            events => (<div className="fc-event"
                            key={events.id}
                            title={events.title}
                            start={events.start}
                            end={events.end}
                            url={events.url}
            />)
        );
*/
        return (
            <div id='external-events'>
                <h4>Card List</h4>
                <div className='fc-event' title='My Event 1' id='1' contents="event1">My Event 1</div>
                <div className='fc-event' title='My Event 2' id='2' contents="event2">My Event 2</div>
                <div className='fc-event' title='My Event 3' id='3' contents="event3">My Event 3</div>
                <div className='fc-event' title='My Event 4' id='4' contents="event4">My Event 4</div>
                <div className='fc-event' title='My Event 5' id='5' contents="event5">My Event 5</div>
            </div>
        )
    }
}

export default Card;