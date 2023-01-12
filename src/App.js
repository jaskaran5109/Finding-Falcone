import "./App.css";
import {
   
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./component/Home/Home";
import Header from "./component/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  defdestinationArray,
  destinationsWithNewVehicle,
  vehiclesWithUpdatedTotalNoCount,
} from "./component/Utility/Helper";
import Result from "./component/ResultPage/Result";
function App() {
  const navigate=useNavigate()
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [destinationArray, setDestinationArray] = useState(defdestinationArray);
  const [result, setResult] = useState({});
  const [totalTimeTaken, setTotalTimeTaken] = useState("");
  const getToken = async () => {
    try {
      const header = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "https://findfalcone.herokuapp.com/token",
        {},
        header
      );
      if (data.status === 200) return data.data.token;
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      const planets = await axios.get(
        "https://findfalcone.herokuapp.com/planets"
      );
      setPlanets(planets.data);
    } catch (error) {
      console.log(error);
    }

    try {
      const vehicles = await axios.get(
        "https://findfalcone.herokuapp.com/vehicles"
      );
      setVehicles(vehicles.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleDropdownChange = (e) => {
    e.stopPropagation();
    const newDestinations = destinationArray.map((item) => {
      if (item.name !== e.target.name) return item;
      return {
        ...item,
        selectedPlanet: e.target.value,
        planetDistance: planets.find((planet) => planet.name === e.target.value)
          .distance,
      };
    });
    setDestinationArray(newDestinations);
  };
  const hanldeReset = (e) => {
    e.stopPropagation();
    // setPlanets([]);
    // setVehicles([]);
    setDestinationArray(defdestinationArray);
  };

  const handleVehicleChange = (e) => {
    e.stopPropagation();

    const currDestination = destinationArray.find(
      (destination) => destination.name === e.target.name
    );

    const currVehicle = vehicles.find(
      (vehicle) => vehicle.name === e.target.value
    );

    const buildVehicle = vehiclesWithUpdatedTotalNoCount(
      vehicles,
      currDestination.selectedVehicle,
      currVehicle.name
    );

    const builDestinations = destinationsWithNewVehicle(
      destinationArray,
      currDestination.name,
      currVehicle
    );

    setDestinationArray(builDestinations);
    setVehicles(buildVehicle);
  };
  const handleFindFalcone = async () => {
    const config = {
      token: await getToken(),
      planet_names: destinationArray.map(
        ({ selectedPlanet }) => selectedPlanet
      ),
      vehicle_names: destinationArray.map(
        ({ selectedVehicle }) => selectedVehicle
      ),
    };
    const header = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "https://findfalcone.herokuapp.com/find",
        config,
        header
      );
      setResult(response.data);
      setTotalTimeTaken(
        destinationArray.reduce(
          (previous, current) => previous + current["timeTaken"],
          0
        )
      );
      navigate("/result");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      {/* <Router> */}
        <Header handleReset={hanldeReset}  />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                destinationArray={destinationArray}
                vehicles={vehicles}
                planets={planets}
                handleDropdownChange={handleDropdownChange}
                handleVehicleChange={handleVehicleChange}
                handleFindFalcone={handleFindFalcone}
              />
            }
          />
          <Route
            exact
            path="/result"
            element={<Result result={result} totalTimeTaken={totalTimeTaken} />}
          />
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
