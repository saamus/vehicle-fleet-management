import { ParkVehicleCommand } from '../Commands/ParkVehicleCommand'
import { InMemoryLocationRepository } from '../../Infra/InMemoryLocationRepository'
import { InMemoryVehicleRepository } from '../../Infra/InMemoryVehicleRepository'
import { Location } from '../../Domain/Location'
import { Vehicle } from '../../Domain/Vehicle'

export class ParkVehicleCommandHandler {
  constructor(
    private locationRepo: InMemoryLocationRepository,
    private vehicleRepo: InMemoryVehicleRepository
  ) {}

  execute(command: ParkVehicleCommand): string {
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
      vehicle,
      command.latitude,
      command.longitude,
      command.altitude
    )

    this.locationRepo.save(newLocation)

    return `Vehicle ${command.vehiclePlate} has been parked at ${command.latitude}, ${command.longitude}.`
  }
}
