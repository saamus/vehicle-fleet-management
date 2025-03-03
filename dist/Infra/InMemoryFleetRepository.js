export class InMemoryFleetRepository {
  fleets = new Map()
  save(fleet) {
    this.fleets.set(fleet.id, fleet)
  }
  findById(id) {
    return this.fleets.get(id)
  }
  findAll() {
    return Array.from(this.fleets.values())
  }
  remove(fleet) {
    this.fleets.delete(fleet.id)
  }
}
