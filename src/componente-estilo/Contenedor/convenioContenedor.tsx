import { ReactNode } from "react"
import HederConvenio from "../../componente/heder/hederConvenio"
import Titulo from "../texto/titulo"

interface Prop{
    children: ReactNode,
    texto?:string
}

const ConvenioContenedor = ({children, texto}:Prop) => {
  return (
    <div className="contenedor-particular">
        <HederConvenio/>
        {texto && <Titulo titulo={texto}/>}
        {children}
    </div>
  )
}

export default ConvenioContenedor
