import { describe, it, expect, vi, beforeEach } from "vitest";
import { executeQuery } from "../../src/lib/db";
import { getTagList } from "../../src/resolvers/getTagList";
import { TagItem } from "shared_types";

// Mock the client.query method
vi.mock("../../src/lib/db", () => ({
	executeQuery: vi.fn(),
}));

beforeEach(() => {
    vi.mocked(executeQuery).mockReset();
})

describe("getTagList", () => {
	it("should return a list of tags", async () => {
		const mockTagRows = {
			rows: [
				{ id: 1, name: "JavaScript" },
				{ id: 2, name: "GraphQL" },
			],
		};

		const expectedTags: TagItem[] = [
			{ id: 1, name: "JavaScript" },
			{ id: 2, name: "GraphQL" },
		];

		vi.mocked(executeQuery).mockResolvedValue(mockTagRows as any);

		// Call the function
		const result = await getTagList();

		// Assert that the result matches the mock data
		expect(result).toEqual(expectedTags);

		expect(executeQuery).toHaveBeenCalledWith(
			expect.stringContaining("SELECT * FROM tags")
		);
	});

	it("should return an empty list when no tags are found", async () => {
		vi.mocked(executeQuery).mockResolvedValue({ rows: [] } as any);

		// Call the function
		const result = await getTagList();

		// Assert that the result is an empty array
		expect(result).toEqual([]);

		expect(executeQuery).toHaveBeenCalledWith(
			expect.stringContaining("SELECT * FROM tags")
		);
	});
});
