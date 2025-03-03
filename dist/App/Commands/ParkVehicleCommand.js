export class ParkVehicleCommand {
  vehiclePlate;
  latitude;
  longitude;
  altitude;
  constructor(vehiclePlate, latitude, longitude, altitude) {
    this.vehiclePlate = vehiclePlate;
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }
}
