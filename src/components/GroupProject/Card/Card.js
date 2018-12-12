import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import {PostData} from '../../../containers';
import EditCard from './EditCard/EditCard';
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            channel: this.props._id,
            name : sessionStorage.getItem('username'),
            email: sessionStorage.getItem('useremail'),
            cards: [],
        }
    }

    componentDidMount() {
        let cursor = this;
        const { socket, channel } = this.state;
        socket.emit('cardJoin', channel);
        socket.on('cardreceive', async (data) => {
            function onContextMenu(e) {
                var menu = document.getElementById("card-menus");
                e.preventDefault();
                e.stopPropagation();
                menu.classList.add("active");
                menu.style.top = e.clientY + "px";
                const rootW = window.innerWidth * 0.11;
                if (rootW < e.clientX) {
                    menu.style.left = e.clientX - 100 + "px";
                } else {
                    menu.style.left = e.clientX + "px";
                }
                cursor.setState({card:e.target});
                cursor.setState({
                    title: $(e.target).children('.title').text(),
                    content: $(e.target).children('.contents').text(),
                    id: $(e.target)[0].id,
                });
            }
            await this.setState({ cards: data.cards }); //comment: [cardsssss]   저장
            let list = await this.state.cards.map((card) => {
                return (
                    <div className='fc-event' key={card.id} id={card.id} onContextMenu={onContextMenu}>
                        <h3 className='title'>{card.title}</h3>
                        <h5 className='contents'>{card.contents}</h5>
                    </div>
                )
            });
            await this.setState({ list: list })
            $('#external-events .fc-event').each(function () {
                // store data so the calendar knows to render an event upon drop
                var item;
                PostData(cursor.state.name+'/'+cursor.props.groupname+'/eventnum', {id:channel})
                .then(
                    result =>{
                        console.log(result)
                        item={
                            title: $.trim($(this).children('.title').text()), // use the element's text as the event title
                            contents: $.trim($(this).children('.contents').text()),
                            id: result.id,
                            stick: true // maintaicn when user navigates (see docs on the renderEvent method)
                        }
                    }
                )
                

                $(this).data('event', item)
                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0,  //  original position after the drag
                    stop: function (event, ui) {
                        PostData(cursor.state.name + '/' + cursor.props.groupname + '/eventnum', { id: channel })
                            .then(
                                result => {
                                    item = {
                                        title: $.trim($(this).children('.title').text()), // use the element's text as the event title
                                        contents: $.trim($(this).children('.contents').text()),
                                        id: result.id,
                                        stick: true // maintaicn when user navigates (see docs on the renderEvent method)
                                    }
                            }
                        )
                        $(this).data('event', item)
                    },
                });
            });
        })
        socket.on('receiveCards', async data => {
            await cursor.setState({ cards: this.state.cards.concat(data.events) })
            console.log(data);
        })
        socket.on('deleteCards', async data => {
            console.log(data);
            await this.setState({ cards: data.events });
            $(data.card).remove();
        })
    }
    deleteEvent() {
        console.log(this.state.card )
        this.state.socket.emit("removeCards", { id: this.state.eventid, channel: this.state.channel})
        // $(this.state.card).remove()
    }
    render() {
        return (
            <div
                id='external-events'
                onClick={() => document.getElementById("card-menus").classList.remove("active")}
            >
                <h4>Card List</h4>
                {this.state.list}
                <div id="card-menus" className="card-menus">
                    <div className="edit">
                        <EditCard
                            content={this.state.content}
                            title={this.state.title}
                            socket={this.props.socket}
                            channel={this.state.channel}
                        />
                        {/* start={this.state.start}  */}
                    </div>
                    <div className="delete" onClick={() => this.deleteEvent()}>
                        삭제
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;