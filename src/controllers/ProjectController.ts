import { Project } from "@/entities";
import { catchErrors } from "@/errors";
import { issuePartital } from "@/serializers/issues";
import { createEntity, deleteEntity, findEntityOrThrow, updateEntity } from "@/utils/typeorm";

export const create = catchErrors(async (req, res) => {
  req.body.users = [req.currentUser];
  const project = await createEntity(Project, req.body);
  res.respond({ project });
});

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
  const project = await findEntityOrThrow(Project, req.currentUser.projectId, {
    relations: ["users", "issues"]
  });
  res.respond({ ...project, issues: project.issues.map(issuePartital) });
});

export const update = catchErrors(async (req, res)=>{
  const project = await updateEntity(Project, req.currentUser.projectId, req.body);
  res.respond({project})
})

export const remove = catchErrors(async (req, res)=>{
  const project = await deleteEntity(Project, req.params.id);
  res.respond({project})
})
