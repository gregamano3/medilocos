'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Account } from '@/components/Account';
import { Login } from '@/components/Login';

interface AccountHandlerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountHandler({ isOpen, onClose }: AccountHandlerProps) {
  const { state } = useAuth();

  if (state.isAuthenticated) {
    return <Account isOpen={isOpen} onClose={onClose} />;
  }

  return <Login isOpen={isOpen} onClose={onClose} />;
}