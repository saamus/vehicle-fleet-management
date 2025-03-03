export class InMemoryLocationRepository {
  locations = new Map()
  save(location) {
    const locations = this.locations.get(location.vehiclePlate) || []
    locations.push(location)
    this.locations.set(location.vehiclePlate, locations) // Store locations by vehiclePlate
  }
  findByVehicleId(vehiclePlate) {
    return this.locations.get(vehiclePlate) // Get all locations for a vehicle
  }
  remove(location) {
    const locations = this.locations.get(location.vehiclePlate)
    if (locations) {
      const index = locations.indexOf(location)
      if (index !== -1) {
        locations.splice(index, 1) // Remove location from history
        this.locations.set(location.vehiclePlate, locations)
      }
    }
  }
}
