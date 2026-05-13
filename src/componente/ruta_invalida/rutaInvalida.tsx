import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Titulo from "../../componente-estilo/texto/titulo";

interface RutaInvalidaProp {
  children: ReactNode;
}

const RutaInvalida = ({ children }: RutaInvalidaProp) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to='/404'/>}/>
      <Route path="/404" element={<Titulo titulo="Error: 404 not found. Ruta de navegación invalida"/>}/>
    </Routes>

  )
}

export default RutaInvalida;