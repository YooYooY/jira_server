import { User } from "@/entities";
import { catchErrors } from "@/errors";
import { signToken } from "@/utils/authToken";
import {
  createEntity,
  deleteEntity,
  findEntityOrThrow,
  updateEntity,
  findEntityByCount
} from "@/utils/typeorm";
import { Request, Response } from "express";

export const all = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    const data = await findEntityByCount(User, req.query);
    res.respond(data);
  }
);

export const one = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    console.log(`req.currentUser`, req.currentUser)
    const user = await findEntityOrThrow(User, req.params.id, {
      relations: ["project"]
    });
    res.respond({ user });
  }
);

export const create = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    const user = await createEntity(User, req.body);
    res.respond({
      authToken: signToken({ sub: user.id })
    });
  }
);

export const update = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    const user = await updateEntity(User, req.params.id, req.body);
    res.respond({user});
  }
);

export const remove = catchErrors(
  async (req: Request, res: Response): Promise<void> => {
    const user = await deleteEntity(User, req.params.id);
    res.respond({user});
  }
);
