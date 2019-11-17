import React, { Component } from 'react'

export default class Table extends Component {
    render() {
        return (
            <div>
                <li style={{borderBottom:'1px solid grey',listStyle:'none'}}>
                    <span className="name" style={{padding:'20px'}}>{this.props.name}</span>
                    <span className="pincode">{this.props.pincode}</span>
                </li> 
            </div>
        )
    }
}
