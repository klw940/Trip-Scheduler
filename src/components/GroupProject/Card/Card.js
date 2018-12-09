import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: this.props._id,
            email: sessionStorage.getItem('useremail'),
            cards: [],
        }
    }

    componentDidMount() {
        this.props.socket.emit('cardJoin', this.state.channel);
        this.props.socket.on('cardreceive', async (data) => {
            await this.setState({ cards: data.cards }); //comment: [cardsssss]   저장
            let list = await this.state.cards.map((card) => {
                return (
                    <div className='fc-event' key={card.id}>
                        <h3 className='title'>{card.title}</h3>
                        <h5 className='contents'>{card.contents}</h5>
                        <input className='id' type="hidden" ref={id => this.id = id} value={Date.now()} />{/* id는 캘린더 들어갈 때마다 변해야함 */}
                    </div>
                )
            });
            await this.setState({ list: list })
            $('#external-events .fc-event').each(function () {
                   // store data so the calendar knows to render an event upon drop
                   //초기값 있어야 함
                $(this).data('event', {             
                    title: $.trim($(this).children('.title').text()), // use the element's text as the event title
                    contents: $.trim($(this).children('.contents').text()),
                    id: Date.now(),    //// 변경해서 입력되어야함
                    stick: true // maintain when user navigates (see docs on the renderEvent method)
                })
                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0,  //  original position after the drag
                    start: function (event, ui) {
                        $(event.target).data('event', {              
                            title: $.trim($(event.target).children('.title').text()), // use the element's text as the event title
                            contents: $.trim($(event.target).children('.contents').text()),
                            id: Date.now(),    //// 변경해서 입력되어야함
                            stick: true // maintain when user navigates (see docs on the renderEvent method)
                        })
                    }
                });
            });
        })
    }
    render() {
        return (
            <div id='external-events'>
                <h4>Card List</h4>
                {this.state.list}
            </div>
        )
    }
}

export default Card;