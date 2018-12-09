import React, { Component } from 'react'
// import { PostData } from '../../../containers';
import {Button, Grid, Input, Modal} from "semantic-ui-react";
import './CreateCard.css'
class CreateCard extends Component {

    constructor(props){
        super(props);
        this.state={
            content:this.props.content,
            open:false
        }
        console.log(this.state.content);
    }

    createCard = () => {
        this.close();
    }

    closeConfigShow = (Create) => () => {     /*closeConfigShow(Create){()=>{this.setState}}*/
        this.setState({ Create, open: true })
    }

    close = () => {
        this.setState({ open: false })
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
                    // style={{
                    //     overlay: {
                    //     position: 'fixed',
                    //     top: 0,
                    //     left: 0,
                    //     right: 0,
                    //     bottom: 0,
                    //     backgroundColor: 'rgba(255, 255, 255, 0.75)'
                    // },
                    //     content: {
                    //     position: 'absolute',
                    //     top: '40px',
                    //     left: '80px',
                    //     right: '40px',
                    //     bottom: '40px',
                    //     border: '1px solid #ccc',
                    //     background: '#fff',
                    //     overflow: 'auto',
                    //     WebkitOverflowScrolling: 'touch',
                    //     borderRadius: '4px',
                    //     outline: 'none',
                    //     padding: '20px'
                    // }
                    // }}
                >
                    <Modal.Header>그룹 만들기</Modal.Header>
                    <Modal.Description>
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
                        {/*</Grid>*/}y 
                        <div className="grid-container">
                            <div className="grid-cardname1">카드명</div>
                            <div className="grid-cardname2"><Input type="text"  placeholder='카드명 입력' /></div>
                            <div className="grid-starttime1">시작시간</div>
                            <div className="grid-starttime2"><Input type="date"/></div>
                            <div className="grid-endtime1">마감시간</div>
                            <div className="grid-endtime2"><Input type="date"/></div>
                            <div className="grid-content1">내용</div>
                            <div className="grid-content2"><Input type="text"  value={this.props.content} /></div>
                            <div className="grid-create"><Button onClick={this.createCard} color="green">Create</Button></div>
                            <div className="grid-close"><Button onClick={() => this.close()} color="red">Close</Button></div>
                        </div>
                    </Modal.Description>
                </Modal>
            </div >
        )
    }
}


export default CreateCard;