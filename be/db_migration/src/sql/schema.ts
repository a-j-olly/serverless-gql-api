export const createSchemaQuery = `
-- Create Projects table only if it doesn't exist
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    release_date DATE NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    repository_url VARCHAR(255) NOT NULL,
    presentation_url VARCHAR(255)
);

-- Create Tags table only if it doesn't exist
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the project_tags relationship table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_tags (
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

-- Create necessary indexes if they don't already exist
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_project_tags_project_id') THEN
        CREATE INDEX idx_project_tags_project_id ON project_tags(project_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_project_tags_tag_id') THEN
        CREATE INDEX idx_project_tags_tag_id ON project_tags(tag_id);
    END IF;
END $$;
`;
