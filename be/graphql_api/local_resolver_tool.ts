import { getProjectListBySomeTagIds } from "./src/resolvers/getProjectListBySomeTagIds";

async function main() {
	console.log(await getProjectListBySomeTagIds(["1", "3"]));
}

main();
