import { Repository } from "typeorm";
import { User } from "../../Domain/User";
import { AppDataSource } from "./AppDataSource";

export class DBUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  // Save user to the database
  async save(user: User): Promise<User> {
    try {
      console.log("Saving user:", user);
      const savedUser = await this.userRepository.save(user);
      console.log(`User ${savedUser.id} saved successfully.`);
      return savedUser;
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Could not save user");
    }
  }

  // Find user by ID
  async findById(id: string): Promise<User | null> {
    try {
      console.log(`Searching for user with ID: ${id}`);
      const user = await this.userRepository.findOne({ where: { id } });

      if (user) {
        console.log(`User found: ${user.id}`);
      } else {
        console.log(`User with ID ${id} not found.`);
      }
      return user || null; // Return null if no user is found
    } catch (error) {
      console.error(`Error finding user with ID ${id}:`, error);
      return null;
    }
  }
}
