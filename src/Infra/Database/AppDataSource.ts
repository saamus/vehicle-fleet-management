import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../../Domain/User'
import { Fleet } from '../../Domain/Fleet'
import { Vehicle } from '../../Domain/Vehicle'
import { Location } from '../../Domain/Location'

// export const AppDataSource = new DataSource({
//   type: 'sqlite',
//   database: 'fleet_management.db',  // Path to your SQLite database file
//   synchronize: true,// Automatically sync DB schema
//   logging: true, // Enable query logging
//   entities: [User, Fleet, Vehicle, Location],
//   migrations: [],
//   subscribers: [],
// });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'fleet_management',
  entities: [User, Fleet, Vehicle, Location],
  synchronize: true,
  logging: false,
})

AppDataSource.initialize()
  .then(() => {
    // TODO : place work here ?
  })
  .catch((error) => console.log(error))
