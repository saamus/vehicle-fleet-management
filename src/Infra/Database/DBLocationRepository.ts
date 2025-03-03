import { Location } from "../../Domain/Location";
import { Vehicle } from "../../Domain/Vehicle";
import { AppDataSource } from "./AppDataSource";
import { Repository } from "typeorm";

export class DBLocationRepository {
  private locationRepository: Repository<Location>;

  constructor() {
    this.locationRepository = AppDataSource.getRepository(Location);
  }

  async save(location: Location): Promise<void> {
    await this.locationRepository.save(location);
  }

  async findByVehiclePlate(vehiclePlate: string): Promise<Location | null> {
    const vehicle = await AppDataSource.getRepository(Vehicle).findOne({
      where: { plateNumber: vehiclePlate },
    });

    if (!vehicle) {
      return null; // If vehicle is not found, return null
    }

    // Find locations by vehicle's id
    return (
      (await this.locationRepository.findOne({
        where: { vehicle: vehicle },
      })) || null
    );
  }

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }
}
