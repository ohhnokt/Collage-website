import React, { createContext, useContext, useState } from 'react';
import { User, Student, Teacher } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher') => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
  rollNumber?: string;
  class?: string;
  department?: string;
  designation?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signup = async (data: SignupData) => {
    // In a real application, you would make an API call to create the user
    // For now, we'll simulate the API call and store the user data
    const newUser: Student | Teacher = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      email: data.email,
      role: data.role,
      ...(data.role === 'student'
        ? {
            rollNumber: data.rollNumber || '',
            class: data.class || '',
            attendance: 0,
            feeStatus: 'pending',
          }
        : {
            department: data.department || '',
            designation: data.designation || '',
          }),
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real application, you would store this in your backend
    localStorage.setItem(`user_${newUser.email}`, JSON.stringify(newUser));
  };

  const login = async (email: string, password: string, role: 'student' | 'teacher') => {
    // In a real application, you would validate credentials against your backend
    // For now, we'll check if the user exists in localStorage
    const savedUser = localStorage.getItem(`user_${email}`);
    if (!savedUser) {
      throw new Error('User not found');
    }

    const user = JSON.parse(savedUser);
    if (user.role !== role) {
      throw new Error('Invalid role');
    }

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}