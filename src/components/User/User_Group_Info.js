import React, { Component } from 'react'
import { Button, Item, Icon } from 'semantic-ui-react'

class User_Group_Info extends Component {
    render(){
        const { list, group } = this.props;
        return(
            <Item>
                <Icon name="comment" size="big"/>
                <Item.Content onClick={() => group(list.Group_Name,list.Member_ID, list.Member_name, list._id)} style={{ cursor: "pointer"}}>
                    <Item.Header>{list.Group_Name}</Item.Header>
                    <Item.Meta>{list.Member_name}</Item.Meta>
                </Item.Content>
                <Button className="exitGroup">그룹 나가기</Button>
            </Item>
        )
    }

}

export default User_Group_Info;