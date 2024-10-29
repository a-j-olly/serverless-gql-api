export const seedQuery = `
INSERT INTO tags (name) VALUES
('JavaScript'),
('Python'),
('GraphQL'),
('PostgreSQL'),
('Web Development'),
('Data Science'),
('Machine Learning'),
('API Design');

INSERT INTO projects (name, description, release_date, image_url, repository_url, presentation_url) VALUES
('Project Alpha', 'A web development project using JavaScript and GraphQL', '2023-01-15', 'https://picsum.photos/id/1/640/360', 'https://github.com/example/project-alpha', 'https://example.com/project-alpha'),
('Project Beta', 'A data science project focused on machine learning with Python', '2023-02-20', 'https://picsum.photos/id/2/640/360', 'https://github.com/example/project-beta', 'https://example.com/project-beta'),
('Project Gamma', 'A comprehensive API design project using GraphQL and PostgreSQL', '2023-03-10', 'https://picsum.photos/id/3/640/360', 'https://github.com/example/project-gamma', NULL),
('Project Delta', 'An advanced web development project using modern JavaScript frameworks', '2023-04-05', 'https://picsum.photos/id/4/640/360', 'https://github.com/example/project-delta', 'https://example.com/project-delta');

-- Project Alpha: Associated with 'JavaScript', 'GraphQL', 'Web Development'
INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Alpha' AND t.name = 'JavaScript';

INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Alpha' AND t.name = 'GraphQL';

INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Alpha' AND t.name = 'Web Development';

-- Project Beta: Associated with 'Python', 'Data Science', 'Machine Learning'
INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Beta' AND t.name = 'Python';

INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Beta' AND t.name = 'Data Science';

INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Beta' AND t.name = 'Machine Learning';

-- Project Gamma: Associated with 'GraphQL', 'PostgreSQL', 'API Design'
INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Gamma' AND t.name = 'GraphQL';

INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Gamma' AND t.name = 'PostgreSQL';

INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Gamma' AND t.name = 'API Design';

-- Project Delta: Associated with 'JavaScript', 'Web Development'
INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Delta' AND t.name = 'JavaScript';

INSERT INTO project_tags (project_id, tag_id) 
SELECT p.id, t.id FROM projects p, tags t WHERE p.name = 'Project Delta' AND t.name = 'Web Development';
`;
