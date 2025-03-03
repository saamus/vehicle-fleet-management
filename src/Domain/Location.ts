import { Vehicle } from "./Vehicle";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id!: number;

  // Many-to-One relationship with Vehicle (each location belongs to one vehicle)
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.parkedLocations)
  vehicle: Vehicle;

  @Column("decimal", { precision: 9, scale: 6 })
  latitude: number;

  @Column("decimal", { precision: 9, scale: 6 })
  longitude: number;

  @Column("decimal", { precision: 9, scale: 6 })
  altitude: number;

  //datetime
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  parkedAt!: Date;

  constructor(
    vehicle: Vehicle,
    latitude: number,
    longitude: number,
    altitude: number,
  ) {
    this.vehicle = vehicle;
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }

  isSameLocation(otherLocation: Location): boolean {
    return (
      this.latitude === otherLocation.latitude &&
      this.longitude === otherLocation.longitude &&
      this.altitude === otherLocation.altitude
    );
  }
}
