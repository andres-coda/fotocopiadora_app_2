import Boton from "../../../../componente-estilo/boton/boton";
import Botonera from "../../../../componente-estilo/botonera/botonera";
import Card from "../../../../componente-estilo/card/card";
import Texto from "../../../../componente-estilo/texto/texto";
import { PrecioProp } from "../../../../modelo/Entidades/precio/precio.interface";
import Editar from '../../../../assets/edit.svg?react'
import Eliminar from '../../../../assets/deleted.svg?react'
import './precioCard.css'
import useEditar from "../../../../hooks/editar/useEditar";
import { Dispatch, SetStateAction, useState } from "react";
import { useModalContext } from "../../../../contexto/contextoModal";
import { useDispatch } from "react-redux";
import { seleccionarPrecio } from "../../../../redux/state/precio.state";

interface Props {
  precio: PrecioProp;
  setEliminar: Dispatch<SetStateAction<boolean>>
}

const PrecioCard = ({ precio, setEliminar }: Props) => {
  
  const {handleEdit} = useEditar({setModalLocal:true, precio});
  const {setModal} = useModalContext();
  const dispatch = useDispatch();
  
  return (
    <Card
      nuevoEstilo={'card-precio'}
    >
      <Texto texto={`${precio.nombre}`} chica/>
      <Texto texto={`$${Number(precio.importe)}`} chica negrita derecha ajustado/>
      <Botonera nuevoEstilo="botonera-precio">
        <Boton icono={<Eliminar />} edit nuevoEstilo={`btn-icono-chico ${precio.abreviatura ? 'btn-apagado' : ''}`} titulo={`Eliminar precio`} onClick={!precio.abreviatura ? ()=>{setEliminar(true), setModal(true), dispatch(seleccionarPrecio(precio))} : undefined}/>
        <Boton icono={<Editar />} secundario nuevoEstilo="btn-icono-chico" titulo={`Editar precio`} onClick={()=>handleEdit({precio})}/>
      </Botonera>
      
    </Card>
  )
}

export default PrecioCard