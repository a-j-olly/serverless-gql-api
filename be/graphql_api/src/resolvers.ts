import { getProjectByProjectId } from "./resolvers/getProjectByProjectId";
import { getProjectList } from "./resolvers/getProjectList";
import { getProjectListByAllTagIds } from "./resolvers/getProjectListByAllTagIds";
import { getProjectListBySomeTagIds } from "./resolvers/getProjectListBySomeTagIds";
import { getTagList } from "./resolvers/getTagList";

export const resolvers = {
	Query: {
		getProjectList,
		getProjectListBySomeTagIds(_, args) {
			return getProjectListBySomeTagIds(args.tagIds);
		},
		getProjectListByAllTagIds(_, args) {
			return getProjectListByAllTagIds(args.tagIds);
		},
		getProjectByProjectId(_, args) {
			return getProjectByProjectId(args.projectId);
		},
		getTagList,
	},
};
