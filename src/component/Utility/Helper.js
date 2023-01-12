const defdestinationArray = [
  {
    key: 1,
    label: "Destination 1",
    name: "destination1",
    selectedPlanet: "",
    planetDistance: 0,
    selectedVehicle: "",
    timeTaken: 0,
  },
  {
    key: 2,
    label: "Destination 2",
    name: "destination2",
    selectedPlanet: "",
    planetDistance: 0,
    selectedVehicle: "",
    timeTaken: 0,
  },
  {
    key: 3,
    label: "Destination 3",
    name: "destination3",
    selectedPlanet: "",
    planetDistance: 0,
    selectedVehicle: "",
    timeTaken: 0,
  },
  {
    key: 4,
    label: "Destination 4",
    name: "destination4",
    selectedPlanet: "",
    planetDistance: 0,
    selectedVehicle: "",
    timeTaken: 0,
  },
];
const planetsAvailableForSelection = (destinations, planets, key, value) => {
  const names = destinations
    .filter((item) => item[key] !== value && !!item.selectedPlanet)
    .map((item) => item.selectedPlanet);
  return planets.filter(({ name }) => !!!names.includes(name));
};

const destinationsWithNewVehicle = (destinations, destinationName, vehicle) =>
  destinations.map((destination) => {
    if (destination.name === destinationName)
      return {
        ...destination,
        selectedVehicle: vehicle.name,
        timeTaken: destination.planetDistance / vehicle.speed,
      };
    return destination;
  });

const vehiclesWithUpdatedTotalNoCount = (
  vehicles,
  oldVehicleName,
  newVehicleName
) =>
  vehicles.map((vehicle) => {
    //decreasing count by 1 for current selected vehicle
    if (vehicle.name === newVehicleName)
      return {
        ...vehicle,
        total_no: vehicle.total_no - 1,
      };

    //increasing count by 1 for old vehicle if exist
    if (vehicle.name === oldVehicleName)
      return {
        ...vehicle,
        total_no: vehicle.total_no + 1,
      };
    return vehicle;
  });

const vehicleDisabledForSelection = (
  planetDistance,
  max_distance,
  available_count
) => planetDistance > max_distance || available_count === 0;

export {
  defdestinationArray,
  planetsAvailableForSelection,
  destinationsWithNewVehicle,
  vehiclesWithUpdatedTotalNoCount,
  vehicleDisabledForSelection,
};
