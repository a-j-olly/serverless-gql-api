import { describe, it, expect, vi, beforeEach } from "vitest";
import { executeQuery } from "../src/lib/db";
import { handler } from "../src";
import { QueryResult } from "pg";

import getProjectListInputJSON from "./__fixtures__/input_e2e_getProjectList.json";
import getProjectListPGJSON from "./__fixtures__/pg_e2e_getProjectList.json";
import getProjectListOutputJSON from "./__fixtures__/output_e2e_getProjectList.json";

import getProjectListByAllTagIdsInputJSON from "./__fixtures__/input_e2e_getProjectListByAllTagIds.json";
import getProjectListByAllTagIdsPGJSON from "./__fixtures__/pg_e2e_getProjectListByAllTagIds.json";
import getProjectListByAllTagIdsOutputJSON from "./__fixtures__/output_e2e_getProjectListByAllTagIds.json";


vi.mock("../src/lib/db", () => ({
	executeQuery: vi.fn(),
}));

beforeEach(() => {
	vi.mocked(executeQuery).mockReset();
});

describe("index", () => {
	it("should handle the getProjectList graphQL query", async () => {
		const input = getProjectListInputJSON;
		const mockPGResponse = getProjectListPGJSON;
		const expectedResult = getProjectListOutputJSON;

		vi.mocked(executeQuery).mockResolvedValueOnce(
			mockPGResponse as unknown as QueryResult<any>
		);

		let result = await handler(input);

		expect(result).toStrictEqual(expectedResult);
	});

	it("should handle the getProjectListByAllTagIds graphQL query", async () => {
		const input = getProjectListByAllTagIdsInputJSON;
		const mockPGResponse = getProjectListByAllTagIdsPGJSON;
		const expectedResult = getProjectListByAllTagIdsOutputJSON;

		vi.mocked(executeQuery).mockResolvedValueOnce(
			mockPGResponse as unknown as QueryResult<any>
		);

		let result = await handler(input);

		expect(result).toStrictEqual(expectedResult);
	});
});
