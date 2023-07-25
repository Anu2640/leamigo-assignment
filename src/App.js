import './App.css';
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointA: "",
      pointB: "",
      selectedDate: "",
      vehicles: [],
      errMsg:"",
      startInput: false,
      dropInput:false,
      vehicledata: {}
    };
  }


  componentDidMount() {
    const apiUrl = 'http://localhost:3000/dummyvehicledata'; // Replace this with your API endpoint URL

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('API data:', data);
        this.setState({vehicledata: data})
        // Handle the API response data here
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle any errors that occurred during the API call
      });
  }


  handleSearch = () => {
    const {pointA,pointB,vehicledata} = this.state
    if (pointA === "") {
      this.setState({ startInput: true });
    } else {
      this.setState({ startInput: false });
    }
    if (pointB === "") {
      this.setState({ dropInput: true });
    } else {
      this.setState({ dropInput: false });
    }
    if (vehicledata) {
      const presentpath = `${pointA.toLowerCase()}to${pointB.toLowerCase()}`;
      const filtered = vehicledata.filter(
        (each) => each.path === presentpath
      );
      const errMsg = filtered.length === 0;
      this.setState({ vehicles: filtered, errMsg });
    }
  };

  render() {
    const { pointA, pointB, selectedDate, vehicles,errMsg,startInput,dropInput } = this.state;

    return (
      <div className='app-container'>
        <div className='bg-container'>
        <h1>Airport Transfer Booking App</h1>
        <div>
          <label>Starting Location</label>
          <input
            type="text"
            value={pointA}
            placeholder='enter starting location'
            onChange={(e) => this.setState({ pointA: e.target.value })}
          />
          {startInput? <p className='err-msg'>*Enter Valid Starting location</p>: null}
        </div>
        <div>
          <label>Dropping Location</label>
          <input
            type="text"
            value={pointB}
            placeholder='enter dropping location'
            onChange={(e) => this.setState({ pointB: e.target.value })}
          />
          {dropInput? <p className='err-msg'>*Enter Valid Dropping location</p>: null}
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => this.setState({ selectedDate: e.target.value })}
          />
        </div>
        <button onClick={this.handleSearch}>Search</button>
        <div>
          <h2>Available Planes:</h2>
          {errMsg? <p>No Planes available</p>: (<ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.name}>{`Name: ${vehicle.name}/Plane Number: ${vehicle.planeno}`}</li>
            ))}
          </ul>)}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
