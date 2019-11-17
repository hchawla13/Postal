import React, { Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render';
import Table from './Table'
import PropTypes from 'prop-types';
import MyGreatPlace from './MyGreatPlace';
import GoogleMap from 'google-map-react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
const axios = require('axios');
class Postal extends Component {
    //jsonUrl = 'https://api.myjson.com/bins/pohte'
    jsonUrl = 'https://jsonstorage.net/api/items/914ca707-f4da-447b-97fb-73aab6183624'
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
        originalList:[],
        center:[19.1590, 72.9986]
    }
    
    componentDidMount() {
        
        axios.get(this.jsonUrl)
        .then((response) =>{
            this.setState({
                locationList:response.data,
                originalList:response.data,
                center:response.data.map((el)=>{return [el.latitude,el.longitude]})[0]
            })
        })
        .catch((err)=>{
            console.log("error",err)
        })
        
    }
    
    searchHandler = (event)=>{
        let searcjQery = event.target.value.toLowerCase();
        let locationList = this.state.originalList
        locationList = locationList.filter((el) => {
            if(el.pincode){
                let searchValue = el.pincode.toLowerCase();
                return searchValue.indexOf(searcjQery) !== -1;
            }
        })
        
        if(locationList.length===1){
            //focus to new point if search result returns one result
            this.setState({center:locationList.map((el)=>{return [el.latitude,el.longitude]})[0]})
        }
        else{
            this.setState({center:this.props.center})
        }
        this.setState({
            locationList: locationList
        })
    }
    
    render() {
        let locationList = this.state.locationList
        return (
            <React.Fragment>
                <div style={{float:'right',width:'50%',height:'100%'}}>
                    <input placeholder="search by pincode" type="text" className="search" onChange={this.searchHandler}/>
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
                        center={this.state.center}
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