import React, { Component } from 'react'
// import { PostData } from '../../../containers';
import {Button, Grid, Input, Modal} from "semantic-ui-react";
import './CreateCard.css'
class CreateCard extends Component {

    constructor(props){
        super(props);
        this.state={
            channel : this.props.channel,
            content:this.props.content,
            open:false,
            date:''
        }
        console.log(this.state.content);
    }

    createCard = () => {
        console.log(document.getElementById("card_name2").children[0].children[0].value);
        console.log(document.getElementById("card_start2").children[0].children[0].value);
        console.log(document.getElementById("card_end2").children[0].children[0].value);
        console.log(this.props.content);
        var data = {
            title: document.getElementById("card_name2").children[0].children[0].value,
            start : document.getElementById("card_start2").children[0].children[0].value,
            end : document.getElementById("card_end2").children[0].children[0].value,
            content:this.props.content
        }
        this.props.socket.emit('createcard', {card : data,channel : this.state.channel});
        console.log(data);
        this.close();
    }

    closeConfigShow = (Create) => () => {     /*closeConfigShow(Create){()=>{this.setState}}*/
        this.setState({ Create, open: true })
    }

    close = () => {
        this.setState({ open: false })
    }

    componentDidMount(){
        function addZero(i) { // 시간이 한자리 일때 앞에 0추가해줌!
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        var today=new Date();
        var today_Y=today.getFullYear();
        var today_M=addZero(today.getMonth());
        var today_D=addZero(today.getDate());
        console.log(today_Y);
        console.log(today_M);
        console.log(today_D);
        this.setState({date : ""+today_Y+"-"+today_M+"-"+today_D})
    }

    render() {
        var content =this.props.content;

        const { open, Create } = this.state
        return (
            <div>
                <div onClick={this.closeConfigShow(false)}>카드 만들기</div>
                <Modal
                    open={open}
                    create={Create}
                    onClose={this.close}
                    style={{
                        width:700,
                        height:500,
                    }}
                >

                    <Modal.Header>카드 만들기</Modal.Header>
                    <Modal.Description
                    style={{
                        padding:50
                    }}>
                        {/*<Grid centered columns={5}>*/}
                            {/*<Grid.Row>*/}
                                {/*<Grid.Column width={1}>*/}
                                    {/*카드명 :*/}
                                {/*</Grid.Column>*/}
                                {/*<Grid.Column width={4}>*/}
                                    {/*<Input type="text"  placeholder='카드명 입력' />*/}
                                {/*</Grid.Column>*/}
                            {/*</Grid.Row>*/}

                            {/*<Grid.Row>*/}
                                {/*<Grid.Column width={1}>*/}
                                    {/*시작 시간*/}
                                {/*</Grid.Column>*/}
                                {/*<Grid.Column width={4}>*/}
                                    {/*<Input type="date"/>*/}
                                {/*</Grid.Column>*/}
                            {/*</Grid.Row>*/}

                            {/*<Grid.Row>*/}
                                {/*<Grid.Column width={1}>*/}
                                    {/*마감 시간*/}
                                {/*</Grid.Column>*/}
                                {/*<Grid.Column width={4}>*/}
                                    {/*<Input type="date"/>*/}
                                {/*</Grid.Column>*/}
                            {/*</Grid.Row>*/}

                            {/*<Grid.Row>*/}
                                {/*<Grid.Column width={5}>*/}
                                    {/*<Input type="text"  value={this.props.content} />*/}
                                {/*</Grid.Column>*/}
                            {/*</Grid.Row>*/}

                            {/*<Grid.Row>*/}
                                {/*<Grid.Column width={2}>*/}
                                    {/*<Button onClick={this.createCard} color="green">Create</Button>*/}
                                {/*</Grid.Column>*/}
                                {/*<Grid.Column width={1}></Grid.Column>*/}
                                {/*<Grid.Column width={2}>*/}
                                    {/*<Button onClick={() => this.close()} color="red">Close</Button>*/}
                                {/*</Grid.Column>*/}
                            {/*</Grid.Row>*/}
                        {/*</Grid>*/}
                        {/*<div className="grid-container">*/}
                            {/*<div className="grid-cardname1">카드명</div>*/}
                            {/*<div className="grid-cardname2"><Input type="text"  placeholder='카드명 입력' /></div>*/}
                            {/*<div className="grid-starttime1">시작시간</div>*/}
                            {/*<div className="grid-starttime2"><Input type="date"/></div>*/}
                            {/*<div className="grid-endtime1">마감시간</div>*/}
                            {/*<div className="grid-endtime2"><Input type="date"/></div>*/}
                            {/*<div className="grid-content1">내용</div>*/}
                            {/*<div className="grid-content2"><Input type="text"  value={this.props.content} /></div>*/}
                            {/*<div className="grid-create"><Button onClick={this.createCard} color="green">Create</Button></div>*/}
                            {/*<div className="grid-close"><Button onClick={() => this.close()} color="red">Close</Button></div>*/}
                        {/*</div>*/}
                        <article>
                            <div className="card_section" id="card_name1">카드명</div>
                            <div className="card_section" id="card_name2"><Input className="card_name2_input" type="text"  placeholder='카드명 입력' /></div>
                            <div className="card_section" id="card_start1">시작 시간</div>
                            <div className="card_section" id="card_start2"><Input className="card_start2_input" type="date" defaultValue={this.state.date}/></div>
                            <div className="card_section" id="card_end1">마감 시간</div>
                            <div className="card_section" id="card_end2"><Input className="card_end2_input" type="date" defaultValue={this.state.date}/></div>
                            <div className="card_section" id="card_content"><Input className="card_content_input" type="text" defaultValue={this.props.content} /></div>
                            <div className="card_section" id="card_create"><Button onClick={this.createCard} color="green">Create</Button></div>
                            <div className="card_section" id="card_stop"><Button onClick={() => this.close()} color="red">Close</Button></div>
                        </article>
                    </Modal.Description>
                </Modal>
            </div >
        )
    }
}


export default CreateCard;