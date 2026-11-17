import Boton from './boton';
import Check from '../../assets/check.svg?react';
import Copiar from '../../assets/copiar.svg?react';
import { BtnCopiarProp } from './modelo/btnCopiar.interface';
import useBtnCopiar from './hooks/useBtnCopiar';

const BtnCopiar = ({
  copiar, 
  texto = undefined,
  nuevoEstilo, flotante, derecha
}:BtnCopiarProp) => {

  const {clase, copiada, setCopiada} = useBtnCopiar({nuevoEstilo, flotante, derecha});

  const onClick = () => {
    copiar();
    setCopiada(true);
  }

  return (
    <Boton
      icono={copiada ? <Check /> : <Copiar />}
      edit
      nuevoEstilo={clase}
      titulo={copiada ? 'Copiado' : `${texto ? texto : 'Copiar'}`}
      onClick={onClick}
      iconoChico
    />
  );
};

export default BtnCopiar;
