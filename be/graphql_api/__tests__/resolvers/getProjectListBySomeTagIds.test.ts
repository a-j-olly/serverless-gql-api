import { describe, it, expect, vi, beforeEach } from "vitest";
import { executeQuery } from "../../src/lib/db";
import { getProjectListBySomeTagIds } from "../../src/resolvers/getProjectListBySomeTagIds";
import { ProjectItem, ProjectRow } from "shared_types";

// Mock the client.query method
vi.mock("../../src/lib/db", () => ({
	executeQuery: vi.fn(),
}));

beforeEach(() => {
	vi.mocked(executeQuery).mockReset();
});

describe("getProjectListBySomeTagIds", {}, () => {
	it("should return projects associated with given tag IDs", async () => {
		const mockProjectRows: { rows: ProjectRow[] } = {
			rows: [
				{
					id: 1,
					name: "Project Alpha",
					description: "First project",
					release_date: "2023-01-01",
					image_url: "http://example.com/images/project-alpha",
					repository_url: "http://github.com/project-alpha",
					presentation_url: null,
					tag_id: 1,
					tag_name: "JavaScript",
				},
				{
					id: 1,
					name: "Project Alpha",
					description: "First project",
					release_date: "2023-01-01",
					image_url: "http://example.com/images/project-alpha",
					repository_url: "http://github.com/project-alpha",
					presentation_url: null,
					tag_id: 2,
					tag_name: "GraphQL",
				},
				{
					id: 2,
					name: "Project Beta",
					description: "Second project",
					release_date: "2023-02-01",
					image_url: "http://example.com/images/project-beta",
					repository_url: "http://github.com/project-beta",
					presentation_url: null,
					tag_id: 1,
					tag_name: "JavaScript",
				},
			],
		};

		const expectedProjects: ProjectItem[] = [
			{
				id: 1,
				name: "Project Alpha",
				description: "First project",
				releaseDate: "2023-01-01",
				imageURL: "http://example.com/images/project-alpha",
				repositoryURL: "http://github.com/project-alpha",
				presentationURL: undefined,
				tags: [
					{ id: 1, name: "JavaScript" },
					{ id: 2, name: "GraphQL" },
				],
			},
			{
				id: 2,
				name: "Project Beta",
				description: "Second project",
				releaseDate: "2023-02-01",
				imageURL: "http://example.com/images/project-beta",
				repositoryURL: "http://github.com/project-beta",
				presentationURL: undefined,
				tags: [{ id: 1, name: "JavaScript" }],
			},
		];

		vi.mocked(executeQuery).mockResolvedValue(mockProjectRows as any);

		// Call the function with valid tag IDs
		const result = await getProjectListBySomeTagIds(["1", "2"]);

		// Assert that the result matches the mock data
		expect(result).toEqual(expectedProjects);

		expect(executeQuery).toHaveBeenCalledOnce();
	});

	it("should return an empty list when no projects match the tag IDs", async () => {
		vi.mocked(executeQuery).mockResolvedValue({ rows: [] } as any);

		// Call the function with tag IDs
		const result = await getProjectListBySomeTagIds(["999"]);

		// Assert that the result is an empty array
		expect(result).toEqual([]);

		expect(executeQuery).toHaveBeenCalledOnce();
	});
});
