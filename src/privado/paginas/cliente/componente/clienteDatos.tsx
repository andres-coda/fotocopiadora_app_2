import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import './clienteCard.css'
import Email from '../../../../assets/email.svg?react';
import Telefono from '../../../../assets/phone.svg?react';
import Monigote from '../../../../assets/user.svg?react';
import Texto from "../../../../componente-estilo/texto/texto";
import { formatoTelefonoMostrar } from "../../../../utils/formatoDatos";
import { MouseEventHandler, useEffect } from "react";

interface Prop{
  cliente:ClienteProp;
  selectCliente?: (c:ClienteProp) => void;
}

const ClienteDatos = ({cliente, selectCliente}: Prop) => {

  const handleCLick: MouseEventHandler<HTMLDivElement> = () => {
  
      if (selectCliente) {
        selectCliente(cliente);
      }
    }
  useEffect(()=>{
    console.log('cliente ',cliente)
  },[])

  return (
    <div className={`card-vertical datos-cliente ${selectCliente ? 'cliente-seleccionar' : ''}`} onClick={handleCLick}>
      <div className="cliente-renglon">
        <Telefono />
        <Texto texto={`${cliente.telefono ? formatoTelefonoMostrar(cliente.telefono): ''}`} />
      </div>
       <div className="cliente-renglon">
        <Monigote />
        <Texto texto={`${cliente.nombre ?? ''}`} chica/>
      </div>
       <div className="cliente-renglon">
        <Email />
        <Texto texto={`${cliente.email ?? ''}`} chica/>
      </div>
    </div>
  )
}

export default ClienteDatos;