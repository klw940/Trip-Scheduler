import React, { Component } from 'react'
// import { PostData } from '../../../containers';
import {Button, Grid, Input, Modal} from "semantic-ui-react";

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
                >
                    <Modal.Header>그룹 만들기</Modal.Header>
                    <Modal.Description>
                        <Grid centered columns={5}>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                    카드명 :
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Input type="text"  placeholder='카드명 입력' />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={1}>
                                    시작 시간
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Input type="date"/>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={1}>
                                    마감 시간
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Input type="date"/>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={5}>
                                    <Input type="text"  value={this.props.content} />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <Button onClick={this.createCard} color="green">Create</Button>
                                </Grid.Column>
                                <Grid.Column width={1}></Grid.Column>
                                <Grid.Column width={2}>
                                    <Button onClick={() => this.close()} color="red">Close</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal>
            </div >
        )
    }
}


export default CreateCard;