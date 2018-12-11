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
            placement: "auto",
            container: "body"
          });
          $(this).popover("show");
        },
        eventMouseout: function (eventObj) {
          //or eventRender : function(eventObj, $el)
          $(this).popover("hide");
        },
        eventClick: function (event) {
          //if(checked)인 상태에서 클릭시 삭제 or 클릭시 팝업으로 확인
          $(this).popover("hide");
        },
        events: this.state.events,
        editable: true,
        droppable: true,
        drop: function (date, event) {
          var target = $(event.target);
          var data = {
            channel: cursor.state.channel,
            id: target.children('.id')[0].defaultValue,
            title: target.children(".title").text(),
            contents: target.children(".contents").text(),
            start: date.format(),
            end: date.format()
          };
          socket.emit("sendEvents", data);
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
      await this.setState({ events: data.events });
      $("#calendar").fullCalendar("removeEvents", [data.id]);
    });
  }
  editEvent(){
    this.setState({edit:true});
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
          <div className="edit" onClick={() => this.editEvent()}>
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
