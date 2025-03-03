-- Create User table
CREATE TABLE "User" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- Create Fleet table
CREATE TABLE Fleet (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Vehicle table
CREATE TABLE Vehicle (
    plate_number TEXT PRIMARY KEY, 
    id TEXT UNIQUE NOT NULL        
);

-- Relation many-to-many between Fleet and Vehicle
CREATE TABLE Fleet_Vehicle (
    fleet_id TEXT NOT NULL, 
    vehicle_plate_number TEXT NOT NULL, 
    PRIMARY KEY (fleet_id, vehicle_plate_number),
    FOREIGN KEY (fleet_id) REFERENCES Fleet(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_plate_number) REFERENCES Vehicle(plate_number) ON DELETE CASCADE
);

-- Create Location table
CREATE TABLE Location (
    id SERIAL PRIMARY KEY,
    vehicle_plate_number TEXT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    altitude DECIMAL(9,6) NOT NULL,
    parked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_plate_number) REFERENCES Vehicle(plate_number) ON DELETE CASCADE
);
