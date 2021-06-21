import { Project } from "@/entities";
import { catchErrors } from "@/errors";
import { createEntity, findEntityOrThrow, updateEntity } from "@/utils/typeorm";

export const create = catchErrors(async (req, res) => {
  req.body.users = [req.currentUser];
  const project = await createEntity(Project, req.body);
  res.respond({ project });
});

export const getProjectWithUsers = catchErrors(async (req, res) => {
  const project = await findEntityOrThrow(Project, req.currentUser.projectId, {
    relations: ["users"]
  });
  res.respond({ project });
});

export const update = catchErrors(async (req, res)=>{
  const project = await updateEntity(Project, req.currentUser.projectId, req.body);
  res.respond({project})
})