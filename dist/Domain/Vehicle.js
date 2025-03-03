export class Vehicle {
  plateNumber;
  parkedLocations = []; // Keep a history of locations for tracking ?
  constructor(plateNumber) {
    this.plateNumber = plateNumber;
  }
  park(location) {
    this.parkedLocations.push(location); // Add new location to the history
  }
  getLatestLocation() {
    return this.parkedLocations[this.parkedLocations.length - 1];
  }
}
