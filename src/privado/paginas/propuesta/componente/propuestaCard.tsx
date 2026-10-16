import Boton from '../../../../componente-estilo/boton/boton'
import Card from '../../../../componente-estilo/card/card'
import Texto from '../../../../componente-estilo/texto/texto'
import { PropuestaProp } from '../../../../modelo/Entidades/propuesta/propuesta.interface'
import './propuestacard.css'
import Copiar from '../../../../assets/copiar.svg?react'
import Arrow from '../../../../assets/arrow.svg?react'
import usePresupuesto from '../../../../hooks/presupuesto/usePresupuesto'
import Botonera from '../../../../componente-estilo/botonera/botonera'
import { nombreLibroXstring } from '../../../../utils/formatoDatos'
import { useModalContext } from '../../../../contexto/contextoModal'
import { useDispatch } from 'react-redux'
import { seleccionarPropuesta } from '../../../../redux/state/propuesta.state'

interface Prop {
  propuesta: PropuestaProp;
  selectPropuesta?: (propuesta: PropuestaProp) => void;
}

const PropuestaCard = ({ propuesta, selectPropuesta = undefined }: Prop) => {
  const { copiarPresupuestoLibros } = usePresupuesto({ libros: propuesta.libro })

  const dispatch = useDispatch()
  const { setModal } = useModalContext();

  const handleSelect = (propuesta: PropuestaProp) => {
    if(selectPropuesta) {
      selectPropuesta(propuesta)
    } else {
      setModal(true), 
      dispatch(seleccionarPropuesta(propuesta))
    }
  }
  
  return (
    <Card
      onClick={()=>handleSelect(propuesta)}
      nuevoEstilo={`propuesta-card `}
      tituloCard={propuesta.nombre}
    >
      <div className='card-horizontal propuesta-titulo'>
        <Texto texto={`${propuesta.libro?.length}`} etiqueta='Cantidad de libros dentro de la propuesta' mediana ajustado />
        <Texto texto={`${propuesta.nombre}`} centrado negrita inline />
        <Boton icono={<Copiar />} edit nuevoEstilo="btn-icono-chico" titulo={`Copiar presupuesto`} onClick={copiarPresupuestoLibros} />
      </div>
      <div className='card-horizontal card-propuesta-horizontal'>
        <div className='card-vertical propuesta-vertical'>
          {propuesta.libro?.map(l => <Texto texto={`- ${nombreLibroXstring(l)}`} chica inline key={l.id} />)}
        </div>
        <Botonera nuevoEstilo='botonera-card-propuesta'>
          <Boton icono={<Arrow />} terciario nuevoEstilo={`btn-icono-chico btn-icono-abajo`} titulo={`Mostrar todos los libros`} onClick={() => {setModal(true), dispatch(seleccionarPropuesta(propuesta))}} />
        </Botonera>
      </div>

    </Card>
  )
}

export default PropuestaCard;