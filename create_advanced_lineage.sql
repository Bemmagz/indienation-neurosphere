-- Create a branching lineage system
INSERT OR IGNORE INTO citizens (id, current_aura, inherited_from) VALUES
    ('Alpha_Founder', 100, NULL),
    ('Beta_Heir_1', 75, 'Alpha_Founder'),
    ('Beta_Heir_2', 70, 'Alpha_Founder'),
    ('Gamma_Heir_A1', 60, 'Beta_Heir_1'),
    ('Gamma_Heir_A2', 65, 'Beta_Heir_1'),
    ('Gamma_Heir_B1', 55, 'Beta_Heir_2'),
    ('Delta_Final_A', 50, 'Gamma_Heir_A1'),
    ('Delta_Final_B', 45, 'Gamma_Heir_A2'),
    ('Delta_Final_C', 40, 'Gamma_Heir_B1');
