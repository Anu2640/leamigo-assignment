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

  // dummyVehicleData = [
  //   { "name": "air1","planeno":"48576", "path": "bangloretokolkata"},
  //   { "name": "air2","planeno":"57638", "path": "kolkatatobanglore"},
  //   { "name": "air3","planeno":"96477", "path": "chennaitohyderabad"},
  //   { "name": "air4","planeno":"58395", "path": "hyderabadtochennai"},
  //   { "name": "air5","planeno":"60737", "path": "chennaitodelhi"},
  //   { "name": "air6","planeno":"20565", "path": "delhitochennai"},
  //   { "name": "air7","planeno":"39465", "path": "hyderabadtobanglore"},
  //   { "name": "air8","planeno":"73538", "path": "bangloretohyderabad"},
  //   { "name": "air9","planeno":"19474", "path": "delhitokolkata"},
  //   { "name": "air10","planeno":"87638", "path": "kolkatatodelhi"},
  //   { "name": "air11", "planeno": "48486", "path": "hyderabadtomumbai" },
  //   { "name": "air12", "planeno": "57838", "path": "mumbaitohyderabad" },
  //   { "name": "air13", "planeno": "96877", "path": "chennaitomumbai" },
  //   { "name": "air14", "planeno": "58495", "path": "mumbaitochennai" },
  //   { "name": "air15", "planeno": "60037", "path": "kolkatatomumbai" },
  //   { "name": "air16", "planeno": "20365", "path": "mumbaitokolkata" },
  //   { "name": "air17", "planeno": "35765", "path": "delhitohyderabad" },
  //   { "name": "air18", "planeno": "79738", "path": "hyderabadtodelhi" },
  //   { "name": "air19", "planeno": "19474", "path": "kolkatatohyderabad" },
  //   { "name": "air20", "planeno": "87629", "path": "hyderabadtokolkata" },
  // ];


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
