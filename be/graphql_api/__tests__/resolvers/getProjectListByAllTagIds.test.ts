import { describe, it, expect, vi, beforeEach } from "vitest";
import { executeQuery } from "../../src/lib/db";
import { getProjectListByAllTagIds } from "../../src/resolvers/getProjectListByAllTagIds";
import { ProjectItem, ProjectRow } from "shared_types";

// Mock the client.query method
vi.mock("../../src/lib/db", () => ({
	executeQuery: vi.fn(),
}));

beforeEach(() => {
	vi.mocked(executeQuery).mockReset();
});

describe("getProjectListByAllTagIds", {}, () => {
	it("should return projects that contain all the specified tag IDs", async () => {
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
		];

		vi.mocked(executeQuery).mockResolvedValue(mockProjectRows as any);

		// Call the function with tag IDs [1, 2]
		const result = await getProjectListByAllTagIds(["1", "2"]);

		// Expected result should only contain 'Project Alpha' because it contains all 2 tags
		expect(result).toEqual(expectedProjects);

		// Ensure Prisma was called with the correct parameters
		expect(executeQuery).toHaveBeenCalledOnce();
	});

	it("should return an empty array when no projects match the provided tag IDs", async () => {
		vi.mocked(executeQuery).mockResolvedValue({ rows: [] } as any);

		// Call the function with tag IDs [999] (assuming no projects have this tag)
		const result = await getProjectListByAllTagIds(["999"]);

		// Assert the result is an empty array
		expect(result).toEqual([]);

		expect(executeQuery).toHaveBeenCalledOnce();
	});
});
