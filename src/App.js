import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import backimg from './images/map.png';
class App extends Component {
  state = {
    image:"",
    location:"",
    temp:"",
    humidity:"",
    wind:"",
    climate:"",
    error:""
  };
  handleClick = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country){
      const api_call = await fetch(`http://api.wunderground.com/api/73b0005b139fa130/conditions/q/${country}/${city}.json`);
      const data = await api_call.json();
      this.setState({
        image:data.current_observation.icon_url,
        location:data.current_observation.display_location.full,
        temp:data.current_observation.temp_c,
        humidity:data.current_observation.relative_humidity,
        wind:data.current_observation.wind_mph,
        climate:data.current_observation.weather,
        error:""
      });
    }
    else {
      this.setState({
        image:"",
        location:"",
        temp:"",
        humidity:"",
        wind:"",
        climate:"",
        error:"Please enter city and country details correctly"
      });
    }
}
  render() {
    return (
      <div className="container" id="c1">
        <center>
        <img src={backimg} width="100%"/><br></br>
        <div className="card" id="c2"><form onSubmit={this.handleClick}>
        <h3>Todays Weather</h3><br></br>
            <div className="row">
              <div className="col-md-4"><label>City</label></div>
              <div className="col-md-8"><input type="text" name="city" className="form-control"/><br></br></div>
              <div className="col-md-4"><label>Country</label></div>
              <div className="col-md-8"><input type="text" name="country" className="form-control"/><br></br></div>
              <div className="col-md-10"></div>
              <div className="col-md-2"><button className="btn btn-info">Get Weather</button><br></br><br></br></div>
            </div>
          </form>
          {this.state.error!=''?<div class="alert alert-primary" role="alert">{this.state.error}</div>:''}
          </div>
          {this.state.temp!=''?
          <div id="bck"><div className="row">
            <div className="col-md-4"><center><img src={this.state.image} width="100px" height="100px"/><br></br><h4><b>{this.state.climate}</b></h4><h4><b>{this.state.location}</b></h4></center></div>
            <div className="col-md-4"><center><h3 id="h1">Temperature: {this.state.temp}<br></br>Humidity: {this.state.humidity}<br></br>Wind mph: {this.state.wind}</h3></center></div>
            <div className="col-md-4"></div>
          </div></div>:''}
          <br></br>
          <br></br>
          </center>
      </div>
    );
  }
}

export default App;
