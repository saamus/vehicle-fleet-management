import { Vehicle } from '../../Domain/Vehicle'
import { AppDataSource } from './AppDataSource'
import { Repository } from 'typeorm'

export class DBVehicleRepository {
  private vehicleRepository: Repository<Vehicle>

  constructor() {
    this.vehicleRepository = AppDataSource.getRepository(Vehicle)
  }

  async save(vehicle: Vehicle): Promise<Vehicle[]> {
    await this.vehicleRepository.save(vehicle)
    return await this.vehicleRepository.find()
  }

  async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    return (
      (await this.vehicleRepository.findOne({ where: { plateNumber } })) || null
    )
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find()
  }
}
