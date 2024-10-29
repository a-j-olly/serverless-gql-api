import { ProjectItem, ProjectRow } from "shared_types";

export function mapProjectResponse(rows: ProjectRow[]): ProjectItem[] {
	const projectMap = new Map<number, ProjectItem>();

	rows.forEach((row) => {
		if (!projectMap.has(row.id)) {
			projectMap.set(row.id, {
				id: row.id,
				name: row.name,
				description: row.description,
				releaseDate: row.release_date,
				imageURL: row.image_url,
				repositoryURL: row.repository_url,
				presentationURL: row.presentation_url ?? undefined,
				tags: [],
			});
		}

		const project = projectMap.get(row.id)!;

		// Add the tag if it doesn't already exist
		if (row.tag_id && row.tag_name) {
			const tag = { id: row.tag_id, name: row.tag_name };
			if (!project.tags.find((t) => t.id === tag.id)) {
				project.tags.push(tag);
			}
		}
	});

	return Array.from(projectMap.values());
}
