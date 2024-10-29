import { ProjectItem } from "shared_types";
import { executeQuery } from "../lib/db";
import { mapProjectResponse } from "../lib/response_mapper";

export async function getProjectListBySomeTagIds(
	tagIds: string[]
): Promise<ProjectItem[]> {
	let projects: ProjectItem[] = [];

	const tags = [...tagIds.map((tagId) => parseInt(tagId))];

	const sql = `
		SELECT p.*, t.id AS tag_id, t.name AS tag_name
		FROM projects p
		JOIN project_tags pt ON pt.project_id = p.id
		JOIN tags t ON t.id = pt.tag_id
		WHERE p.id IN (
			SELECT project_id 
			FROM project_tags 
			WHERE tag_id = ANY($1::int[])
		)
		ORDER BY p.id, t.id;
	`;

	const result = await executeQuery(sql, tags);

	if (result.rows.length === 0) return [];

	projects = mapProjectResponse(result.rows);

	return projects;
}
