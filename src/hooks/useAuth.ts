// src/hooks/useAuth.ts

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };
        setUser({ id: decoded.id, email: decoded.email });
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
    setLoading(false);
  }, []);

  return { user, loading };
};