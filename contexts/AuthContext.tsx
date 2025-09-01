'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  insurance: {
    provider: string;
    memberId: string;
    groupNumber: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    autoRefill: boolean;
  };
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    prescription?: boolean;
  }>;
  total: number;
  shippingAddress: string;
  trackingNumber?: string;
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  quantity: number;
  refillsRemaining: number;
  prescribedBy: string;
  dateIssued: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'cancelled';
  instructions: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  prescriptions: Prescription[];
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  addOrder: (order: Order) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-06-15',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
  },
  insurance: {
    provider: 'Blue Cross Blue Shield',
    memberId: 'BC123456789',
    groupNumber: 'GRP001',
  },
  emergencyContact: {
    name: 'Jane Doe',
    phone: '(555) 987-6543',
    relationship: 'Spouse',
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    autoRefill: true,
  },
};

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2025-01-10',
    status: 'delivered',
    items: [
      { id: '1', name: 'Ibuprofen 200mg', quantity: 1, price: 12.99 },
      { id: '4', name: 'Omega-3 Fish Oil', quantity: 1, price: 22.99 },
    ],
    total: 35.98,
    shippingAddress: '123 Main St, Anytown, CA 12345',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD002',
    date: '2025-01-05',
    status: 'shipped',
    items: [
      { id: '3', name: 'Lisinopril 10mg', quantity: 1, price: 25.00, prescription: true },
    ],
    total: 25.00,
    shippingAddress: '123 Main St, Anytown, CA 12345',
    trackingNumber: 'TRK987654321',
  },
];

const mockPrescriptions: Prescription[] = [
  {
    id: 'RX001',
    medicationName: 'Lisinopril 10mg',
    dosage: '10mg once daily',
    quantity: 30,
    refillsRemaining: 5,
    prescribedBy: 'Dr. Smith',
    dateIssued: '2024-12-15',
    expiryDate: '2025-12-15',
    status: 'active',
    instructions: 'Take with or without food. Monitor blood pressure regularly.',
  },
  {
    id: 'RX002',
    medicationName: 'Metformin 500mg',
    dosage: '500mg twice daily',
    quantity: 60,
    refillsRemaining: 2,
    prescribedBy: 'Dr. Johnson',
    dateIssued: '2024-11-20',
    expiryDate: '2025-11-20',
    status: 'active',
    instructions: 'Take with meals to reduce stomach upset.',
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    orders: [],
    prescriptions: [],
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'john.doe@email.com' && password === 'password') {
      setState({
        user: mockUser,
        isAuthenticated: true,
        orders: mockOrders,
        prescriptions: mockPrescriptions,
      });
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      dateOfBirth: userData.dateOfBirth || '',
      address: userData.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      insurance: userData.insurance || {
        provider: '',
        memberId: '',
        groupNumber: '',
      },
      emergencyContact: userData.emergencyContact || {
        name: '',
        phone: '',
        relationship: '',
      },
      preferences: userData.preferences || {
        emailNotifications: true,
        smsNotifications: false,
        autoRefill: false,
      },
    };

    setState({
      user: newUser,
      isAuthenticated: true,
      orders: [],
      prescriptions: [],
    });
    return true;
  };

  const logout = () => {
    setState({
      user: null,
      isAuthenticated: false,
      orders: [],
      prescriptions: [],
    });
  };

  const updateProfile = (userData: Partial<User>) => {
    if (state.user) {
      setState(prev => ({
        ...prev,
        user: { ...prev.user!, ...userData },
      }));
    }
  };

  const addOrder = (order: Order) => {
    setState(prev => ({
      ...prev,
      orders: [order, ...prev.orders],
    }));
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, updateProfile, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};