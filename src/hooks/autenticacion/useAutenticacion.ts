import { useAuth } from '../../contexto/contextoAutenticacion';

export const useAutenticacion = () => {
  const { token } = useAuth();
  return { token };
};