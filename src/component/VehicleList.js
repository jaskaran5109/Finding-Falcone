import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import { vehicleDisabledForSelection } from './Utility/Helper'

const VehicleList = ({item,vehicles,handleVehicleChange}) => {
  return (
    <div >
         <FormControl>
                <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    value={item.selectedVehicle}
                    name={item.name}
                    onChange={handleVehicleChange}
                >
                    {vehicles.map(({ name, total_no, max_distance }, idx) => (
                        <FormControlLabel
                            key={idx}
                            disabled={vehicleDisabledForSelection(
                                item.planetDistance,
                                max_distance,
                                total_no
                            )}
                            value={name}
                            control={<Radio />}
                            label={`${name} (${total_no})`}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
    </div>
  )
}

export default VehicleList