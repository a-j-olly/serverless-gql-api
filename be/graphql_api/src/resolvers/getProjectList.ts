import { ProjectItem } from "shared_types";
import { executeQuery } from "../lib/db";
import { mapProjectResponse } from "../lib/response_mapper";

export async function getProjectList(): Promise<ProjectItem[]> {
	let projects: ProjectItem[] = [];

	const result = await executeQuery(`
		SELECT p.*, t.id AS tag_id, t.name AS tag_name
		FROM projects p
		LEFT JOIN project_tags pt ON pt.project_id = p.id
		LEFT JOIN tags t ON t.id = pt.tag_id
	`);

	if (result.rows.length === 0) return [];

	projects = mapProjectResponse(result.rows);
	
	return projects;
}
