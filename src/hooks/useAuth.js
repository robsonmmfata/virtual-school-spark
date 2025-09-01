import { useState, useEffect } from 'react';
import { authAPI } from '../lib/api.js';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar se usuário está logado ao carregar
  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  // Função de login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const userData = await authAPI.login(email, password);

      // Salvar no localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  // Verificar se usuário tem determinado tipo
  const hasRole = (role) => {
    return user && user.tipo === role;
  };

  // Verificar se está autenticado
  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    loading,
    login,
    logout,
    hasRole,
    isAuthenticated,
  };
};
