import Boton from '../../componente-estilo/boton/boton';
import './input.css';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface InputBuscadorProps {
  name: string;
  texto: string;
  valor: string;
  setValor: Dispatch<SetStateAction<string>>;
  boton?: boolean | undefined;
  setBuscador?: Dispatch<SetStateAction<boolean>>;
}

const InputBuscarFiltro = ({
  name,
  texto,
  valor = '',
  setValor,
  boton = undefined,
  setBuscador = undefined
}: InputBuscadorProps) => {
  const [expandido, setExpandido] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Actualizar estado del buscador en el padre
  useEffect(() => {
    if (setBuscador) {
      setBuscador(expandido);
    }
  }, [expandido, setBuscador]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValor(e.target.value);
  };

  const handleExpandir = () => {
    setExpandido(true);
    // Enfocar el input después de expandir
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleContraer = () => {
    setValor('');
    setExpandido(false);
  };

  const handleBlur = () => {
    // Solo contraer si no hay contenido real (ignorando espacios)
    if (valor.trim().length === 0) {
      setExpandido(false);
    }
  };

  return (
    <div className='input-buscador'>
      {/* Botón de volver - solo visible cuando está expandido */}
      <Boton
        icono={ <p>Flecha</p>}
        terciario
        nuevoEstilo={`btn-icono-chico btn-buscador ${!expandido ? 'btn-oculto' : ''}`}
        onClick={handleContraer}
      />

      {/* Input container - solo visible cuando está expandido */}
      <div className={`inputs-span ${!expandido ? 'btn-oculto' : ''}`}>
        <div className="inputs-entero buscador">
          <input
            ref={inputRef}
            type='text'
            id={name}
            name={name}
            placeholder=' '
            onChange={handleChange}
            value={valor}
            onBlur={handleBlur}
            autoComplete='off'
          />
          <label htmlFor={name}>{texto}</label>
        </div>
      </div>

      {/* Botón de búsqueda - solo visible cuando NO está expandido */}
      <Boton
        icono={<p>Lupa</p>}
        terciario
        nuevoEstilo={`btn-icono-chico ${!boton ? 'btn-buscador btn-lupa' : ''} ${expandido ? 'btn-oculto' : ''}`}
        onClick={handleExpandir}
      />
    </div>
  );
};

export default InputBuscarFiltro;