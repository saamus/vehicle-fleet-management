import { Location } from "./Location";
import { Fleet } from "./Fleet";
import { Entity, PrimaryColumn, ManyToMany, OneToMany, Column } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryColumn() // 'plateNumber' is the primary column
  plateNumber: string;

  // TODO : rename it to model or delete it ?
  @Column({ unique: true })
  id: string;

  // Many-to-Many relationship with Fleet via the Fleet_Vehicle table
  @ManyToMany(() => Fleet, (fleet) => fleet.vehicles)
  fleets!: Fleet[];

  // One-to-Many relationship with Location (each vehicle can have many parked locations)
  @OneToMany(() => Location, (location) => location.vehicle)
  parkedLocations!: Location[];

  constructor(plateNumber: string, id: string) {
    this.plateNumber = plateNumber;
    this.id = id;
  }

  park(location: Location): void {
    this.parkedLocations.push(location);
  }

  getLatestLocation(): Location | undefined {
    return this.parkedLocations[this.parkedLocations.length - 1];
  }
}
