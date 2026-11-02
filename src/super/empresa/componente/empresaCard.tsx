import { EmpresaProp } from '../../../modelo/Entidades/empresa/empresa.interface';
import Card from '../../../componente-estilo/card/card';
import Texto from '../../../componente-estilo/texto/texto';
import { useDispatch } from 'react-redux';
import { seleccionarEmpresa } from '../../../redux/state/empresa.state';
import { useNavigate } from 'react-router-dom';
import { RutasSupers, rutaSuperBase } from '../../ruta/rutaSupers';

interface Prop {
  empresa: EmpresaProp;
}

const EmpresaCard = ({ empresa }: Prop) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmpresa = () => {
    dispatch(seleccionarEmpresa(empresa));
    navigate(`/${rutaSuperBase.SUPER}/${RutasSupers.EMPRESA}`);
  };
  return (
    <Card onClick={()=>handleEmpresa()}>
      <Texto texto={empresa.nombre} />
      <Texto texto={empresa.email} />
      <Texto texto={empresa.telefono} />
    </Card>
  );
};

export default EmpresaCard;
