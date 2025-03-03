export class Location {
  id;
  vehiclePlate;
  latitude;
  longitude;
  altitude;
  constructor(id, vehiclePlate, latitude, longitude, altitude = 0) {
    this.id = id;
    this.vehiclePlate = vehiclePlate;
    this.latitude = latitude;
    this.longitude = longitude;
    this.altitude = altitude;
  }
  isSameLocation(otherLocation) {
    return (
      this.latitude === otherLocation.latitude &&
      this.longitude === otherLocation.longitude &&
      this.altitude === otherLocation.altitude
    );
  }
}
