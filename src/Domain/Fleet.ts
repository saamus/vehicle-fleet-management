import { Vehicle } from './Vehicle'
import { Location } from './Location'
import { User } from './User'
import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  Column,
} from 'typeorm'

@Entity()
export class Fleet {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => User, (user) => user.fleets, { nullable: true })
  @JoinColumn()
  user: User | null

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.fleets)
  @JoinTable() // Create the join table between Fleet and Vehicle
  vehicles: Vehicle[] = []

  constructor(id: string, user: User) {
    if (!user) {
      throw new Error('User must be provided')
    }
    this.id = id
    this.user = user
  }

  registerVehicle(vehicle: Vehicle): void {
    // Ensure the vehicle is not already registered
    if (this.vehicles.some((v) => v.plateNumber === vehicle.plateNumber)) {
      throw new Error('Vehicle already registered')
    }
    this.vehicles.push(vehicle)
  }

  parkVehicle(vehicle: Vehicle, location: Location): void {
    // Check if the vehicle is already parked at this location
    if (vehicle.getLatestLocation()?.isSameLocation(location)) {
      throw new Error('Vehicle is already parked here')
    }
    // Park the vehicle at the specified location
    vehicle.park(location)
  }
}
