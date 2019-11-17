import React, { Component } from 'react'
import axios from 'axios'

export default class Test extends Component {
    state={
        locationList:[],
        originalList:[]
    }
    componentDidMount() {
        axios.get('https://api.myjson.com/bins/8g60y')
        .then((response) =>{
            console.log("response",response.data)
            this.setState({
                locationList:response.data,
                originalList:response.data
            })
        })
        .catch((err)=>{
            console.log("error",err)
        })
    }
    searchHandler=(event)=>{
        let searcjQery = event.target.value.toLowerCase()
        console.log("searching",event.target.value.toLowerCase());
        let displayedList = this.state.originalList;
        displayedList = displayedList.filter((el)=>{
            let searchValue = el.pincode.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
            
        })
        this.setState({
            locationList: displayedList
        })
    }
    render() {
        let locationList = this.state.locationList
        console.log("locationList",locationList)
        return (
            <div>
                <input type="text" onChange={this.searchHandler}></input>
                <ul>
                    {
                        locationList.map((item)=>{
                            return(
                                <li key={item.id}>
                                    <span>{item.name}</span>
                                    <span>{item.pincode}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
