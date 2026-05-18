import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Centro from "../../../componente-estilo/centro/centro";
import Formulario from "../../../componente/formulario/formulario";
import Input from "../../../componente/formulario/input";
import { rutaPrivadaBase } from "../../../privado/rutas/rutasPrivadas";
import { formValuesRegistro, registro, registroFormDefault } from "../../../modelo/usuario/esqUsuario.esquema";
import useUsuarioTokens from "../../../servicio/usuario/useUsuarioTokens";

const Registro = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm<formValuesRegistro>({
    resolver: zodResolver(registro),
    defaultValues: registroFormDefault
  });
  const { crearUsuario, userLoading, userError, user } = useUsuarioTokens()

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', user.access_token);
      navigate(`/${rutaPrivadaBase.PRIVADO}`)
    }
  }, [user])

  const onSubmit = (data: formValuesRegistro) => {
    crearUsuario(data)
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <Centro>
      <Formulario
        titulo={`${userLoading ? 'En proceso' : 'Registrarse'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={handleBack}
        etiquetaPrimaria="Registrarse"
        etiquetaSecundaria="Atras"
        loading={userLoading}
        errorFetch={userError}
      >
        <>
          <Input<formValuesRegistro> name='nombre' control={control} label='Nombre' tipo='text' error={errors.nombre} esquema={registro} />
          <Input<formValuesRegistro> name='email' control={control} label='Email' tipo='email' error={errors.email} esquema={registro} />
          <Input<formValuesRegistro> name='password' control={control} label='Contraseña' tipo='password' error={errors.password} esquema={registro} />
          <Input<formValuesRegistro> name='confirPassword' control={control} label='Confirmar contraseña' tipo='password' error={errors.confirPassword} esquema={registro} />
        </>
      </Formulario>
    </Centro>

  )
}

export default Registro;   