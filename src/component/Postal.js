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
// https://api.myjson.com/bins/6ixqq local addresses



class Postal extends Component {
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        greatPlaceCoords: PropTypes.any
      };
      static defaultProps = {
        center: [19.1590, 72.9986],
        zoom: 9,
        greatPlaceCoords: {lat: 19.1590, lng: 72.9986}
      };
      shouldComponentUpdate = shouldPureComponentUpdate;
    state={
        locationList:[]
    }
    
    componentDidMount() {
        axios.get('https://api.myjson.com/bins/6ixqq')
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
                    {
                        this.state.locationList.map((item)=>{
                            return(
                                <MyGreatPlace key={item.id} lat={item.latitude} lng={item.longitude} text={item.name} />
                            )
                        })
                    }
                <MyGreatPlace {...this.props.greatPlaceCoords} text={'airoli'}  />
                </GoogleMap>
                {/* <GoogleMap
                    center={this.props.center}
                    zoom={this.props.zoom}>
                    <MyGreatPlace lat={19.0760} lng={72.8777} text={'Thane'} />
                    <MyGreatPlace {...this.props.greatPlaceCoords} text={'airoli'}  />
                </GoogleMap> */}
                
            </div>
        )
    }
}

export default Postal;