-- Simulate aura inheritance from Founder to Child
SELECT 
    f.id as Founder,
    c.id as Heir,
    f.current_aura as Founder_Aura,
    c.current_aura as Heir_Aura,
    ROUND(f.current_aura * 0.7, 1) as "70%_Inheritance",
    CASE 
        WHEN c.current_aura >= ROUND(f.current_aura * 0.7, 1) 
        THEN '✅ Valid Inheritance'
        ELSE '⚠️  Below Standard'
    END as Status
FROM citizens f
JOIN citizens c ON c.inherited_from = f.id
WHERE f.current_aura IS NOT NULL 
AND c.current_aura IS NOT NULL
AND f.id = 'Gen_Test_Founder';
