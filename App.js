import React, { Component } from 'react';
import './App.css';

class App extends React.Component{
  state={
      temp:'',
      weather:'',
      location:'',
    };
	// constructor(props){
  // super(props);
  // 	this.state={
  //     temp:'',
  //     weather:'',
  //     location:'',
  //   };
  // }

	handleClick = async (e) => {
  	e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.wunderground.com/api/73b0005b139fa130/conditions/q/${country}/${city}.json`);

    const data = await api_call.json();
 console.log(data);
    this.setState({
    	temp:data.current_observation.temp_c,
      weather:data.current_observation.weather,
      location:data.current_observation.display_location.full
    });
  }
	render(){
  	return(
    	<div className="container" id="cont1"><center>
        <h1 className="text-primary">Weather App</h1><br></br>
       <form className="form-group"  onSubmit={this.handleClick} >
    	 <input type="text" name="city" className="form-control" placeholder="enter city"/><br></br><br></br>
       <input type="text" name="country"  className="form-control" placeholder="enter country"/><br></br><br></br>
       <button className="btn btn-primary">Find Weather</button><br></br><br></br>
       </form>
       {this.state.temp!==''?<h3 className="alert alert-primary">Temp : {this.state.temp} &deg; C<br></br>Weather: {this.state.weather}<br></br>Location: {this.state.location}</h3>:''}
       </center>
    	</div>
    );
  }
}

export default App;
