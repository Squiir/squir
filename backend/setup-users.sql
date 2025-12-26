-- 🔧 Script de Setup des Utilisateurs et Bars
-- Exécuter avec: psql -d app -f setup-users.sql

BEGIN;

-- 1️⃣ Mettre poe, romain, dydou, maxence en ADMIN
UPDATE "User"
SET role = 'ADMIN',
    "barId" = NULL
WHERE username IN ('poe', 'romain', 'dydou', 'maxence');

-- 2️⃣ Récupérer les IDs des 2 premiers bars pour les bar_staff
DO $$
DECLARE
    bar1_id UUID;
    bar2_id UUID;
BEGIN
    -- Récupérer les 2 premiers bars
    SELECT id INTO bar1_id FROM "Bar" ORDER BY name LIMIT 1;
    SELECT id INTO bar2_id FROM "Bar" ORDER BY name LIMIT 1 OFFSET 1;

    -- Mettre à jour ou créer bar_staff1 pour bar1
    INSERT INTO "User" (
        id, email, username, password, "birthDate", role, "barId", "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid(),
        'barstaff1@test.com',
        'barstaff1',
        '$2b$10$rJ7qZ5vKZ0QxKZ5vKZ5vKuO7qJ7qZ5vKZ5vKZ5vKZ5vKZ5vKZ5vK.',  -- password: "password123"
        '1990-01-01',
        'BAR_STAFF',
        bar1_id,
        NOW(),
        NOW()
    )
    ON CONFLICT (email) DO UPDATE SET
        role = 'BAR_STAFF',
        "barId" = bar1_id;

    -- Mettre à jour ou créer barstaff2 pour bar2
    INSERT INTO "User" (
        id, email, username, password, "birthDate", role, "barId", "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid(),
        'barstaff2@test.com',
        'barstaff2',
        '$2b$10$rJ7qZ5vKZ0QxKZ5vKZ5vKuO7qJ7qZ5vKZ5vKZ5vKZ5vKZ5vKZ5vK.',  -- password: "password123"
        '1990-01-01',
        'BAR_STAFF',
        bar2_id,
        NOW(),
        NOW()
    )
    ON CONFLICT (email) DO UPDATE SET
        role = 'BAR_STAFF',
        "barId" = bar2_id;
END $$;

-- 3️⃣ Créer ou mettre à jour customer de test
INSERT INTO "User" (
    id, email, username, password, "birthDate", role, "barId", "createdAt", "updatedAt"
) VALUES (
    gen_random_uuid(),
    'customer@test.com',
    'customer',
    '$2b$10$rJ7qZ5vKZ0QxKZ5vKZ5vKuO7qJ7qZ5vKZ5vKZ5vKZ5vKZ5vKZ5vK.',  -- password: "password123"
    '2000-01-01',
    'CUSTOMER',
    NULL,
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE SET
    role = 'CUSTOMER',
    "barId" = NULL;

COMMIT;

-- ✅ Afficher le résumé
SELECT
    username,
    email,
    role,
    CASE
        WHEN "barId" IS NOT NULL THEN (SELECT name FROM "Bar" WHERE id = "User"."barId")
        ELSE 'N/A'
    END as bar_name
FROM "User"
WHERE username IN ('poe', 'romain', 'dydou', 'maxence', 'barstaff1', 'barstaff2', 'customer')
ORDER BY role DESC, username;
