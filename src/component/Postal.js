import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render';
import PropTypes from 'prop-types';
import MyGreatPlace from './MyGreatPlace';
import GoogleMap from 'google-map-react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
const axios = require('axios');
//https://api.myjson.com/bins/fikz6 five addresses with names
// https://api.myjson.com/bins/123jsq 1000 records



class Postal extends Component {
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        greatPlaceCoords: PropTypes.any
      };
      static defaultProps = {
        center: [59.938043, 30.337157],
        zoom: 9,
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
      };
      shouldComponentUpdate = shouldPureComponentUpdate;
    state={
        locationList:[]
    }
    
    componentDidMount() {
        axios.get('https://api.myjson.com/bins/fikz6')
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
        
        return (
            <div style={{position:'absolute',width:'100%',height:'100%'}}>
                <GoogleMap
                    center={this.props.center}
                    zoom={this.props.zoom}>
                    <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} />
                    <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'}  />
                </GoogleMap>
                {/* {
                    this.state.locationList.map((item)=>{
                        return (
                        <li key={item.id}>{item.name}</li>
                        )
                    })
                } */}
            </div>
        )
    }
}

export default Postal;