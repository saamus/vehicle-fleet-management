import { Location } from '../../Domain/Location'
export class ParkVehicleCommandHandler {
  locationRepo
  vehicleRepo
  constructor(locationRepo, vehicleRepo) {
    this.locationRepo = locationRepo
    this.vehicleRepo = vehicleRepo
  }
  execute(command) {
    // Check if the vehicle is registered
    const vehicle = this.vehicleRepo.findByPlateNumber(command.vehiclePlate)
    if (!vehicle) {
      throw new Error(`Vehicle ${command.vehiclePlate} is not registered.`)
    }
    // Get all locations for the vehicle
    const locations =
      this.locationRepo.findByVehicleId(command.vehiclePlate) || []
    // Check if the vehicle is already parked at the same location
    if (
      locations.some(
        (loc) =>
          loc.latitude === command.latitude &&
          loc.longitude === command.longitude
      )
    ) {
      throw new Error(
        `Vehicle ${command.vehiclePlate} is already parked at this location.`
      )
    }
    // Create and save a new Location
    const newLocation = new Location(
      this.generateLocationId(),
      command.vehiclePlate,
      command.latitude,
      command.longitude
    )
    this.locationRepo.save(newLocation)
    return `Vehicle ${command.vehiclePlate} has been parked at ${command.latitude}, ${command.longitude}.`
  }
  generateLocationId() {
    return `loc-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  }
}
