import { TagItem } from "shared_types";
import { executeQuery } from "../lib/db";

export async function getTagList(): Promise<TagItem[]> {
	const result = await executeQuery(`SELECT * FROM tags`);

	if (result.rows.length === 0) return [];

	return result.rows;
}
