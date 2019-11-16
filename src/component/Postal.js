import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
const axios = require('axios');



class Postal extends Component {
    state={
        locationList:[]
    }
    
    componentDidMount() {
        axios.get('https://api.myjson.com/bins/123jsq')
        .then((response) =>{
            console.log("response",response.data)
            this.setState({locationList:response.data})
            console.log("this.state",this.state.locationList)
        })
        .catch((err)=>{
            console.log("error",err)
        })
    }
    
    render() {
        const data = this.state.locationList
        console.log("this.state.locationList",this.state.locationList)
        const columns = [{
            Header: 'Postal Code',
            accessor: 'postal_code' // String-based value accessors!
          }, {
            Header: 'Latitude',
            accessor: 'latitude',
          }, {
            Header: 'Longitude',
            accessor: 'longitude'
          }]
        return (
            <ReactTable
                data={data}
                columns={columns}
            />
        )
    }
}

export default Postal;