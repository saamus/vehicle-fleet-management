export class RegisterVehicleCommand {
  fleetId;
  vehiclePlate;
  constructor(fleetId, vehiclePlate) {
    this.fleetId = fleetId;
    this.vehiclePlate = vehiclePlate;
  }
}
