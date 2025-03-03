export class Fleet {
  id;
  userId;
  vehicles = [];
  constructor(id, userId) {
    this.id = id;
    this.userId = userId;
  }
  registerVehicle(vehicle) {
    // Ensure the vehicle is not already registered
    if (this.vehicles.some((v) => v.plateNumber === vehicle.plateNumber)) {
      throw new Error("Vehicle already registered");
    }
    this.vehicles.push(vehicle);
  }
  parkVehicle(vehicle, location) {
    // Check if the vehicle is already parked at this location
    if (vehicle.getLatestLocation()?.isSameLocation(location)) {
      throw new Error("Vehicle is already parked here");
    }
    // Park the vehicle at the specified location
    vehicle.park(location);
  }
}
