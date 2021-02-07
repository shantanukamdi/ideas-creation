import { getManager, Repository } from "typeorm";
import { User } from "../entities/User";
import { Logger, ILogger } from "../utils/logger";

export class UserService {
  userRepository: Repository<User>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.userRepository = getManager().getRepository(User);
  }

  instantiate(data: Object): User | undefined {
    return this.userRepository.create(data);
  }

  async insert(data: User): Promise<User> {
    this.logger.info(`Create a new user`, data);
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: string | number): Promise<User | undefined> {
    this.logger.info("Fetching user by id: ", id);
    if (id) {
      return await this.userRepository.findOne({
        where: {
          id,
        },
      });
    }
    return Promise.reject(false);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    this.logger.info("Fetching user by email: ", email);
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user ? user : undefined;
  }
}
