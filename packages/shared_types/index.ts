export type ProjectRow = {
	id: number;
	name: string;
	description: string;
	release_date: string;
	image_url: string;
	repository_url: string ;
	presentation_url: string | null;
	tag_id: number | null;
	tag_name: string | null;
  }

export type ProjectItem = {
	id: ID;
	name: string;
	description: string;
	releaseDate: string;
	imageURL: string;
	repositoryURL: string;
	presentationURL?: string
	tags: TagItem[];
};

export type TagItem = {
	id: ID;
	name: string;
};

export type Query = {
	getProjectList: ProjectItem[];
	getProjectListByTagIds(tagIds: ID[]): ProjectItem[];
	getProjectByProjectId(projectId: ID): ProjectItem | null;
	getTagList: TagItem[];
};

export type ID = string | number;
