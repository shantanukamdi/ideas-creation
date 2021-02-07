import { getManager, Repository } from "typeorm";
import { Idea } from "../entities/Idea";
import { Logger, ILogger } from "../utils/logger";

export class IdeaService {
  ideaRepository: Repository<Idea>;
  logger: ILogger;

  constructor() {
    this.logger = new Logger(__filename);
    this.ideaRepository = getManager().getRepository(Idea);
  }

  instantiate(data: Object): Idea | undefined {
    return this.ideaRepository.create(data);
  }

  async insert(data: Idea): Promise<Idea> {
    this.logger.info(`Create a new idea`, data);
    const newIdea = this.ideaRepository.create(data);
    return await this.ideaRepository.save(newIdea);
  }

  async getAllIdeas(): Promise<Idea[]> {
    return await this.ideaRepository.find();
  }

  async getIdeaById(id: string): Promise<Idea | undefined> {
    this.logger.info("Fetching idea by id: ", id);
    if (id) {
      return await this.ideaRepository.findOne({
        where: {
          id,
        },
      });
    }
    return Promise.reject(false);
  }
}
