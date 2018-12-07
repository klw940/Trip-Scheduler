import React, { Component } from 'react'
import { Button, Item, Icon } from 'semantic-ui-react'
import { PostData } from '../../containers';

class User_Group_Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('useremail'),
        }
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
                <Button className="exitGroup" onClick={async() => {
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
                    
                }}>그룹 나가기</Button>
            </Item>
        )
    }

}

export default User_Group_Info;