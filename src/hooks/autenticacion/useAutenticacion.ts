import { useAuth } from '../../contexto/contextoAutenticacion';

export const useAutenticacion = () => {
  const { token, logout } = useAuth();
  return { token, logout };
};