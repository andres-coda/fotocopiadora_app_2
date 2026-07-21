import Centro from "../../../../componente-estilo/centro/centro";
import Formulario from "../../../../componente/formulario/formulario";
import { PropuestaProp } from "../../../../modelo/Entidades/propuesta/propuesta.interface";
import { useSelector } from "react-redux";
import { appStore } from "../../../../redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formValuesPropuesta, propuesta, propuestaFormEdit } from "../../../../modelo/Entidades/propuesta/esqPropuesta.esquema";
import useFormulario from "../../../../hooks/formulario/useFormulario";
import usePropuestaApi from "../../../../servicio/propuesta/usePropuestaApi";
import { rutaPrivadaBase, RutasPrivadas } from "../../../rutas/rutasPrivadas";
import { useState } from "react";
import Input from "../../../../componente/formulario/input";
import BuscadorLibro from "../../../../componente/buscador/buscadorLibro";
import { LibroProp } from "../../../../modelo/Entidades/libro/libro.interface";
import LibroCard from "../../libro/componente/libroCard";
import { resetSeleccionarPropuesta } from "../../../../redux/state/propuesta.state";

const PropuestaCargar = () => {
  const propuestaSelect: PropuestaProp | undefined = useSelector((store: appStore) => store.propuesta.datoSeleccionado);
  const [libros, setLibros] = useState<LibroProp[]>([]);
 
  const { editarPropuesta, crearPropuesta, responsePropuesta, errorFetchPropuesta, loadingPropuesta } = usePropuestaApi()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<formValuesPropuesta>({
    resolver: zodResolver(propuesta),
    defaultValues: propuestaFormEdit(propuestaSelect)
  });

  const { retroceder } = useFormulario<PropuestaProp, formValuesPropuesta, PropuestaProp>({
    response: responsePropuesta,
    resetSelect: resetSeleccionarPropuesta,
    reset,
    ruta: `/${rutaPrivadaBase.PRIVADO}/${RutasPrivadas.LIBRO}`,
  })

  const onSubmit = (data: formValuesPropuesta) => {
    const librosIds:string[] = libros.map(l=>l.id);
    if (propuestaSelect?.id) {
      editarPropuesta(data, propuestaSelect.id, librosIds);
    } else {
      crearPropuesta(data, librosIds);
    }
  }

  const handleLibroBuscador = (libroBuscado:LibroProp) => {
    if(!libros.find(l=>l.id === libroBuscado.id)){
      setLibros(prev=>[...prev, libroBuscado]);
    }
  }

  const handleSelectLibro = (libroSelec:LibroProp) => {
    setLibros(prev=>{
      const newLibros:LibroProp[] = prev.filter(l => libroSelec.id !=l.id);
      return newLibros;
    })
  }

  return (
    <Centro>
      <Formulario
        titulo={`${propuestaSelect ? `Editar propuesta` : 'Nuevo propuesta'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={() => retroceder()}
        etiquetaPrimaria="Guardar propuesta"
        etiquetaSecundaria="Atras"
        loading={loadingPropuesta}
        errorFetch={errorFetchPropuesta}
      >
          <Input<formValuesPropuesta> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={propuesta} />
          <BuscadorLibro selectLibro={handleLibroBuscador} selectPropuesta={()=>true}/>
          {
            libros?.map(l=> <LibroCard libro={l} selecLibro={handleSelectLibro}/>)
          }
      </Formulario>
    </Centro>
  )
}

export default PropuestaCargar;