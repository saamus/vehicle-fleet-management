import { Given, When, Then } from "@cucumber/cucumber";
import { assert } from "chai";
import { InMemoryFleetRepository } from "../../src/Infra/InMemoryFleetRepository";
import { RegisterVehicleCommandHandler } from "../../src/App/Handlers/RegisterVehicleCommandHandler";
import { RegisterVehicleCommand } from "../../src/App/Commands/RegisterVehicleCommand";
import { Fleet } from "../../src/Domain/Fleet";
import { Vehicle } from "../../src/Domain/Vehicle";
import { User } from "../../src/Domain/User";

let fleetRepo: InMemoryFleetRepository;
let registerVehicleHandler: RegisterVehicleCommandHandler;
let command: RegisterVehicleCommand;
let fleet: Fleet;
let vehicle: Vehicle;
let user: User;
let error: Error | undefined;

Given("my fleet", () => {
  fleetRepo = new InMemoryFleetRepository();
  user = new User("user1", "John Doe", "email@wonderland.com");
  fleet = new Fleet("fleet1", user);
  fleetRepo.save(fleet);
});

Given("a vehicle", () => {
  vehicle = new Vehicle("veh-1", "ABC123");
  command = new RegisterVehicleCommand(fleet.id, vehicle.plateNumber);
});

Given("I have registered this vehicle into my fleet", () => {
  registerVehicleHandler = new RegisterVehicleCommandHandler(fleetRepo);
  registerVehicleHandler.execute(command);
});

When("I register this vehicle into my fleet", () => {
  registerVehicleHandler = new RegisterVehicleCommandHandler(fleetRepo);
  registerVehicleHandler.execute(command);
});

When("I try to register this vehicle into my fleet", () => {
  try {
    registerVehicleHandler.execute(command);
  } catch (e) {
    error = e as Error;
  }
});

Given("the fleet of another user", () => {
  const otherUser = new User("user2", "Jane Doe", "jane@wonderland.com");
  const otherFleet = new Fleet("fleet2", otherUser);
  fleetRepo.save(otherFleet);
});

When("I register this vehicle into the other user's fleet", () => {
  const fleet2 = fleetRepo.findById("fleet2");
  if (!fleet2) throw new Error("Fleet 2 not found");

  const otherFleetCommand = new RegisterVehicleCommand(
    fleet2.id,
    vehicle.plateNumber,
  );
  const handler = new RegisterVehicleCommandHandler(fleetRepo);
  handler.execute(otherFleetCommand);
});

Then("this vehicle should be part of my vehicle fleet", () => {
  const registeredVehicle = fleetRepo
    .findById(fleet.id)
    ?.vehicles.find((v) => v.plateNumber === vehicle.plateNumber);
  assert.isDefined(registeredVehicle);
});

Then(
  "I should be informed that this vehicle has already been registered",
  () => {
    assert.exists(error);
    assert.equal(
      error!.message,
      `Vehicle with plate ${vehicle.plateNumber} is already registered in this fleet.`,
    );
  },
);

Given("this vehicle has been registered into the other user's fleet", () => {
  const fleet2 = fleetRepo.findById("fleet2");
  if (!fleet2) throw new Error("Fleet 2 not found");

  const otherFleetCommand = new RegisterVehicleCommand(
    fleet2.id,
    vehicle.plateNumber,
  );
  const handler = new RegisterVehicleCommandHandler(fleetRepo);
  handler.execute(otherFleetCommand);
});
