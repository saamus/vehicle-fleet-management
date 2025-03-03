# Vehicle Fleet Management

## Overview
This project is a Vehicle Fleet Parking Management system designed using **Domain-Driven Design (DDD)** principles and **CQRS (Command Query Responsibility Segregation)**. The system allows users to manage their vehicle fleets, register vehicles, and track their parking locations.

## Project Architecture
The project follows a **DDD** and **CQRS** approach, ensuring a clear separation between **domain logic**, **application logic**, and **infrastructure** concerns. The structure is as follows:

### 1. **Domain Layer** (Business Logic)
   - Defines the main business entities: `Fleet`, `Vehicle`, `Location`
   - Ensures encapsulation of domain logic and data validation
   - Uses **TypeScript** for strong typing

### 2. **Application Layer** (Use Cases)
   - Implements application logic, such as commands and handlers
   - Manages interactions between the domain and infrastructure

### 3. **Infrastructure Layer** (Persistence & External Services)
   - Provides database access using **SQLite/PostgreSQL**
   - Implements repositories for data storage (both **in-memory** and **database-backed**)

### 4. **CLI Layer**
   - Handles CLI interactions using **Commander.js**

## Database Model
The system stores data in an **SQLite/PostgreSQL** database, structured as follows:
![image](https://github.com/user-attachments/assets/0b97222e-2b48-4ecb-8586-2459623ab35c)

### **Tables & Relationships**
- **Fleet** (`id`, `userId`)
- **Vehicle** (`id`, `plateNumber`, `fleetId`)
- **Location** (`id`, `vehicleId`, `latitude`, `longitude`, `altitude`, `timestamp`)
- **FleetVehicle** (Many-to-Many relation between `Fleet` and `Vehicle`)
- **User** (To manage fleet ownership)

## Technologies Used
- **Programming Language:** TypeScript
- **Frameworks & Libraries:**
  - **Commander.js** for CLI interactions
  - **ESLint & Prettier** for code quality
  - **Cucumber.js** for BDD-style testing
- **Database:** SQLite (via TypeORM)
- **CI/CD:** GitHub Actions for automated testing & linting

## CLI Commands

The application provides a CLI to interact with the fleet system:
```shell
./fleet create <userId>                     # Creates a new fleet and returns fleetId
./fleet register-vehicle <fleetId> <plate>   # Registers a vehicle in a fleet
./fleet localize-vehicle <fleetId> <plate> lat lng [alt] # Parks a vehicle at a location
```

## CI/CD Setup
The GitHub Actions workflow performs:
1. **Checkout Code** - Clones repository
2. **Setup Node.js** - Installs Node.js 18
3. **Install Dependencies** - Uses `npm ci` for deterministic installs
4. **Run Linters & Formatters** - Ensures code quality
5. **Execute Tests** - Runs BDD tests using Cucumber.js

