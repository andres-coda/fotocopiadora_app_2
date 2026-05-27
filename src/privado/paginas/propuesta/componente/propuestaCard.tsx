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

interface Prop {
  propuesta: PropuestaProp
}

const PropuestaCard = ({ propuesta }: Prop) => {
  const { copiarPresupuestoLibros } = usePresupuesto({libros:propuesta.libro})
  const { handleSelect, handleEdit } = useEditar({
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
    propuesta
  });

  const [verMas, setVerMas] = useState<boolean>(false)
  return (
    <Card
      onClick={() => handleSelect({})}
    >
      <div className='card-horizontal'>
        <Texto texto={`${propuesta.cantidadLibros}`} etiqueta='Cantidad de libros dentro de la propuesta' mediana />
        <div className='card-vertical'>
          <Boton icono={<Copiar />} edit nuevoEstilo="btn-icono-chico" titulo={`Copiar presupuesto`} onClick={copiarPresupuestoLibros} />

          <Texto texto={`Prop: ${propuesta.nombre}`} centrado negrita />
          <div className='card-horizontal'>
            <Boton icono={<Editar />} terciario nuevoEstilo="btn-icono-chico" titulo={`Editar propuesta`} />
            <Boton icono={<Arrow />} terciario nuevoEstilo={`btn-icono-chico ${verMas ? 'btn-icono-abajo' : 'btn-icono-arriba'}`} titulo={`Mostrar todos los libros`} onClick={()=>setVerMas(prev=> !prev)}/>
          </div>
        </div>
      </div>

    </Card>
  )
}

export default PropuestaCard;