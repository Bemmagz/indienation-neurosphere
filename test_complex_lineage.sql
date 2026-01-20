-- Clear previous test data
DELETE FROM citizens WHERE id LIKE 'Gen_Test_%';

-- Create 4 generations
INSERT INTO citizens (id, current_aura, inherited_from) VALUES
    ('Gen_Test_Founder', 100, NULL),
    ('Gen_Test_Child_1', 80, 'Gen_Test_Founder'),
    ('Gen_Test_Child_2', 70, 'Gen_Test_Founder'),
    ('Gen_Test_Grandchild_1', 60, 'Gen_Test_Child_1'),
    ('Gen_Test_Grandchild_2', 65, 'Gen_Test_Child_1'),
    ('Gen_Test_GreatGrandchild', 50, 'Gen_Test_Grandchild_1');
