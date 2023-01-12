import { Button } from "@mui/material";
import React from "react";
import DataList from "../DataList";
import VehicleList from "../VehicleList";
import "./Home.css";
const Home = ({
  destinationArray,
  vehicles,
  planets,
  handleDropdownChange,
  handleVehicleChange,
  handleFindFalcone,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>FINDING FALCONE</h1>
      <h2>Select planets you want to search in:</h2>
      <div className="first-div">
        {destinationArray.map((item) => (
          <div>
            <DataList
              key={item.key}
              item={item}
              destinationArray={destinationArray}
              planets={planets}
              handleDropdownChange={handleDropdownChange}
            />
            {item.selectedPlanet && (
              <VehicleList
                vehicles={vehicles}
                item={item}
                handleVehicleChange={handleVehicleChange}
              />
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          background: "white",
          padding: "50px",
          color: "black",
          width: "fit-content",
          margin: "auto",
          marginTop: "50px",
          borderRadius: "10px",
          boxShadow: "1px 3px 5px 3px #8185EA",
        }}
      >
        <div style={{ marginRight: "50px" }}>
          <h3>
            Time Taken :{" "}
            {destinationArray.reduce(
              (previous, current) => previous + current["timeTaken"],
              0
            )}
          </h3>
        </div>
        <Button variant="contained" onClick={handleFindFalcone}>
          FIND FALCONE
        </Button>
      </div>
    </div>
  );
};

export default Home;
