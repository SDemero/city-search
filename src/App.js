import React, { Component } from 'react';
import img1 from './img/img1.png';
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      zipCodes:[],
    }
    
    this.cityValueChange = this.cityValueChange.bind(this)
    this.activateSearch = this.activateSearch.bind(this)

  }

 
  cityValueChange(event) { 
    var city = event.target.value;
    this.setState({
      cityValue:city,
    })
    console.log('city:',city)
  }

  activateSearch() {
    let city = this.state.cityValue;
    city = city.toUpperCase();
    console.log("pre-fetch")
    fetch('http://ctp-zip-api.herokuapp.com/city/' + city)
    .then((response) => {
      console.log("fetching response:" , response)
      if(response) {
        return response.json();
      } else {
        return [];
      }
    })
    .then((jsonResponse) => {
      console.log('jsonResponse:',jsonResponse)
      const zipCodes = jsonResponse.map((zip, idx) => {
        return <div>
         <OneZipCode data={zip} city={city} key={idx}/>
        </div>
      });
      this.setState({
        zipCodes:zipCodes,
      });
    })
    .catch((e) => {
      this.setState({
        zipCodes: [],
      });
      console.log("In catch: " + e)
    });

  }

  render() {
    return(
      <div className="App">

        <div className="App-header">
          <img src={img1} className="App-logo" alt="logo" />
          <h2>Welcome To City search</h2>
        </div>

        {/* 2 adding citysearch component to render and connecting it with trigers/functions */}

        <CitySearch 
          cityValue={this.state.cityValue}
          handleChange={this.cityValueChange}
          handleClick={this.activateSearch}
        />
        
        {this.state.cityValue  ? <h3>City: {this.state.cityValue}</h3>:<div></div>}

        {this.state.zipCodes.length > 0 ? this.state.zipCodes: <div>No Results</div>
            }


      </div>
    )
  }



}
function OneZipCode(props) {
  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="panel panel-default">
          <div className="panel-title">
            <div className="panel-body">
              <p>zipcode: {props.data}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function CitySearch(props) {
  return (
    <div>
      <br/>
      <label>Ente City Name:</label><br/>
      <input 
      type="text"
      id="city"
      className="form-control"
      value={props.cityValue}
      onChange={props.handleChange}
      placeholder="Try Brooklyn"
      />
      <button onClick={props.handleClick}>
        Search
      </button>
    </div>
  )
}
export default App;