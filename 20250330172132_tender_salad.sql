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
CREATE TABLE IF NOT EXISTS migration_requests (
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

-- Migration Request Policies
CREATE POLICY "Students can create migration requests"
  ON migration_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can view own migration requests"
  ON migration_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view all migration requests"
  ON migration_requests
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'teacher'
  ));

CREATE POLICY "Teachers can update migration requests"
  ON migration_requests
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'teacher'
  ));

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog Post Policies
CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'teacher'
  ));