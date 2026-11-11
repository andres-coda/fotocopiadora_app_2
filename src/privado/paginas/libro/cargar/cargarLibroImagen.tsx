import { ChangeEvent, ClipboardEvent, useEffect, useRef, useState } from 'react';
import {
  Control,
  FieldError,
  FieldErrors,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import Input from '../../../../componente/formulario/input';
import Texto from '../../../../componente-estilo/texto/texto';
import Boton from '../../../../componente-estilo/boton/boton';
import useApi from '../../../../servicio/hooks/useApi';
import { httpMethod } from '../../../../modelo/HTTP/HttpMethod.enum';
import { IMG_SUBIR } from '../../../../utils/endpoint';
import { libroDatosExtras } from '../../../../modelo/Entidades/libro/esqLibro.esquema';
import './cargarLibroImagen.css';

interface Prop<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<T>;
}

interface ImgSubirResponse {
  imageUrl: string;
}

const MAX_BYTES = 5 * 1024 * 1024;

const CargarLibroImagen = <T extends FieldValues>({ control, errors, setValue }: Prop<T>) => {
  const name = 'img' as Path<T>;
  const { fetchData, response, loading, errorFetch } = useApi<ImgSubirResponse>({});
  const [localError, setLocalError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const valor = (useWatch({ control, name }) as string | undefined) ?? '';
  const imgError = (errors as Record<string, FieldError | undefined>).img;
  const error = localError || errorFetch;

  useEffect(() => {
    if (response?.imageUrl) {
      setValue(name, response.imageUrl as FieldPathValue<T, Path<T>>, { shouldValidate: true });
    }
  }, [response, setValue, name]);

  const procesarArchivo = (file?: File | null) => {
    if (!file) return;
    setLocalError(null);
    if (!file.type.startsWith('image/')) {
      setLocalError('El archivo debe ser una imagen');
      return;
    }
    if (file.size > MAX_BYTES) {
      setLocalError('La imagen supera los 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    fetchData({
      url: IMG_SUBIR,
      methodo: httpMethod.POST,
      bodyData: formData,
    });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    procesarArchivo(e.target.files?.[0]);
    e.target.value = '';
  };

  const onPaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'));
    if (!item) return;
    e.preventDefault();
    procesarArchivo(item.getAsFile());
  };

  return (
    <div className="cargar-libro-imagen" onPaste={onPaste}>
      <Input<T>
        name={name}
        control={control}
        label="Url de imagen"
        tipo="text"
        error={imgError}
        esquema={libroDatosExtras}
      />

      <div className="cargar-libro-imagen-acciones">
        <Boton
          texto={loading ? 'Subiendo...' : 'Subir imagen'}
          secundario
          onClick={() => fileRef.current?.click()}
        />
        <span className="cargar-libro-imagen-hint">o pegá una imagen (Ctrl+V)</span>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileChange} />
      </div>

      {error && <Texto texto={error} error />}

      {valor ? (
        <img src={valor} alt="Vista previa" className="cargar-libro-imagen-preview" />
      ) : null}
    </div>
  );
};

export default CargarLibroImagen;
