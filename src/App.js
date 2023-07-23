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
      dropInput:false
    };
  }

  dummyVehicleData = [
    { name: "air1",planeno:48576, path: 'hyderabadtochennai'},
    { name: "air2",planeno:57638, path: 'chennaitohyderabad'},
    { name: "air3",planeno:96477, path: 'hyderabadtobanglore'},
    { name: "air4",planeno:58395, path: 'hyderabadtodelhi'},
    { name: "air5",planeno:60737, path: 'bangloretohyderabad'},
    { name: "air6",planeno:20565, path: 'delhitochennai'},
    { name: "air7",planeno:39465, path: 'delhitobanglore'},
    { name: "air8",planeno:73538, path: 'bangloretodelhi'},
    { name: "air9",planeno:19474, path: 'delhitohyderabad'},
    { name: "air10",planeno:87638, path: 'chennaitodelhi'},
  ];

  handleSearch = () => {
    const {pointA,pointB} = this.state
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
    const presentpath = `${pointA.toLowerCase()}to${pointB.toLowerCase()}`
    const filtered = this.dummyVehicleData.filter(each => {return each.path === presentpath})
    const errMsg = filtered.length === 0
    this.setState({ vehicles: filtered,errMsg});
  };

  render() {
    const { pointA, pointB, selectedDate, vehicles,errMsg,startInput,dropInput } = this.state;

    return (
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
    );
  }
}

export default App;
