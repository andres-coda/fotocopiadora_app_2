import { useState } from 'react';
import { useAutenticacion } from '../../hooks/autenticacion/useAutenticacion';
import { IMG_SUBIR } from '../../utils/endpoint';

interface ImgSubirResponse {
  imageUrl: string;
}

const useImgSubirApi = () => {
  const { token } = useAutenticacion();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const subirImagen = async (file: File): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);

      // No se setea Content-Type: el navegador agrega el boundary de multipart.
      const res = await fetch(IMG_SUBIR, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!res.ok) {
        let message = 'No se pudo subir la imagen';
        try {
          const data = await res.json();
          message = data?.message || message;
        } catch {
          // La respuesta de error no era JSON.
        }
        throw new Error(message);
      }

      const data: ImgSubirResponse = await res.json();
      if (!data?.imageUrl) throw new Error('La respuesta no trajo la URL de la imagen');
      return data.imageUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al subir la imagen');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { subirImagen, loading, error };
};

export default useImgSubirApi;
