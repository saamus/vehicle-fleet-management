import { Given, When, Then } from '@cucumber/cucumber'
import { assert } from 'chai'
import { InMemoryFleetRepository } from '../../src/Infra/InMemoryFleetRepository'
import { InMemoryLocationRepository } from '../../src/Infra/InMemoryLocationRepository'
import { RegisterVehicleCommandHandler } from '../../src/App/Handlers/RegisterVehicleCommandHandler'
import { ParkVehicleCommandHandler } from '../../src/App/Handlers/ParkVehicleCommandHandler'
import { RegisterVehicleCommand } from '../../src/App/Commands/RegisterVehicleCommand'
import { ParkVehicleCommand } from '../../src/App/Commands/ParkVehicleCommand'
import { Fleet } from '../../src/Domain/Fleet'
import { Vehicle } from '../../src/Domain/Vehicle'
import { Location } from '../../src/Domain/Location'
import { User } from '../../src/Domain/User'
import { InMemoryVehicleRepository } from '../../src/Infra/InMemoryVehicleRepository'

let fleetRepo: InMemoryFleetRepository
let locationRepo: InMemoryLocationRepository
let vehicleRepo: InMemoryVehicleRepository
let registerVehicleHandler: RegisterVehicleCommandHandler
let parkVehicleHandler: ParkVehicleCommandHandler
let command: ParkVehicleCommand
let fleet: Fleet
let vehicle: Vehicle
let user: User
let error: Error | undefined

Given('my fleet exists', () => {
  fleetRepo = new InMemoryFleetRepository()
  user = new User('user1', 'John Doe', 'email@wonderland.com')
  fleet = new Fleet('fleet1', user)
  fleetRepo.save(fleet)
})

Given('I have registered a vehicle into my fleet', () => {
  vehicleRepo = new InMemoryVehicleRepository() // Initialize vehicleRepo
  vehicle = new Vehicle('veh-1', 'ABC123')

  // Make sure the vehicle is saved in the vehicleRepo before using it
  vehicleRepo.save(vehicle)

  const registerCommand = new RegisterVehicleCommand(
    fleet.id,
    vehicle.plateNumber
  )
  registerVehicleHandler = new RegisterVehicleCommandHandler(fleetRepo)
  registerVehicleHandler.execute(registerCommand)
})

Given('a location is provided', () => {
  command = new ParkVehicleCommand(vehicle.plateNumber, 45.0, -75.0, 300.0)
  locationRepo = new InMemoryLocationRepository()
  parkVehicleHandler = new ParkVehicleCommandHandler(locationRepo, vehicleRepo)
})

Given('my vehicle has already been parked at this location', () => {
  locationRepo = new InMemoryLocationRepository() // Initialized locationRepo
  const parkedLocation = new Location(vehicle, 45.0, -75.0, 300)

  locationRepo.save(parkedLocation) // Save the location
  const savedLocation = locationRepo.findByVehicleId(vehicle.plateNumber)?.[0]

  assert.isDefined(
    savedLocation,
    `No location saved for vehicle ${vehicle.plateNumber}`
  )
})

When('I park my vehicle at this location', () => {
  parkVehicleHandler.execute(command)
})

When('I try to park my vehicle at this location again', () => {
  try {
    parkVehicleHandler.execute(command)
  } catch (e) {
    error = e as Error
  }
})

Then('the known location of my vehicle should match this location', () => {
  const parkedLocation = locationRepo.findByVehicleId(vehicle.plateNumber)?.[0]
  assert.isDefined(
    parkedLocation,
    `No locations found for vehicle ${vehicle.plateNumber}`
  )
  assert.equal(parkedLocation?.latitude, 45.0)
  assert.equal(parkedLocation?.longitude, -75.0)
  assert.equal(parkedLocation?.altitude, 300.0)
})

Then(
  'I should be informed that my vehicle is already parked at this location',
  () => {
    assert.exists(error)
    assert.equal(
      error!.message,
      `Vehicle ${vehicle.plateNumber} is already parked at this location.`
    )
  }
)
