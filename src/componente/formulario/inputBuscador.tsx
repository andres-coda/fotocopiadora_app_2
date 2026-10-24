import './input.css';

interface Props {
  label: string;
  valor: string;
  onCambiar: (valor: string) => void;
  id?: string;
  placeholder?: string;
}

/**
 * Input de texto controlado con el mismo estilo que `Input`, pero sin
 * react-hook-form: para buscadores donde el texto escrito no es el valor que se
 * persiste (por ejemplo, se busca por nombre y se guarda el id).
 */
const InputBuscador = ({
  label,
  valor,
  onCambiar,
  id = 'input-buscador',
  placeholder = ' ',
}: Props) => {
  return (
    <div className="inputs-span">
      <span></span>
      <div className="inputs-entero">
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          value={valor}
          onChange={e => onCambiar(e.target.value)}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <span></span>
    </div>
  );
};

export default InputBuscador;
