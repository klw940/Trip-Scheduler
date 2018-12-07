import React, { Component } from 'react'
import { Button, Modal, Grid, Input } from 'semantic-ui-react'
import { PostData } from '../../../containers';

class CreateGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            email: this.props.email,
            open: false
        }
    }
    createGroup = () => {
        var data = {
            email: this.state.email,
            group: document.querySelector('input').value,
            name: this.state.name
        }
        this.close();
        if (data.group !== "") {
            PostData(data.name + '/create', data).then(result => {
                var Group_List = JSON.parse(sessionStorage.getItem('Group_List'));
                Group_List.push(result.data[0]);
                sessionStorage.setItem('Group_List', JSON.stringify(Group_List));
                this.props.change();
            })
            this.close();
        }
    }

    closeConfigShow = (Create) => () => {     /*closeConfigShow(Create){()=>{this.setState}}*/
        this.setState({ Create, open: true })  
    }
    close = () => {
        this.setState({ open: false })
    }
    render() {
        const { open, Create } = this.state
        return (<div>
            <Button onClick={this.closeConfigShow(false)}>그룹 생성</Button>
            <Modal
                open={open}
                create={Create}
                onClose={this.close}
            >
                <Modal.Header>그룹 만들기</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Modal.Actions>
                            <Grid centered columns={3}>
                                <Grid.Row>
                                    <Grid.Column width={4}>
                                        <Input type="text" className="newGroup" placeholder='그룹명 입력' ref={ref => {this.input = ref}} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <Button className="createbtn" onClick={this.createGroup}>Create</Button>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button onClick={() => this.close()}>Close</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Modal.Actions>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </div >
        )
    }
}


export default CreateGroup;