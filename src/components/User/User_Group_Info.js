import React, { Component } from 'react'
import { Button, Item, Icon, Grid } from 'semantic-ui-react'
import { PostData } from '../../containers';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
class User_Group_Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('useremail'),
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { list, group } = this.props;
        return (
            <Item>
                <Icon name="comment" size="big" />
                <Item.Content onClick={() => group(list.Group_Name, list.Member_ID, list.Member_name)} style={{ cursor: "pointer" }}>
                    <Item.Header>{list.Group_Name}</Item.Header>
                    <Item.Meta>{list.Member_name}</Item.Meta>
                </Item.Content>
                <Button className="exitGroup" color="grey" size = "mini" onClick={this.openModal}><Icon name="trash alternate outline" color="black"></Icon>
                </Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                >
                    <Grid centered columns={2}>
                        <Grid.Row>
                            정말 팀을 나가시겠습니까?
                        </Grid.Row>
                        <Grid.Row>
                            <Button className="exitGroup" color="green" onClick={async () => {
                                var data = {
                                    name: this.state.username,
                                    email: this.state.email,
                                    _id: list._id
                                }
                                await PostData(this.state.username + '/delete', data)
                                await PostData(this.state.username, { name: this.state.username, email: this.state.email })
                                    .then(result => {
                                        sessionStorage.setItem('Group_List', JSON.stringify(result.data));// session 저장
                                    })
                                this.props.history()
                            }}
                            >yes</Button>
                            <Button onClick={this.closeModal} color="red">no</Button>
                        </Grid.Row>
                    </Grid>
                </Modal>
            </Item>
        )
    }

}

export default User_Group_Info;