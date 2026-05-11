import { useEffect, useState } from "react"


export const useAutenticacion = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, [localStorage.getItem('token')]); 

  return { token };
};