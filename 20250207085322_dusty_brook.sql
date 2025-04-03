/*
  # Bonafide Request System Schema

  1. New Tables
    - `bonafide_requests`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references auth.users)
      - `student_name` (text)
      - `purpose` (text)
      - `status` (text)
      - `document_url` (text)
      - `comments` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `bonafide_requests` table
    - Add policies for:
      - Students to create and read their own requests
      - Teachers to read all requests and update status/comments
*/

CREATE TABLE IF NOT EXISTS bonafide_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES auth.users(id),
  student_name text NOT NULL,
  purpose text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  document_url text,
  comments text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bonafide_requests ENABLE ROW LEVEL SECURITY;

-- Policy for students to create requests
CREATE POLICY "Students can create requests"
  ON bonafide_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

-- Policy for students to view their own requests
CREATE POLICY "Students can view own requests"
  ON bonafide_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

-- Policy for teachers to view all requests
CREATE POLICY "Teachers can view all requests"
  ON bonafide_requests
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'teacher'
  ));

-- Policy for teachers to update requests
CREATE POLICY "Teachers can update requests"
  ON bonafide_requests
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'teacher'
  ));