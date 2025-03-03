import { Location } from '../Domain/Location'
import { Vehicle } from '../Domain/Vehicle'

export class InMemoryLocationRepository {
  private locations: Map<string, Location[]> = new Map()

  save(location: Location): void {
    const locations = this.locations.get(location.vehicle.plateNumber) || []
    locations.push(location)
    this.locations.set(location.vehicle.plateNumber, locations) // Store locations by vehiclePlate
  }

  findByVehicleId(vehiclePlate: string): Location[] | undefined {
    return this.locations.get(vehiclePlate) // Get all locations for a vehicle
  }

  remove(location: Location): void {
    const locations = this.locations.get(location.vehicle.plateNumber)
    if (locations) {
      const index = locations.findIndex((loc) => loc.id === location.id)
      if (index !== -1) {
        locations.splice(index, 1) // Remove location from history
        this.locations.set(location.vehicle.plateNumber, locations)
      }
    }
  }
}
