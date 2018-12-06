import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import { PostData } from '../../../containers';

class CreateGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            email: this.props.email,
            redirect: false
        }
    }
    
    render() {
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
                                <input type="text" className="newGroup" ref={ref => {this.input = ref}} />
                            </div>
                            <div className="actions">
                                <button
                                    type="button"
                                    className="button"
                                    onClick={() => {
                                        var data = {
                                            email: this.state.email,
                                            group: this.input.value,   //react에서 Document접근하는 법
                                            name: this.state.name
                                        }
                                        if(this.input.value!==""){
                                            PostData(this.state.name + '/create', data).then(result => {
                                                var Group_List = JSON.parse(sessionStorage.getItem('Group_List'));
                                                Group_List.push(result.data[0]);
                                                sessionStorage.setItem('Group_List', JSON.stringify(Group_List));
                                                this.props.change();
                                            })
                                        }
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