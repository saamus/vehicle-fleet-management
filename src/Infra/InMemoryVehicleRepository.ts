import { Vehicle } from '../Domain/Vehicle'

export class InMemoryVehicleRepository {
  private vehicles: Map<string, Vehicle> = new Map()

  save(vehicle: Vehicle): void {
    this.vehicles.set(vehicle.plateNumber, vehicle)
  }

  findByPlateNumber(plateNumber: string): Vehicle | undefined {
    return this.vehicles.get(plateNumber)
  }

  findAll(): Vehicle[] {
    return Array.from(this.vehicles.values())
  }

  remove(vehicle: Vehicle): void {
    this.vehicles.delete(vehicle.plateNumber)
  }
}
