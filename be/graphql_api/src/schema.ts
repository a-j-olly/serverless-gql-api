export const typeDefs = `#graphql
type Tag {
	id: ID!
	name: String!
}

type Project {
	id: ID!
	name: String!
	description: String!
	releaseDate: String!
	imageURL: String!
	repositoryURL: String!
	presentationURL: String
	tags: [Tag]!
}

type Query {
	getProjectList: [Project]!
	getProjectListBySomeTagIds(tagIds: [ID]!): [Project]!
	getProjectListByAllTagIds(tagIds: [ID]!): [Project]!
	getProjectByProjectId(projectId: ID!): Project
	getTagList: [Tag]!
}
`;
