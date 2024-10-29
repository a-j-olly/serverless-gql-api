export const dropQuery = `
-- Drop indexes explicitly (optional, as they are dropped with tables)
DROP INDEX IF EXISTS idx_project_tags_project_id;
DROP INDEX IF EXISTS idx_project_tags_tag_id;

-- Drop the tables
DROP TABLE IF EXISTS project_tags CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
`;
