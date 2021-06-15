import { User } from "@/entities";
import { catchErrors } from "@/errors";
import { createEntity, deleteEntity, findEntityOrThrow, updateEntity } from "@/utils/typeorm";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

export const all = catchErrors(
  async (_req: Request, res: Response): Promise<void> => {
    const data = await User.find();
    res.json(data);
  }
);

export const one = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    const user = await findEntityOrThrow(User,req.params.id);
    res.json(user);
  }
);

export const create = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    const user = await createEntity(User, req.body);
    res.json(user);
  }
);

export const update = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    const user = await updateEntity(User, req.params.id, req.body);
    res.json(user);
  }
);

export const remove = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    const user = await deleteEntity(User, req.params.id);
    res.json(user)
  }
);
