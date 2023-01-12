import React from "react";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { planetsAvailableForSelection } from "./Utility/Helper";

const DataList = ({
  item,
  planets,
  handleDropdownChange,
  destinationArray,
}) => {
  const filteredPlanets = planetsAvailableForSelection(
    destinationArray,
    planets,
    "name",
    item.name
  );
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "5px",
        boxShadow:"1px 3px 5px 3px #8185EA"
      }}
      className="data-list"
    >
      <FormControl fullWidth>
        <InputLabel>{item.label}</InputLabel>
        <Select
          value={item.selectedPlanet || ""}
          label={item.label}
          name={item.name}
          onChange={handleDropdownChange}
          className="select-data-list"
        >
          {filteredPlanets.map(({ name }, idx) => (
            <MenuItem key={idx} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <h4 style={{color:"black"}}>Planet distance: {item && item.planetDistance}</h4>
    </div>
  );
};

export default DataList;
