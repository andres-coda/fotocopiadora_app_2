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
import Titulo from "../texto/titulo";

interface Prop<T> {
  volanta?:string;
  msjExito?:string;
  titulo?: string;
  texto?:string;
  entidad?: string;
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
  texto = undefined, eliminarElemento, entidad = undefined, ruta = undefined,
  loading, errorFetch, response, elemento, eliminarElementoRedux, retroceder = undefined,
  titulo = undefined, volanta = undefined, msjExito = undefined
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
        mensaje={`${msjExito ? msjExito : `El elemento ---[ ${elemento.id} ]--- fue eliminado con exito`}`}
        onCerrar={finalizar}
        delay={tiempoCartelExito}
      />
    );

  return (
    <div className="eliminar-elemento">
      <Titulo titulo={`${titulo ? titulo : 'Eliminar elemento'}`} />
      <Texto texto={`${volanta ? volanta : '¿Desea confirmar la eliminación del elemento?'}`} centrado mediana />
      {texto && <Texto texto={texto} chica/>}
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
            titulo={`Eliminar ${entidad ? entidad : 'elemento'}`}
          />
        </Botonera>
    </div>
  );
};

export default EliminarElemento;
