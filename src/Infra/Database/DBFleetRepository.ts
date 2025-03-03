import { Fleet } from '../../Domain/Fleet'
import { AppDataSource } from './AppDataSource'
import { Repository } from 'typeorm'

export class DBFleetRepository {
  private fleetRepository: Repository<Fleet>

  constructor() {
    this.fleetRepository = AppDataSource.getRepository(Fleet)
  }

  async save(fleet: Fleet): Promise<void> {
    await this.fleetRepository.save(fleet)
  }

  async findById(id: string): Promise<Fleet | null> {
    return (await this.fleetRepository.findOne({ where: { id } })) || null
  }

  async findAll(): Promise<Fleet[]> {
    return await this.fleetRepository.find()
  }
}
