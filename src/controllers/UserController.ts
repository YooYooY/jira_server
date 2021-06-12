import { User } from "@/entities";
import { generateErrors } from "@/utils/validation";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

export const all = async (_req: Request, res: Response): Promise<void> => {
  const data = await User.find();
  res.json(data);
};

export const one = async (req: Request, res: Response): Promise<void> => {
  const userRepository = getRepository(User);
  const { id } = req.params;
  const user = await userRepository.findOne(id);
  if (user) {
    res.json(user);
  } else {
    res.statusCode = 404;
    res.json({ id, error: `id ${id} no exist` });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const user = User.create(req.body || {});
  // 检查参数是否正确
  const errorFields = generateErrors(user, User.validations);
  if (Object.keys(errorFields).length > 0) {
    res.json(errorFields);
    return;
  }

  const userRepository = getRepository(User);
  await userRepository.save(user);
  console.log(user);
  res.json({
    message: "success"
  });
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const userRepository = getRepository(User);
  const { id } = req.params;
  const user = await userRepository.findOne(id);
  if (user) {
      const result = await userRepository.save({ ...user, ...req.body });
      res.json(result);
  } else {
    res.statusCode = 404;
    res.json({ id, error: `id ${id} no exist` });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const userRepository = getRepository(User);
  const { id } = req.params;
  const userToRemove = await userRepository.findOne(id);
  if (userToRemove) {
    const result = await userRepository.remove(userToRemove);
    res.json({ success: result });
  } else {
    res.statusCode = 404;
    res.json({ id, error: `id ${id} no exist` });
  }
};
