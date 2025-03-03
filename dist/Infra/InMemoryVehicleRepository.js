export class InMemoryVehicleRepository {
  vehicles = new Map();
  save(vehicle) {
    this.vehicles.set(vehicle.plateNumber, vehicle);
  }
  findByPlateNumber(plateNumber) {
    return this.vehicles.get(plateNumber);
  }
  findAll() {
    return Array.from(this.vehicles.values());
  }
  remove(vehicle) {
    this.vehicles.delete(vehicle.plateNumber);
  }
}
