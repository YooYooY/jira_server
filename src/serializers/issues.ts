import { Issue } from "@/entities";
import { pick } from "lodash";

export const issuePartital = (issue: Issue): Partial<Issue> =>
  pick(issue, [
    "id",
    "title",
    "type",
    "status",
    "priority",
    "listPosition",
    "createdAt",
    "updatedAt",
    "userIds"
  ]);
