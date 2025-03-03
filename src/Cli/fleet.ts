#!/usr/bin/env node

import { Command } from 'commander'
import { AppDataSource } from '../Infra/Database/AppDataSource'
import { DBFleetRepository } from '../Infra/Database/DBFleetRepository'
import { DBVehicleRepository } from '../Infra/Database/DBVehicleRepository'
import { DBLocationRepository } from '../Infra/Database/DBLocationRepository'
import { DBUserRepository } from '../Infra/Database/DBUserRepository'
import { Fleet } from '../Domain/Fleet'
import { Vehicle } from '../Domain/Vehicle'
import { Location } from '../Domain/Location'
import { User } from '../Domain/User'

const program = new Command()

async function initializeDatabase() {
  try {
    console.log('Initializing database...')
    await AppDataSource.initialize()
    console.log('Data Source has been initialized!')

    // Check for the user and create it if necessary
    const userRepo = AppDataSource.getRepository(User)
    const user = await createUserIfNotExists('test-1', userRepo)

    // Create the fleet
    const fleetRepo = AppDataSource.getRepository(Fleet)
    const fleet = new Fleet(Date.now().toString(), user)
    await fleetRepo.save(fleet)

    console.log('Fleet created successfully!')
  } catch (error) {
    console.error('Error during database initialization or creation:', error)
  }
}

// Helper function to create the user if it does not exist
async function createUserIfNotExists(userId: string, userRepo: any) {
  let user = await userRepo.findById(userId)

  if (!user) {
    console.log(`Creating new user with ID ${userId}...`)
    user = new User(userId, 'Fatima', 'fatima@example.com')
    await userRepo.save(user)
  }

  return user
}

async function createFleetForUser(
  userId: string,
  userRepo: DBUserRepository,
  fleetRepo: DBFleetRepository
) {
  const user = await createUserIfNotExists(userId, userRepo)
  if (!user) {
    throw new Error(`User with ID ${userId} could not be created or found.`)
  }

  console.log(`Creating fleet for user ${userId}...`)
  const fleet = new Fleet(`${Date.now()}`, user)
  await fleetRepo.save(fleet)
  console.log(`Fleet created with ID: ${fleet.id}`)
}

async function registerVehicleToFleet(
  fleetId: string,
  plateNumber: string,
  fleetRepo: DBFleetRepository,
  vehicleRepo: DBVehicleRepository
) {
  console.log(`Registering vehicle ${plateNumber} to fleet ${fleetId}...`)
  const fleet = await fleetRepo.findById(fleetId)
  if (!fleet) {
    console.error(`Fleet with ID ${fleetId} not found.`)
    return
  }

  const vehicle = await vehicleRepo.findByPlateNumber(plateNumber)
  if (vehicle) {
    console.error(`Vehicle with plate ${plateNumber} is already registered.`)
    return
  }

  const newVehicle = new Vehicle(plateNumber, 'ABC1')
  await vehicleRepo.save(newVehicle)

  // Add vehicle to the fleet
  fleet.vehicles.push(newVehicle) // Linking vehicle to the fleet
  await fleetRepo.save(fleet) // Update the fleet in the repository

  console.log(
    `Vehicle with plate ${plateNumber} registered to fleet ${fleetId}`
  )
}

async function localizeVehicle(
  fleetId: string,
  plateNumber: string,
  lat: string,
  lng: string,
  alt: string | undefined,
  fleetRepo: DBFleetRepository,
  vehicleRepo: DBVehicleRepository,
  locationRepo: DBLocationRepository
) {
  console.log(
    `Localizing vehicle ${plateNumber} at [${lat}, ${lng}] in fleet ${fleetId}...`
  )
  const fleet = await fleetRepo.findById(fleetId)
  if (!fleet) {
    console.error(`Fleet with ID ${fleetId} not found.`)
    return
  }

  const vehicle = await vehicleRepo.findByPlateNumber(plateNumber)
  if (!vehicle) {
    console.error(`Vehicle with plate ${plateNumber} not found.`)
    return
  }

  const location = new Location(
    vehicle,
    parseFloat(lat),
    parseFloat(lng),
    alt ? parseFloat(alt) : NaN
  )

  await locationRepo.save(location)

  // Park the vehicle at the new location & adding location to the vehicle's history
  vehicle.park(location)

  console.log(`Vehicle ${plateNumber} localized at [${lat}, ${lng}]`)
}

async function main() {
  try {
    await initializeDatabase()
    const fleetRepo = new DBFleetRepository()
    const vehicleRepo = new DBVehicleRepository()
    const locationRepo = new DBLocationRepository()
    const userRepo = new DBUserRepository()

    // Command to create a fleet for a user (returns fleetId)
    program
      .command('create <userId>')
      .description('Create a new fleet for a user')
      .action(async (userId: string) => {
        await createFleetForUser(userId, userRepo, fleetRepo)
      })

    // Command to register a vehicle in a fleet
    program
      .command('register-vehicle <fleetId> <vehiclePlateNumber>')
      .description('Register a vehicle into a fleet')
      .action(async (fleetId: string, plateNumber: string) => {
        await registerVehicleToFleet(
          fleetId,
          plateNumber,
          fleetRepo,
          vehicleRepo
        )
      })

    // Command to localize a vehicle
    program
      .command(
        'localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]'
      )
      .description(
        'Localize a vehicle by providing latitude, longitude, and optional altitude'
      )
      .action(
        async (
          fleetId: string,
          plateNumber: string,
          lat: string,
          lng: string,
          alt: string | undefined
        ) => {
          await localizeVehicle(
            fleetId,
            plateNumber,
            lat,
            lng,
            alt,
            fleetRepo,
            vehicleRepo,
            locationRepo
          )
        }
      )

    // Parse the command-line arguments
    program.parse(process.argv)
  } catch (error) {
    console.error('Error during execution:', error)
  }
}

// Call the main function to start the process
main()
