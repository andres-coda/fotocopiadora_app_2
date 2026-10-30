import Boton from "../boton/boton";
import Botonera from "../botonera/botonera";
import Texto from "../texto/texto";
import Eliminar from '../../assets/deleted.svg?react';
import Atras from '../../assets/arrow.svg?react';
import { useModalContext } from "../../contexto/contextoModal";
import { HasId } from "../../modelo/general/hasId.interface";
import Cargando from "../../componente/cargando/cargando";
import CartelExito from "../../componente/cartelExito/cartelExito";
import { useDispatch } from "react-redux";
import {  UnknownAction } from "@reduxjs/toolkit";
import './eliminarElemento.css'
import { useNavigate } from "react-router-dom";

interface Prop<T> {
  articulo?: string;
  entidad?: string;
  texto: string;
  eliminarElemento: (id:string) => void;
  loading?: boolean;
  errorFetch?: string | null;
  response?:boolean | null;
  elemento?: T;
  eliminarElementoRedux: (payload: string) => UnknownAction;
  ruta?:string;
  retroceder?: ()=> void;
}

const tiempoCartelExito = 1500;

const EliminarElemento=<T extends HasId>({
  texto, articulo = '', eliminarElemento, entidad = '', ruta = undefined,
  loading, errorFetch, response, elemento, eliminarElementoRedux, retroceder = undefined
}:Prop<T>) => {
  const {setModal} = useModalContext();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const finalizar = () => {
      if (elemento) dispatch(eliminarElementoRedux(elemento.id));
      setModal(false);
      if(ruta) navigate(ruta);
    };

  if (loading || !elemento) return <Cargando />;
  if (errorFetch) return <Texto texto={errorFetch} error chica />;
  if (response)
    return (
      <CartelExito
        mensaje={`${articulo} ${entidad} ---[ ${texto} ]--- fue eliminado con exito`}
        onCerrar={finalizar}
        delay={tiempoCartelExito}
      />
    );

  return (
    <div className="eliminar-elemento">
      <Texto texto={`Seguro que desea eliminar ${articulo} ${entidad}`} centrado mediana />
      <Texto texto={`---[ ${texto} ]---`} chica centrado />
      <Botonera derecha>
          <Boton
            icono={<Atras />}
            secundario
            onClick={() => retroceder ? retroceder() : setModal(false)}
            nuevoEstilo="btn-icono-mediano"
            titulo="Atras"
          />
          <Boton
            icono={<Eliminar />}
            onClick={()=>eliminarElemento(elemento.id)}
            nuevoEstilo="btn-icono-mediano"
            titulo={`Eliminar ${entidad}`}
          />
        </Botonera>
    </div>
  );
};

export default EliminarElemento;
