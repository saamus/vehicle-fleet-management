import { Fleet } from "../Domain/Fleet";

export class InMemoryFleetRepository {
  private fleets: Map<string, Fleet> = new Map();

  save(fleet: Fleet): void {
    this.fleets.set(fleet.id, fleet);
  }

  findById(id: string): Fleet | undefined {
    return this.fleets.get(id);
  }

  findAll(): Fleet[] {
    return Array.from(this.fleets.values());
  }

  remove(fleet: Fleet): void {
    this.fleets.delete(fleet.id);
  }
}
