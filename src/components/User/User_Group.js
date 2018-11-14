import React from 'react'
import './User_Group.css'
const User_Group = ({match}) =>{
    return(

        <div className="User_Group">
            {match.params.username}
            <h1>Group창입니다.</h1>
            <h1>Group보여주기.</h1>
            <h1>Group추가버튼.</h1>
        </div>
    )
}

export default User_Group