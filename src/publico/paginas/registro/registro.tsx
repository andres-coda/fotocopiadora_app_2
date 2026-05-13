import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTRO } from "../../../utils/endpoint";
import { httpMethod } from "../../../modelo/HTTP/HttpMethod.enum";
import Centro from "../../../componente-estilo/centro/centro";
import Formulario from "../../../componente/formulario/formulario";
import Input from "../../../componente/formulario/input";
import { rutaPrivadaBase } from "../../../privado/rutas/rutasPrivadas";
import { LoginResponseProp } from "../login/login";
import { formValuesRegistro, registro, registroFormDefault } from "../../../modelo/usuario/esqUsuario.esquema";
import useApi from "../../../servicio/hooks/useApi";

const Registro = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm<formValuesRegistro>({
    resolver: zodResolver(registro),
    defaultValues: registroFormDefault
  });
  const { fetchData, response, loading, errorFetch } = useApi<LoginResponseProp>({
    urlGet: REGISTRO
  })

  useEffect(() => {
    if (response) {
      console.log('Token: ', response)
      localStorage.setItem('token', response.access_token);
      navigate(`/${rutaPrivadaBase.PRIVADO}`)
    }
  }, [response])

  const onSubmit = (data: formValuesRegistro) => {
    fetchData({
      methodo: httpMethod.POST,
      bodyData: JSON.stringify(data)
    })
  }

  const handleBack = () => {
    navigate(`/`)

  }

  return (
    <Centro>
      <Formulario
        titulo={`${loading ? 'En proceso' : 'Registrarse'}`}
        onSubmit={handleSubmit(onSubmit)}
        onClickSecundario={handleBack}
        etiquetaPrimaria="Registrarse"
        etiquetaSecundaria="Atras"
        loading={loading}
        errorFetch={errorFetch}
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