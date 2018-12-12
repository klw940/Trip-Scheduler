import React, { Component } from "react";
import $ from "jquery";
import "bootstrap";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";
import EditEvent from './EditEvent/EditEvent'
import "./Calandar.css";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: this.props._id,
      email: sessionStorage.getItem("useremail"),
      socket: this.props.socket,
      events: [],
      edit: false
    };
  }
  componentDidMount() {
    const cursor = this;
    const { socket, channel } = this.state;
    socket.emit("calendarJoin", channel);
    socket.on("calreceive", async data => {
      await this.setState({ events: this.state.events.concat(data.events) });
      await $("#calendar").fullCalendar({
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay"
        },
        eventRender: function (event, element) {
          element.bind("mousedown", function (e) {
            $(this).popover("hide");
            if (e.which === 3) {
              cursor.setState({ eventid: event.id, content: event.contents, title: event.title, start:event.start._d });
              var menu = document.getElementById("calendar-menus");
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
            }
          });
        },
        eventMouseover: function (eventObj) {
          $(this).popover({
            title: eventObj.title,
            content: eventObj.contents,
            trigger: "show", ///// click or hover or
            placement: "top",
            container: "body"
          });
          $(this).popover("show");
        },
        eventMouseout: function (eventObj) {
          $(this).popover("hide");
        },
        eventClick: function (event) {
          console.log(event);
          $(this).popover("hide");
        },
        events: this.state.events,
        editable: true,
        droppable: true,
        eventDrop: function(event, jsevent){
          console.log(event);
          var start = event.start.format();
          var end;
          if ( !event.end ){
            if (event.allDay === true) end = new Date(new Date(event.start._d).valueOf() + 1000*3600*24).toISOString().split('T')[0];
            else end = new Date(new Date(event.start._d).valueOf() + 2000*3600).toISOString();
          }
          else end = event.end.format();
          var data = {
            channel: cursor.state.channel,
            id: event.id,
            title: event.title,
            start: start,
            end: end,
            contents: event.contents,
          }
          socket.emit("editEvents", data);
        } ,
        drop: function (date, event) {
          var target = $(event.target);
          //object type == week
          var start = date.format();
          var end;
          if(typeof(date._i)!=="object") 
            end = new Date(new Date(date._d).valueOf() + 1000*3600*24).toISOString().split('T')[0];
          else end = new Date(new Date(date._d).valueOf() + 1000*3600).toISOString();
          var data = {
            channel: cursor.state.channel,
            
            title: target.children(".title").text(),
            contents: target.children(".contents").text(),
            start: start,
            end: end
          };
          socket.emit("sendEvents", data);
        },
        eventResize: function (event, jsevent){
          var start = event.start.format();
          var end = event.end.format();
          var data = {
            channel: cursor.state.channel,
            id: event.id,
            title: event.title,
            start: start,
            end: end,
            contents: event.contents,
          }
          socket.emit("editEvents", data);
        },
        contentHeight: 650
      });
      await $('#calendar:not(".fc-event")').on("contextmenu", function (e) {
        e.preventDefault();
      });
    });
    socket.on("receiveEvents", async data => {
      await this.setState({ events: this.state.events.concat(data.events) });
      $("#calendar").fullCalendar("renderEvents", [data.events]);
    });
    socket.on("editEvents", async data => {
      var events= this.state.events;
      events[events.findIndex(x=>x.id===data.id)]=data;
      this.setState({events:events});
      $("#calendar").fullCalendar('removeEvents'); 
      $("#calendar").fullCalendar('addEventSource', this.state.events);
      //fullcalendar update가 있었지만 정상작동하지 않음 
    });

    socket.on("deleteEvents", async data => {
      console.log(data.events);
      await this.setState({ events: data.events });
      $("#calendar").fullCalendar("removeEvents", [data.id]);
    });
  }
  deleteEvent() {
    $("#calendar").fullCalendar("removeEvents", [this.state.eventid]); // array에 id 추가시 제거 + id를 소켓으로 넘겨줌
    this.state.socket.emit("removeEvents", { id:this.state.eventid, channel:this.state.channel })
  }
  render() {
    return (
      <div
        id="calendar"
        onClick={ () => document.getElementById("calendar-menus").classList.remove("active") }
      >
        <div id="calendar-menus" className="calendar-menus">
          <div className="edit" onClick={()=> this.editEvent()}>
            <EditEvent eventid ={this.state.eventid} content={this.state.content} title={this.state.title} socket={this.props.socket} channel={this.state.channel} start ={this.state.start} />
          </div>
          <div className="delete" onClick={() => this.deleteEvent()}>
            삭제
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
