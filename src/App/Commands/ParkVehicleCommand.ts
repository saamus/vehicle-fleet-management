export class ParkVehicleCommand {
  constructor(
    public vehiclePlate: string,
    public latitude: number,
    public longitude: number,
    public altitude: number
  ) {}
}
