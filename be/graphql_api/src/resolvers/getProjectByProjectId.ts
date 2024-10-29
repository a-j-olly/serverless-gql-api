import { ProjectItem } from "shared_types";
import { executeQuery } from "../lib/db";
import { mapProjectResponse } from "../lib/response_mapper";

export async function getProjectByProjectId(
	projectId: string
): Promise<ProjectItem | null> {
	let project: ProjectItem | null = null;

	const sql = `
		SELECT p.*, t.id AS tag_id, t.name AS tag_name
		FROM projects p
		LEFT JOIN project_tags pt ON pt.project_id = p.id
		LEFT JOIN tags t ON t.id = pt.tag_id
		WHERE p.id = $1
	`;

	const result = await executeQuery(sql, projectId);

	if (result.rows.length === 0) return null;

	project = mapProjectResponse(result.rows)[0];

	return project;
}
