import Boton from '../../../../componente-estilo/boton/boton'
import Card from '../../../../componente-estilo/card/card'
import Texto from '../../../../componente-estilo/texto/texto'
import useEditar from '../../../../hooks/editar/useEditar'
import { PropuestaProp } from '../../../../modelo/Entidades/propuesta/propuesta.interface'
import { rutaPrivadaBase, RutasPrivadas } from '../../../rutas/rutasPrivadas'
import './propuestacard.css'
import Copiar from '../../../../assets/copiar.svg?react'
import Editar from '../../../../assets/edit.svg?react'
import Arrow from '../../../../assets/arrow-small.svg?react'
import usePresupuesto from '../../../../hooks/presupuesto/usePresupuesto'
import { useState } from 'react'
import LibroCard from '../../libro/componente/libroCard'
import Botonera from '../../../../componente-estilo/botonera/botonera'
import { nombreLibroXstring } from '../../../../utils/formatoDatos'
import DesplegableConteiner from '../../../../componente-estilo/deslegable/desplegableConteiner'

interface Prop {
  propuesta: PropuestaProp,
  selecPropuesta?: (propuesta:PropuestaProp) => void;
}

const PropuestaCard = ({ propuesta, selecPropuesta }: Prop) => {
  const { copiarPresupuestoLibros } = usePresupuesto({ libros: propuesta.libro })
  const { handleSelect, handleEdit } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.PROPUESTA_CARGAR}`,
    propuesta
  });

  const [verMas, setVerMas] = useState<boolean>(false)
  return (
    <Card
      onClick={()=>{selecPropuesta || handleSelect}}
      nuevoEstilo={`propuesta-card ${verMas && 'propuesta-card-desactivado'}`}
      tituloCard={propuesta.nombre}
    >
      <div className='card-horizontal propuesta-titulo'>
        <Texto texto={`${propuesta.libro?.length}`} etiqueta='Cantidad de libros dentro de la propuesta' mediana ajustado />
        <Texto texto={`${propuesta.nombre}`} centrado negrita inline />
        <Boton icono={<Copiar />} edit nuevoEstilo="btn-icono-chico" titulo={`Copiar presupuesto`} onClick={copiarPresupuestoLibros} />
      </div>
      <div className='card-horizontal card-propuesta-horizontal'>
        <div className='card-vertical propuesta-vertical'>
          {propuesta.libro?.map(l => <Texto texto={`- ${nombreLibroXstring(l)}`} chica inline/>)}
        </div>
        <Botonera nuevoEstilo='botonera-card-propuesta'>
          <Boton icono={<Editar />} terciario nuevoEstilo="btn-icono-chico" titulo={`Editar propuesta`} />
          <Boton icono={<Arrow />} terciario nuevoEstilo={`btn-icono-chico ${verMas ? 'btn-icono-arriba' : 'btn-icono-abajo'}`} titulo={`Mostrar todos los libros`} onClick={() => setVerMas(prev => !prev)} />
        </Botonera>
      </div>
      {verMas &&
        <DesplegableConteiner>
          {propuesta.libro?.map(l => <LibroCard libro={l} />)}
          <Botonera nuevoEstilo='botonera-card-propuesta'>
            <Boton icono={<Editar />} terciario nuevoEstilo="btn-icono-chico" titulo={`Editar propuesta`} onClick={()=>handleEdit({propuesta})} />
            <Boton icono={<Arrow />} terciario nuevoEstilo={`btn-icono-chico ${verMas ? 'btn-icono-arriba' : 'btn-icono-abajo'}`} titulo={`Mostrar todos los libros`} onClick={() => setVerMas(prev => !prev)} />
          </Botonera>
        </DesplegableConteiner>
      }
    </Card>
  )
}

export default PropuestaCard;