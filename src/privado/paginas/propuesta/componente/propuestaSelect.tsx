import Boton from '../../../../componente-estilo/boton/boton';
import Botonera from '../../../../componente-estilo/botonera/botonera';
import { PropuestaProp } from '../../../../modelo/Entidades/propuesta/propuesta.interface';
import LibroCard from '../../libro/componente/libroCard';
import Editar from '../../../../assets/edit.svg?react';
import Arrow from '../../../../assets/arrow.svg?react';
import { useModalContext } from '../../../../contexto/contextoModal';
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas';
import useEditar from '../../../../hooks/editar/useEditar';
import Texto from '../../../../componente-estilo/texto/texto';
import Copiar from '../../../../assets/copiar.svg?react';
import './propuestacard.css';
import usePresupuesto from '../../../../hooks/presupuesto/usePresupuesto';

interface Prop {
  propuesta: PropuestaProp;
}

const PropuestaSelect = ({ propuesta }: Prop) => {
  const { setModal } = useModalContext();
  const { copiarPresupuestoLibros } = usePresupuesto({ libros: propuesta.libro });

  const { handleEdit } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PROPUESTA_CARGAR}`,
    propuesta,
  });
  return (
    <div className="propuesta-select propuesta-select-color">
      <Texto texto={propuesta.nombre} centrado negrita mediana />
      <Texto texto={`Cantidad de libros: ${propuesta.cantidadLibros}`} chica />
      {propuesta.libro?.map(l => (
        <LibroCard libro={l} key={l.id} selecLibro={() => setModal(false)} />
      ))}
      <Botonera>
        <Boton
          icono={<Arrow />}
          terciario
          nuevoEstilo={`btn-icono-chico`}
          titulo={`Mostrar todos los libros`}
          onClick={() => {
            setModal(false);
          }}
        />
        <Boton
          icono={<Editar />}
          secundario
          nuevoEstilo="btn-icono-chico"
          titulo={`Editar propuesta`}
          onClick={() => handleEdit({ propuesta })}
        />
        <Boton
          icono={<Copiar />}
          nuevoEstilo="btn-icono-chico"
          titulo={`Copiar presupuesto`}
          onClick={copiarPresupuestoLibros}
        />
      </Botonera>
    </div>
  );
};

export default PropuestaSelect;
