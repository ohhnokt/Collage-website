export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  qualification?: string;
  experience?: string;
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  class: string;
  attendance: number;
  feeStatus: 'paid' | 'pending';
}

export interface Teacher extends User {
  role: 'teacher';
  department: string;
  designation: string;
  qualification: string;
  experience: string;
}

export interface BonafideRequest {
  id: string;
  studentId: string;
  studentName: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  documentUrl: string;
  createdAt: Date;
}