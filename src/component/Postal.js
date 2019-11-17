import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render';
import Table from './Table'
import SearchBox from './SearchBox'
import PropTypes from 'prop-types';
import MyGreatPlace from './MyGreatPlace';
import GoogleMap from 'google-map-react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
const axios = require('axios');

//https://api.myjson.com/bins/fikz6 five addresses with names
// https://api.myjson.com/bins/123jsq 1000 records
// https://api.myjson.com/bins/6ixqq local addresses
// https://api.myjson.com/bins/8g60y local address with pincode



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
        locationList:[],
        originalList:[]
    }
    
    componentDidMount() {
        
        axios.get('https://api.myjson.com/bins/pohte')
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
    
    searchHandler = (event)=>{
        console.log("searching",event.target.value.toLowerCase())
        let searcjQery = event.target.value.toLowerCase();
        let locationList = this.state.originalList
        locationList = locationList.filter((el) => {
            let searchValue = el.pincode.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
        })
        this.setState({
            locationList: locationList
        })
    }
    
    render() {
        let locationList = this.state.locationList
        return (
            <React.Fragment>
                <div style={{float:'right',width:'50%',height:'100%'}}>
                {/* <SearchBox
                    placeholder={"123 anywhere st."}
                    onPlacesChanged={this.handleSearch} /> */}
                    <input type="text" className="search" onChange={this.searchHandler}/>
                    <ul>
                        {
                            locationList.map((item)=>{
                                return(
                                    <Table key={item.id} name={item.name} pincode={item.pincode}></Table>
                                )
                            })
                        }
                    </ul>
                </div>
                <div style={{position:'absolute',width:'50%',height:'100%'}}>
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
                    {/* <MyGreatPlace {...this.props.greatPlaceCoords} text={'airoli'}  /> */}
                    </GoogleMap>
                </div>
            </React.Fragment>
        )
    }
}

export default Postal;