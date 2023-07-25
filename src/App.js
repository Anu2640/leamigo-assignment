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
      errMsg: false,
      startInput: false,
      dropInput:false,
      vehicledata: {}
    };
  }



  componentDidMount() {
    const apiUrl = 'https://mocki.io/v1/df24a915-b0df-4bed-a087-79349ffb227d';

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
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }


  handleSearch = () => {
    const {pointA,pointB,vehicledata,selectedDate} = this.state
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
      const filtered = vehicledata.dummyvehicledata.filter(
        (each) => each.path === presentpath
      );
      const errMsg = filtered.length === 0;
      if (errMsg) {
        this.setState({ errMsg });
      } else {
        const originalFiltered = filtered
        this.checkDate(selectedDate,originalFiltered)
      }
    }

  };

  checkDate(selectedDate,list) {
    const dateObject = new Date(selectedDate);
    const dateInteger = dateObject.getDate();
    const isIncluded = list.filter((eachObject) => eachObject.dates.includes(dateInteger))
    if (isIncluded.length > 0) {
      this.setState({vehicles:isIncluded})
    }
  }

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
              <li key={vehicle.name}>{`Name: ${vehicle.name}/PlaneNumber: ${vehicle.planeno}/Date: ${selectedDate}`}</li>
            ))}
          </ul>)}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
