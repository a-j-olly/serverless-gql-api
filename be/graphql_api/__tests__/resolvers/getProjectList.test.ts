import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProjectList } from "../../src/resolvers/getProjectList";
import { executeQuery } from "../../src/lib/db";
import { ProjectItem, ProjectRow } from "shared_types";

// Mock the client.query method
vi.mock("../../src/lib/db", () => ({
	executeQuery: vi.fn(),
}));

beforeEach(() => {
	vi.mocked(executeQuery).mockReset();
});

describe("getProjectList", {}, () => {
	it("should return a list of projects", async () => {
		const mockProjectRows: { rows: ProjectRow[] } = {
			rows: [
				{
					id: 1,
					name: "Project Alpha",
					description: "First project",
					release_date: "2023-01-01",
					image_url: "http://imgurl/1.png",
					presentation_url: "http://example.com/ProjectAlpha",
					repository_url: "http://github.com/ProjectAlpha",
					tag_id: 1,
					tag_name: "JavaScript",
				},
				{
					id: 1,
					name: "Project Alpha",
					description: "First project",
					release_date: "2023-01-01",
					image_url: "http://imgurl/1.png",
					presentation_url: "http://example.com/ProjectAlpha",
					repository_url: "http://github.com/ProjectAlpha",
					tag_id: 2,
					tag_name: "GraphQL",
				},
				{
					id: 2,
					name: "Project Beta",
					description: "Second project",
					release_date: "2023-02-01",
					image_url: "http://imgurl/2.png",
					presentation_url: "http://example.com/ProjectBeta",
					repository_url: "http://github.com/ProjectBeta",
					tag_id: 1,
					tag_name: "JavaScript",
				},
				{
					id: 3,
					name: "Project Gamma",
					description: "Third project",
					release_date: "2023-02-01",
					image_url: "http://imgurl/3.png",
					presentation_url: "http://example.com/ProjectGamma",
					repository_url: "http://github.com/ProjectGamma",
					tag_id: null,
					tag_name: null,
				},
			],
		};

		const expectedProjects: ProjectItem[] = [
			{
				id: 1,
				name: "Project Alpha",
				description: "First project",
				releaseDate: "2023-01-01",
				imageURL: "http://imgurl/1.png",
				presentationURL: "http://example.com/ProjectAlpha",
				repositoryURL: "http://github.com/ProjectAlpha",
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
				imageURL: "http://imgurl/2.png",
				presentationURL: "http://example.com/ProjectBeta",
				repositoryURL: "http://github.com/ProjectBeta",
				tags: [{ id: 1, name: "JavaScript" }],
			},
			{
				id: 3,
				name: "Project Gamma",
				description: "Third project",
				releaseDate: "2023-02-01",
				imageURL: "http://imgurl/3.png",
				presentationURL: "http://example.com/ProjectGamma",
				repositoryURL: "http://github.com/ProjectGamma",
				tags: [],
			},
		];

		vi.mocked(executeQuery).mockResolvedValue(mockProjectRows as any);

		// Call the function
		const result = await getProjectList();

		// Assert that the result matches the mock data
		expect(result).toEqual(expectedProjects);

		expect(executeQuery).toHaveBeenCalledWith(
			expect.stringContaining(`SELECT p.*, t.id AS tag_id, t.name AS tag_name`)
		);
	});

	it("should return an empty list when no projects are found", async () => {
		vi.mocked(executeQuery).mockResolvedValue({ rows: [] } as any);

		// Call the function
		const result = await getProjectList();

		// Assert that the result is an empty array
		expect(result).toEqual([]);

		expect(executeQuery).toHaveBeenCalledWith(
			expect.stringContaining(`SELECT p.*, t.id AS tag_id, t.name AS tag_name`)
		);
	});
});
