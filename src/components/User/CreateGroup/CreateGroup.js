import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import { PostData } from '../../../containers';
import { Redirect } from "react-router-dom";

//CSS 추가 없으면 container로 옮길 예정

class CreateGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            email: this.props.email,
            redirect: false
        }
    }
    input = null;
    render() {
        if (this.state.redirect){
            return (
                <Redirect to={{
                    pathname: "/"+ this.props.name,
                    state:{referrer:this.props.referrer, email:this.state.email}
                  }} 
                
                />
            )
        }

        return (
            <div className="createGroup">
                <Popup
                    trigger={<button type="button" className="button"> Group 추가 </button>}
                    modal
                    lockScroll={false}
                >
                    {close => ( //popup의 내장함수 인듯함 close 안에 있는 내용이 close됨
                        <div className="group">
                            <div className="header"> Group Create </div>
                            <div className="content">
                                <input type="text" className="newGroup" ref={ref => {this.input = ref;}} />
                            </div>
                            <div className="actions">
                                <button
                                    type="button"
                                    className="button"
                                    onClick={() => {
                                        var data = {
                                            email: this.state.email,
                                            group: this.input.value   //react에서 Document접근하는 법
                                        }
                                        PostData(this.state.name + '/create', data).then(result => {
                                            console.log(result);
                                            this.setState({redirect:true})
                                        })
                                        close()
                                    }}>
                                    Create
                                </button>
                                <button type="button" className="button" onClick={() => close()}>
                                    Close
					            </button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        )
    }
}

export default CreateGroup