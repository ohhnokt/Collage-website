export interface BonafideRequest {
  id: string;
  student_id: string;
  student_name: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  document_url: string;
  comments?: string;
  created_at: string;
  updated_at: string;
}

export interface MigrationRequest {
  id: string;
  student_id: string;
  student_name: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  document_url: string;
  comments?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}