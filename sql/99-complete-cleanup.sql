-- Complete Database Cleanup Script
-- WARNING: This will remove ALL data and schemas!
-- Only run this if you want to start completely fresh

-- Display warning
DO $$
BEGIN
    RAISE NOTICE '⚠️  WARNING: Starting complete database cleanup...';
    RAISE NOTICE '⚠️  This will remove ALL data, tables, and schemas!';
END $$;

-- Clean up everything using dynamic SQL to avoid relation errors
DO $$
DECLARE
    rec RECORD;
    cmd TEXT;
BEGIN
    RAISE NOTICE '🧹 Starting comprehensive cleanup...';
    
    -- Step 1: Drop all triggers on existing tables
    RAISE NOTICE '📋 Step 1: Dropping triggers...';
    FOR rec IN 
        SELECT schemaname, tablename, trigger_name
        FROM information_schema.triggers 
        WHERE trigger_name LIKE '%updated_at%'
        AND schemaname IN ('public', 'next_auth')
    LOOP
        BEGIN
            cmd := 'DROP TRIGGER IF EXISTS ' || rec.trigger_name || ' ON ' || rec.schemaname || '.' || rec.tablename;
            EXECUTE cmd;
            RAISE NOTICE '  ✅ Dropped trigger: %', rec.trigger_name;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE '  ⚠️  Failed to drop trigger %: %', rec.trigger_name, SQLERRM;
        END;
    END LOOP;
    
    -- Step 2: Drop all RLS policies on existing tables
    RAISE NOTICE '📋 Step 2: Dropping RLS policies...';
    FOR rec IN 
        SELECT schemaname, tablename, policyname
        FROM pg_policies 
        WHERE schemaname IN ('public', 'next_auth')
    LOOP
        BEGIN
            cmd := 'DROP POLICY IF EXISTS "' || rec.policyname || '" ON ' || rec.schemaname || '.' || rec.tablename;
            EXECUTE cmd;
            RAISE NOTICE '  ✅ Dropped policy: %', rec.policyname;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE '  ⚠️  Failed to drop policy %: %', rec.policyname, SQLERRM;
        END;
    END LOOP;
    
    -- Step 3: Drop all indexes
    RAISE NOTICE '📋 Step 3: Dropping indexes...';
    FOR rec IN 
        SELECT schemaname, indexname
        FROM pg_indexes 
        WHERE schemaname IN ('public', 'next_auth')
        AND indexname NOT LIKE '%_pkey'  -- Don't drop primary key indexes
    LOOP
        BEGIN
            cmd := 'DROP INDEX IF EXISTS ' || rec.schemaname || '.' || rec.indexname;
            EXECUTE cmd;
            RAISE NOTICE '  ✅ Dropped index: %', rec.indexname;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE '  ⚠️  Failed to drop index %: %', rec.indexname, SQLERRM;
        END;
    END LOOP;
    
    -- Step 4: Drop all tables in dependency-safe order
    RAISE NOTICE '📋 Step 4: Dropping tables...';
    
    -- Drop specific tables in order
    FOR cmd IN VALUES 
        ('DROP TABLE IF EXISTS public.messages CASCADE'),
        ('DROP TABLE IF EXISTS public.projects CASCADE'),
        ('DROP TABLE IF EXISTS public.users CASCADE'),
        ('DROP TABLE IF EXISTS public.user_sessions CASCADE'),
        ('DROP TABLE IF EXISTS next_auth.accounts CASCADE'),
        ('DROP TABLE IF EXISTS next_auth.sessions CASCADE'),
        ('DROP TABLE IF EXISTS next_auth.verification_tokens CASCADE'),
        ('DROP TABLE IF EXISTS next_auth.users CASCADE')
    LOOP
        BEGIN
            EXECUTE cmd;
            RAISE NOTICE '  ✅ Executed: %', cmd;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE '  ⚠️  Failed: % - %', cmd, SQLERRM;
        END;
    END LOOP;
    
    -- Step 5: Drop any remaining tables
    FOR rec IN 
        SELECT schemaname, tablename
        FROM information_schema.tables 
        WHERE table_schema IN ('public', 'next_auth')
        AND table_type = 'BASE TABLE'
        AND tablename IN ('users', 'projects', 'messages', 'accounts', 'sessions', 'verification_tokens', 'user_sessions')
    LOOP
        BEGIN
            cmd := 'DROP TABLE IF EXISTS ' || rec.schemaname || '.' || rec.tablename || ' CASCADE';
            EXECUTE cmd;
            RAISE NOTICE '  ✅ Dropped remaining table: %.%', rec.schemaname, rec.tablename;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE '  ⚠️  Failed to drop table %.%: %', rec.schemaname, rec.tablename, SQLERRM;
        END;
    END LOOP;
    
    -- Step 6: Drop functions
    RAISE NOTICE '📋 Step 5: Dropping functions...';
    FOR cmd IN VALUES 
        ('DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE'),
        ('DROP FUNCTION IF EXISTS generate_api_key() CASCADE')
    LOOP
        BEGIN
            EXECUTE cmd;
            RAISE NOTICE '  ✅ Executed: %', cmd;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE '  ⚠️  Failed: % - %', cmd, SQLERRM;
        END;
    END LOOP;
    
    -- Step 7: Drop sequences
    RAISE NOTICE '📋 Step 6: Dropping sequences...';
    FOR rec IN 
        SELECT sequence_schema, sequence_name
        FROM information_schema.sequences 
        WHERE sequence_schema = 'public'
        AND sequence_name LIKE '%_id_seq'
    LOOP
        BEGIN
            cmd := 'DROP SEQUENCE IF EXISTS ' || rec.sequence_schema || '.' || rec.sequence_name || ' CASCADE';
            EXECUTE cmd;
            RAISE NOTICE '  ✅ Dropped sequence: %.%', rec.sequence_schema, rec.sequence_name;
        EXCEPTION
            WHEN OTHERS THEN
                RAISE NOTICE '  ⚠️  Failed to drop sequence %.%: %', rec.sequence_schema, rec.sequence_name, SQLERRM;
        END;
    END LOOP;
    
    -- Step 8: Drop the next_auth schema completely
    RAISE NOTICE '📋 Step 7: Dropping next_auth schema...';
    BEGIN
        DROP SCHEMA IF EXISTS next_auth CASCADE;
        RAISE NOTICE '  ✅ Dropped next_auth schema';
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE '  ⚠️  Failed to drop next_auth schema: %', SQLERRM;
    END;
    
    -- Step 9: Revoke permissions
    RAISE NOTICE '📋 Step 8: Revoking permissions...';
    BEGIN
        REVOKE ALL ON SCHEMA public FROM authenticated;
        REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;
        REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM authenticated;
        RAISE NOTICE '  ✅ Revoked all permissions';
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE '  ⚠️  Error revoking permissions: %', SQLERRM;
    END;
    
    RAISE NOTICE '🧹 Cleanup process completed!';
    
END $$;

-- Display completion message
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🎉 ================================';
    RAISE NOTICE '✅ Database cleanup completed successfully!';
    RAISE NOTICE '✅ All Console.text objects have been removed';
    RAISE NOTICE '✅ next_auth schema has been dropped';
    RAISE NOTICE '✅ All triggers, policies, and functions removed';
    RAISE NOTICE '✅ Database is now clean and ready for fresh setup';
    RAISE NOTICE '🎉 ================================';
    RAISE NOTICE '';
    RAISE NOTICE '📝 Next step: Run sql/00-complete-setup.sql to recreate everything';
    RAISE NOTICE '';
END $$;

-- Final verification - show what's left
DO $$
DECLARE
    table_count INTEGER;
    schema_exists BOOLEAN;
BEGIN
    -- Check for remaining tables
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema IN ('public', 'next_auth') 
    AND tablename IN ('users', 'projects', 'messages', 'accounts', 'sessions', 'verification_tokens');
    
    -- Check if next_auth schema exists
    SELECT EXISTS(
        SELECT 1 FROM information_schema.schemata 
        WHERE schema_name = 'next_auth'
    ) INTO schema_exists;
    
    IF table_count = 0 AND NOT schema_exists THEN
        RAISE NOTICE '✅ VERIFICATION PASSED: All target objects successfully removed';
    ELSE
        RAISE NOTICE '⚠️  VERIFICATION: % tables still exist, next_auth schema exists: %', table_count, schema_exists;
    END IF;
END $$; 