-- Insert sample skills
INSERT INTO skills (name, category) VALUES
('JavaScript', 'Programming'),
('Python', 'Programming'),
('React', 'Programming'),
('Node.js', 'Programming'),
('Photoshop', 'Design'),
('Illustrator', 'Design'),
('Figma', 'Design'),
('Excel', 'Business'),
('PowerPoint', 'Business'),
('Guitar', 'Music'),
('Piano', 'Music'),
('Spanish', 'Language'),
('French', 'Language'),
('Cooking', 'Lifestyle'),
('Photography', 'Creative'),
('Video Editing', 'Creative'),
('Marketing', 'Business'),
('Writing', 'Creative'),
('Yoga', 'Fitness'),
('Personal Training', 'Fitness')
ON CONFLICT (name) DO NOTHING;

-- Insert sample users
INSERT INTO users (name, email, location, availability, is_public) VALUES
('Alice Johnson', 'alice@example.com', 'New York, NY', 'Weekends, Evenings after 6pm', true),
('Bob Smith', 'bob@example.com', 'San Francisco, CA', 'Weekdays 9am-5pm', true),
('Carol Davis', 'carol@example.com', 'Austin, TX', 'Flexible schedule', true),
('David Wilson', 'david@example.com', 'Seattle, WA', 'Weekends only', false),
('Emma Brown', 'emma@example.com', 'Chicago, IL', 'Evenings and weekends', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample user skills offered
INSERT INTO user_skills_offered (user_id, skill_id, proficiency_level) VALUES
(1, 1, 'advanced'), -- Alice offers JavaScript
(1, 3, 'intermediate'), -- Alice offers React
(2, 2, 'expert'), -- Bob offers Python
(2, 8, 'advanced'), -- Bob offers Excel
(3, 5, 'expert'), -- Carol offers Photoshop
(3, 14, 'intermediate'), -- Carol offers Cooking
(4, 10, 'advanced'), -- David offers Guitar
(5, 15, 'expert') -- Emma offers Photography
ON CONFLICT (user_id, skill_id) DO NOTHING;

-- Insert sample user skills wanted
INSERT INTO user_skills_wanted (user_id, skill_id, urgency_level) VALUES
(1, 5, 'high'), -- Alice wants Photoshop
(1, 12, 'medium'), -- Alice wants Spanish
(2, 3, 'high'), -- Bob wants React
(3, 1, 'medium'), -- Carol wants JavaScript
(4, 15, 'low'), -- David wants Photography
(5, 10, 'high') -- Emma wants Guitar
ON CONFLICT (user_id, skill_id) DO NOTHING;

-- Insert sample swap requests
INSERT INTO swap_requests (requester_id, provider_id, requested_skill_id, offered_skill_id, status, message) VALUES
(1, 3, 5, 1, 'pending', 'Hi Carol! I would love to learn Photoshop from you. I can teach you JavaScript in return.'),
(2, 1, 3, 2, 'accepted', 'Hey Alice! I am interested in learning React. I can help you with Python.'),
(5, 4, 10, 15, 'pending', 'Hi David! I would like to learn guitar. I can teach you photography in exchange.')
ON CONFLICT DO NOTHING;
