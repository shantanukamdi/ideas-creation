import { NextFunction, Request, Response } from "express";
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from "../constants";
import { getRepository } from "typeorm";
import { Idea as I } from "../entities/Idea";

export const CreateIdea = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.payload;

  const { title, description } = req.body;

  const ideaRepository = await getRepository(I);

  const newIdea = new I();
  newIdea.title = title;
  newIdea.description = description;
  newIdea.creatorId = payload.userId;

  try {
    const savedIdea = await ideaRepository.save(newIdea);

    res.send(savedIdea);
  } catch (error) {
    console.log(`Error while saving the idea ${error}`);
    if (error && error.code == PG_UNIQUE_CONSTRAINT_VIOLATION) {
      res.status(409).send({
        message: `Idea already exists`,
      });
    } else {
      res.status(500).send({
        message: `Something went wrong!`,
      });
    }
  }
};

export const GetAllIdeas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.payload;

  const ideaRepository = await getRepository(I);

  const ideas = await ideaRepository.find({
    where: {
      creatorId: payload.userId,
    },
  });

  if (ideas) {
    res.send(ideas);
  } else {
    res.status(404).send({
      message: "No available ideas for the given user",
    });
  }
};

export const GetIdea = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ideaId = req.params.ideaId;

  const ideaRepository = await getRepository(I);

  const idea = await ideaRepository.findOne({
    where: {
      id: ideaId,
    },
  });

  if (idea) {
    res.send(idea);
  } else {
    res.status(404).send({
      message: "No available idea for the given id",
    });
  }
};

export const EditIdea = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, id } = req.body;
  console.log("EditIdea", title, description, id);

  const ideaRepository = await getRepository(I);

  const existingIdea = await ideaRepository.findOne({
    where: {
      id,
    },
  });

  if (existingIdea) {
    if (existingIdea.title !== title) {
      existingIdea.title = title;
    }

    if (existingIdea.description !== description) {
      existingIdea.description = description;
    }

    const updatedIdea = await ideaRepository.save(existingIdea);

    res.send(updatedIdea);
  } else {
    res.status(404).send({
      message: "No available idea for the given id",
    });
  }
};

export const DeleteIdea = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ideaId = req.params.ideaId;

  const ideaRepository = await getRepository(I);

  const existingIdea = await ideaRepository.findOne({
    where: {
      id: ideaId,
    },
  });

  if (existingIdea) {
    await ideaRepository.delete(existingIdea);

    res.send({
      message: "Entity deleted successfully",
    });
  } else {
    res.status(404).send({
      message: "No available idea for the given id",
    });
  }
};
