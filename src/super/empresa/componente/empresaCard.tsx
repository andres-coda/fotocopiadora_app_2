import { EmpresaProp } from '../../../modelo/Entidades/empresa/empresa.interface';
import Card from '../../../componente-estilo/card/card';
import Texto from '../../../componente-estilo/texto/texto';
import { useDispatch } from 'react-redux';
import { seleccionarEmpresa } from '../../../redux/state/empresa.state';
import { useNavigate } from 'react-router-dom';
import { RutasSupers } from '../../ruta/rutaSupers';
import Eliminar from '../../../assets/deleted.svg?react';
import Email from '../../../assets/email.svg?react';
import Telefono from '../../../assets/phone.svg?react';
import Boton from '../../../componente-estilo/boton/boton';
import Botonera from '../../../componente-estilo/botonera/botonera';
import useEliminar from '../../../hooks/eliminar/useEliminar';
import { Dispatch, SetStateAction } from 'react';
import { rutaBase } from '../../../privado/rutas/rutasPrivadas';

interface Prop {
  empresa: EmpresaProp;
  onEliminar?: Dispatch<SetStateAction<boolean>>;
}

const EmpresaCard = ({ empresa, onEliminar }: Prop) => {
  const { eliminarElemento } = useEliminar({
    elemento: empresa,
    selectElemento: seleccionarEmpresa,
    setModalParticular: onEliminar,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmpresa = () => {
    dispatch(seleccionarEmpresa(empresa));
    navigate(`/${rutaBase.SUPER}/${RutasSupers.EMPRESA}`);
  };
  return (
    <Card onClick={() => handleEmpresa()} retirado>
      <div className="card-vertical">
        <Texto texto={empresa.nombre} centrado mediana />
        <div className="card-horizontal">
          <Email />
          <Texto texto={empresa.email} />
        </div>
        <div className="card-horizontal">
          <Telefono />
          <Texto texto={empresa.telefono} />
        </div>
      </div>
      {onEliminar && (
        <Botonera derecha flotante abajo ajustada>
          <Boton
            icono={<Eliminar />}
            iconoChico
            secundario
            titulo="Eliminar empresa"
            onClick={eliminarElemento}
          />
        </Botonera>
      )}
    </Card>
  );
};

export default EmpresaCard;
