import { Issue } from "@/entities";
import { catchErrors } from "@/errors";
import { createEntity, deleteEntity, updateEntity } from "@/utils/typeorm";

export const getProjectIssues = catchErrors(async (req, res) => {
  const { projectId } = req.currentUser;
  const { searchTerm } = req.query;
  let whereSQL = "issue.projectId = :projectId";

  // 模糊查询
  if (searchTerm) {
    whereSQL +=
      " AND (issue.title LIKE :searchTerm OR issue.descriptionText LIKE :searchTerm)";
  }

  const issues = await Issue.createQueryBuilder("issue")
    .select()
    .where(whereSQL, { projectId, searchTerm: `%${searchTerm}%` })
    .getMany();

  res.respond({ issues });
});

export const create = catchErrors(async (req, res) => {
  // console.log(`req.currentUser`, req.currentUser);
  const listPosition = await calculateListPosition(req.body);
  const issue = await createEntity(Issue, { ...req.body, listPosition });
  res.respond({ issue });
});

export const update = catchErrors(async (req, res) => {
  const issue = await updateEntity(Issue, req.params.id, req.body);
  res.respond({ issue });
});

export const remove = catchErrors(async (req, res) => {
  const issue = await deleteEntity(Issue, req.params.id);
  res.respond({ issue });
});


const calculateListPosition = async ({
  projectId,
  status
}: Issue): Promise<number> => {
  const issues = await Issue.find({ projectId, status });
  const listPositions = issues.map(({ listPosition }) => listPosition);

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};
