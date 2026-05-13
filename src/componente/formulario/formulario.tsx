import { BaseSyntheticEvent, ReactNode } from "react";
import './formulario.css'
import Boton from "../../componente-estilo/boton/boton";
import Titulo from "../../componente-estilo/texto/titulo";
import Texto from "../../componente-estilo/texto/texto";
import Botonera from "../../componente-estilo/botonera/botonera";

interface FormularioProps {
  children: ReactNode;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  titulo?: string | null;
  onReset?: () => void;
  textBtnConfirmar?: string | undefined;
  textBtnSecundario?: string | undefined;
  onClickSecundario?: () => void;
  estiloBoton?: string | undefined;
  claseForm?: string | null;
  etiquetaPrimaria?: string | undefined;
  etiquetaSecundaria?: string | undefined;
  loading?: boolean | undefined;
  errorFetch?: string | null;
}

function Formulario({ 
  children, 
  onSubmit, 
  titulo, 
  onReset, 
  textBtnConfirmar = undefined, 
  textBtnSecundario = undefined, 
  onClickSecundario, 
  estiloBoton = undefined, 
  claseForm = '',
  etiquetaPrimaria = undefined,
  etiquetaSecundaria = undefined,
  loading = undefined,
  errorFetch =null,
}: FormularioProps) {
  return (
    <div className={`formulario ${claseForm}`} >
      {titulo ? (<Titulo
        titulo={titulo}
      />) : (null)}
      <form onSubmit={(e) =>onSubmit(e)} onReset={onReset}>
        {children}
        <Botonera
          children={
            <>
              {onReset ? <Boton icono={ <p>Reset</p>} reset secundario nuevoEstilo="btn-icono-chico"/> : null}
              {onClickSecundario
                ? <Boton
                  texto={textBtnSecundario && textBtnSecundario}
                  icono={!textBtnSecundario &&  <p>Flecha</p>}
                  secundario
                  titulo={etiquetaSecundaria}
                  onClick={onClickSecundario}
                />
                : null}
              <Boton 
              texto={loading ? 'Procesando...' : textBtnConfirmar && textBtnConfirmar} 
              icono={!textBtnConfirmar && !loading && <p>Flecha</p>}
              submit={loading ? false : true}
              nuevoEstilo={!textBtnConfirmar ? `btn-icono-derecha ${estiloBoton}` : estiloBoton} 
              titulo={etiquetaPrimaria}
              />
            </>
          }
        />
        {errorFetch && <Texto texto={errorFetch} error chica/>}
      </form>
    </div>
  )
}
export default Formulario;