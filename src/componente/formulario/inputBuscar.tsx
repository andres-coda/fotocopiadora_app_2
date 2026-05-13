import Boton from '../../componente-estilo/boton/boton';
import './input.css'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface InputBuscadorProps {
  name: string;
  texto: string;
  valor: string;
  setValor: Dispatch<SetStateAction<string>>;
}

const InputBuscar = ({ name, texto, valor = '', setValor}: InputBuscadorProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [tieneFoco, setTieneFoco] = useState<boolean>(false);

  useEffect(() => {
    if (valor !== '' || tieneFoco) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [valor, tieneFoco]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValor(e.target.value)
  }

  const handleBuscador = () => {
    setVisible(true);
  }

  const handleAtras = () => {
    setValor('')
  }

  return (
    <div className='input-buscador'>
      <Boton
        icono={ <p>Flecha</p>}
        terciario
        nuevoEstilo={
          `btn-icono-chico btn-buscador ${!visible ? 'btn-oculto' : ''}`
        }
        onClick={handleAtras}
      />
      <div className={`inputs-span ${/*!visible ? 'btn-oculto' : */''}`}>
        <div className="inputs-entero buscador">
          <input
            type='text'
            id={name}
            name={name}
            placeholder=' '
            onChange={handleChange}
            value={valor}
            onFocus={() => setTieneFoco(true)}
            onBlur={() => setTieneFoco(false)}
            autoComplete='off'
          />
          <label htmlFor={name}>{texto}</label>
        </div>
      </div>
      <Boton
        icono={ <p>Lupa</p>}
        terciario
        nuevoEstilo={
          `btn-icono-chico btn-buscador btn-lupa ${visible ? 'btn-oculto' : ''}`
        }
        onClick={handleBuscador}
      />
    </div>
  )
}

export default InputBuscar
