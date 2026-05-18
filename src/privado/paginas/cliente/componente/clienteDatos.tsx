import { ClienteProp } from "../../../../modelo/Entidades/cliente/cliente.interface";
import './clienteCard.css'
import Email from '../../../../assets/email.svg?react';
import Telefono from '../../../../assets/phone.svg?react';
import Monigote from '../../../../assets/user.svg?react';
import Texto from "../../../../componente-estilo/texto/texto";

interface Prop{
  cliente:ClienteProp;
}

const ClienteDatos = ({cliente}: Prop) => {

  return (
    <div className="card-vertical datos-cliente">
      <div className="cliente-renglon">
        <Telefono />
        <Texto texto={`${cliente.telefono ?? ''}`} negrita />
      </div>
      <div className="cliente-renglon">
        <Monigote />
        <Texto texto={`${cliente.nombre ?? ''}`} />
      </div>
      <div className="cliente-renglon">
        <Email />
        <Texto texto={`${cliente.email ?? ''}`} />
      </div>
    </div>
  )
}

export default ClienteDatos;