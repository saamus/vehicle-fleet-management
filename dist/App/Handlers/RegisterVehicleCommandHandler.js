import { Vehicle } from "../../Domain/Vehicle";
export class RegisterVehicleCommandHandler {
  fleetRepo;
  constructor(fleetRepo) {
    this.fleetRepo = fleetRepo;
  }
  execute(command) {
    // Find the fleet
    const fleet = this.fleetRepo.findById(command.fleetId);
    if (!fleet) {
      throw new Error(`Fleet with ID ${command.fleetId} not found.`);
    }
    // Check if the vehicle is already registered
    if (fleet.vehicles.some((v) => v.plateNumber === command.vehiclePlate)) {
      throw new Error(
        `Vehicle with plate ${command.vehiclePlate} is already registered in this fleet.`
      );
    }
    // Register the vehicle
    const newVehicle = new Vehicle(command.vehiclePlate, "ABCD");
    fleet.registerVehicle(newVehicle);
    // Save the updated fleet in the repository
    this.fleetRepo.save(fleet);
    return `Vehicle ${command.vehiclePlate} has been successfully registered to fleet ${command.fleetId}.`;
  }
}
