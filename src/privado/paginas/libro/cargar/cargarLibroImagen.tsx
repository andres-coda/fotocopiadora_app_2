import { ChangeEvent, ClipboardEvent, useRef, useState } from 'react';
import { Control, FieldErrors, FieldValues, Path, useController } from 'react-hook-form';

import Texto from '../../../../componente-estilo/texto/texto';
import Boton from '../../../../componente-estilo/boton/boton';
import useInput from '../../../../componente/formulario/hook/useInput';
import useImgSubirApi from '../../../../servicio/libro/useImgSubirApi';
import './cargarLibroImagen.css';

interface Prop<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<FieldValues>;
}

const MAX_BYTES = 5 * 1024 * 1024;

const CargarLibroImagen = <T extends FieldValues>({ control, errors }: Prop<T>) => {
  const name = 'img' as Path<T>;
  const { field } = useController({ control, name });
  const { subirImagen, loading } = useImgSubirApi();
  const [localError, setLocalError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const imgError = (errors as Record<string, { message?: string } | undefined>).img;
  const error = localError || (typeof imgError?.message === 'string' ? imgError.message : null);
  const { claseInput, claseInputCompleto } = useInput({ hayError: !!error });

  const valor = typeof field.value === 'string' ? field.value : '';

  const procesarArchivo = async (file?: File | null) => {
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
    const url = await subirImagen(file);
    if (url) field.onChange(url);
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
      <div className={claseInputCompleto}>
        <span />
        <div className={claseInput}>
          <input
            id="img"
            type="text"
            placeholder=" "
            autoComplete="off"
            value={valor}
            onChange={e => field.onChange(e.target.value)}
            onBlur={field.onBlur}
          />
          <label htmlFor="img">Url de imagen</label>
        </div>
        <span>{error && <Texto texto={error} error />}</span>
      </div>

      <div className="cargar-libro-imagen-acciones">
        <Boton
          texto={loading ? 'Subiendo...' : 'Subir imagen'}
          secundario
          onClick={() => fileRef.current?.click()}
        />
        <span className="cargar-libro-imagen-hint">o pegá una imagen (Ctrl+V)</span>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileChange} />
      </div>

      {valor ? (
        <img src={valor} alt="Vista previa" className="cargar-libro-imagen-preview" />
      ) : null}
    </div>
  );
};

export default CargarLibroImagen;
