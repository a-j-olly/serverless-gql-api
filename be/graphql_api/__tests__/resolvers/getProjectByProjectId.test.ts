import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProjectByProjectId } from "../../src/resolvers/getProjectByProjectId";
import { executeQuery } from "../../src/lib/db";
import { ProjectItem, ProjectRow } from "shared_types";

// Mock the client.query method
vi.mock("../../src/lib/db", () => ({
	executeQuery: vi.fn(),
}));

beforeEach(() => {
	vi.mocked(executeQuery).mockReset();
});

describe("getProjectByProjectId", {}, () => {
	it("should return a project with associated tags when a valid projectId is provided", async () => {
		const mockProjectRows: { rows: ProjectRow[] } = {
			rows: [
				{
					id: 1,
					name: "Project Alpha",
					description: "Test project",
					release_date: "2023-01-01",
					image_url: "http://imgurl/1.png",
					repository_url: "https://github.com/example/project-alpha",
					presentation_url: "https://example.com/project-alpha",
					tag_id: 1,
					tag_name: "JavaScript",
				},
				{
					id: 1,
					name: "Project Alpha",
					description: "Test project",
					release_date: "2023-01-01",
					image_url: "http://imgurl/1.png",
					repository_url: "https://github.com/example/project-alpha",
					presentation_url: "https://example.com/project-alpha",
					tag_id: 2,
					tag_name: "GraphQL",
				},
			],
		};

		const expectedResults: ProjectItem = {
			id: 1,
			name: "Project Alpha",
			description: "Test project",
			releaseDate: "2023-01-01",
			imageURL: "http://imgurl/1.png",
			repositoryURL: "https://github.com/example/project-alpha",
			presentationURL: "https://example.com/project-alpha",
			tags: [
				{ id: 1, name: "JavaScript" },
				{ id: 2, name: "GraphQL" },
			],
		};

		vi.mocked(executeQuery).mockResolvedValue(mockProjectRows as any);

		// Call the function
		const result = await getProjectByProjectId("1");

		// Assert that the result matches the mock data
		expect(result).toEqual(expectedResults);

		expect(executeQuery).toHaveBeenCalledWith(
			expect.stringContaining("SELECT p.*, t.id AS tag_id, t.name AS tag_name"),
			"1"
		);
	});

	it("should return project without tags when project exists but has no associated tags", async () => {
		const projectId = "2";
		const mockProjectRows: { rows: ProjectRow[] } = {
			rows: [
				{
					id: 2,
					name: "Project 2",
					description: "Desc 2",
					release_date: "2023-01-01",
					repository_url: "https://github.com/Project_2",
					presentation_url: null,
					image_url: "http://imgurl/2.png",
					tag_id: null,
					tag_name: null,
				},
			],
		};
		const expectedResult: ProjectItem = {
			id: 2,
			name: "Project 2",
			description: "Desc 2",
			releaseDate: "2023-01-01",
			imageURL: "http://imgurl/2.png",
			repositoryURL: "https://github.com/Project_2",
			presentationURL: undefined,
			tags: [],
		};

		vi.mocked(executeQuery).mockResolvedValue(mockProjectRows as any);

		const result = await getProjectByProjectId(projectId);

		expect(result).toEqual(expectedResult);

		expect(executeQuery).toHaveBeenCalledWith(
			expect.stringContaining("SELECT p.*, t.id AS tag_id, t.name AS tag_name"),
			projectId
		);
	});

	it("should return null when a project is not found", async () => {
		const projectId = "999";
		const mockProjectRows = {
			rows: [],
		};

		vi.mocked(executeQuery).mockResolvedValue(mockProjectRows as any);

		const result = await getProjectByProjectId(projectId);

		expect(result).toBeNull();
		expect(executeQuery).toHaveBeenCalledWith(
			expect.stringContaining("SELECT p.*, t.id AS tag_id, t.name AS tag_name"),
			projectId
		);
	});
});
