import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { LOGIN } from "../../../utils/endpoint";
import { httpMethod } from "../../../modelo/HTTP/HttpMethod.enum";
import Centro from "../../../componente-estilo/centro/centro";
import Formulario from "../../../componente/formulario/formulario";
import Input from "../../../componente/formulario/input";
import Boton from "../../../componente-estilo/boton/boton";
import { useNavigate } from "react-router-dom";
import { rutaPrivadaBase } from "../../../privado/rutas/rutasPrivadas";
import Botonera from "../../../componente-estilo/botonera/botonera";
import { rutaPublica } from "../../rutas/rutasPublicas";
import { formValuesLogin, login, loginFormDefault } from "../../../modelo/usuario/esqUsuario.esquema";
import useApi from "../../../servicio/hooks/useApi";

export interface LoginResponseProp{
  access_token:string;
}

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<formValuesLogin>({
    resolver: zodResolver(login),
    defaultValues: loginFormDefault
  });
  const navigate = useNavigate()
  const { fetchData, loading, response, errorFetch } = useApi<LoginResponseProp>({})

  useEffect(() => {
    if (response) {
      console.log('Token: ',response)
      localStorage.setItem('token', response.access_token);
      navigate(`/${rutaPrivadaBase.PRIVADO}`)
    }    
  }, [response])

  const onSubmit = async (data: formValuesLogin) => {
    await fetchData({
      url: LOGIN,
      methodo: httpMethod.POST,
      bodyData: JSON.stringify(data)
    });
  }

  const onSecundario = () => {
    console.log('Olvide contraseña');
  }

  return (
    <Centro>
        <Formulario
          titulo={`${loading ? 'En proceso' : 'Iniciar sesión'}`}
          onSubmit={handleSubmit(onSubmit)}
          textBtnSecundario="Olvide contraseña"
          onClickSecundario={onSecundario}
          etiquetaPrimaria="Iniciar sesión"
          loading={loading}
          errorFetch={errorFetch}
          >
          <>
            <Input<formValuesLogin> name='email' control={control} label='Email' tipo='email' error={errors.email} esquema={login} />
            <Input<formValuesLogin> name='password' control={control} label='Contraseña' tipo='password' error={errors.password} esquema={login} />
          </>
        </Formulario>
        <Botonera>
          <Boton texto="Cerrar sesión" secundario onClick={()=>localStorage.setItem('token', '')}/>
          <Boton texto="Registrarse" secundario onClick={()=>navigate(`/${rutaPublica.REGISTRO}`)}/>
        </Botonera>
    </Centro>
  )
}

export default Login;   