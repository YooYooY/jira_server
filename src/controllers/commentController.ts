import { catchErrors } from "@/errors";
import {
  createEntity,
  deleteEntity,
  findEntityByCount,
  updateEntity
} from "@/utils/typeorm";
import { Comment } from "@/entities";

export const all = catchErrors(async (req, res) => {
  const data = await findEntityByCount(Comment, req.query);
  res.respond(data);
});

export const create = catchErrors(async (req, res) => {
  const comment = await createEntity(Comment, req.body);
  res.respond({ comment });
});

export const update = catchErrors(async (req, res) => {
  const comment = await updateEntity(Comment, req.params.id, req.body);
  res.respond({ comment });
});

export const remove = catchErrors(async (req, res) => {
  const comment = await deleteEntity(Comment, req.params.id);
  res.respond({ comment });
});
