/*
  # Migration Certificate and Blog System Schema

  1. New Tables
    - `migration_requests`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references auth.users)
      - `student_name` (text)
      - `reason` (text)
      - `status` (text)
      - `document_url` (text)
      - `comments` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (text)
      - `author_id` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for:
      - Students to create and read migration requests
      - Teachers to manage migration requests and blog posts
      - Public to read blog posts
*/

-- Migration Requests Table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'migration_requests') THEN
    CREATE TABLE migration_requests (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      student_id uuid REFERENCES auth.users(id),
      student_name text NOT NULL,
      reason text NOT NULL,
      status text NOT NULL DEFAULT 'pending',
      document_url text,
      comments text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    ALTER TABLE migration_requests ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Migration Request Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'migration_requests' AND policyname = 'Students can create migration requests') THEN
    CREATE POLICY "Students can create migration requests"
      ON migration_requests
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = student_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'migration_requests' AND policyname = 'Students can view own migration requests') THEN
    CREATE POLICY "Students can view own migration requests"
      ON migration_requests
      FOR SELECT
      TO authenticated
      USING (auth.uid() = student_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'migration_requests' AND policyname = 'Teachers can view all migration requests') THEN
    CREATE POLICY "Teachers can view all migration requests"
      ON migration_requests
      FOR SELECT
      TO authenticated
      USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'teacher'
      ));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'migration_requests' AND policyname = 'Teachers can update migration requests') THEN
    CREATE POLICY "Teachers can update migration requests"
      ON migration_requests
      FOR UPDATE
      TO authenticated
      USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'teacher'
      ));
  END IF;
END $$;

-- Blog Posts Table
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'blog_posts') THEN
    CREATE TABLE blog_posts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      content text NOT NULL,
      category text NOT NULL,
      author_id uuid REFERENCES auth.users(id),
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Blog Post Policies
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Anyone can read blog posts') THEN
    CREATE POLICY "Anyone can read blog posts"
      ON blog_posts
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Teachers can manage blog posts') THEN
    CREATE POLICY "Teachers can manage blog posts"
      ON blog_posts
      FOR ALL
      TO authenticated
      USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'teacher'
      ));
  END IF;
END $$;