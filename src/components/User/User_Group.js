import React, { Component } from 'react'
import './User_Group.css'
class User_Group extends Component {

    render(){
        console.log(this.props)
        return(

            <div className="User_Group">
                {this.props.location.state.referrer}
                {this.props.match.params.username}
                <h1>Group창입니다.</h1>
                <h1>Group보여주기.</h1>
                <h1>Group추가버튼.</h1>
            </div>
        )
    }
    
}

export default User_Group