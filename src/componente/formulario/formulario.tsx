import Boton from '../../componente-estilo/boton/boton';
import Titulo from '../../componente-estilo/texto/titulo';
import Texto from '../../componente-estilo/texto/texto';
import Botonera from '../../componente-estilo/botonera/botonera';
import Arrow from '../../assets/arrow.svg?react';
import useFormulario from './hook/useFormulario';
import { FormularioProp } from './modelo/formulario.interface';
import './estilos/formulario.css';
import { BaseSyntheticEvent } from 'react';

function Formulario({
  children,
  onSubmit,
  titulo,
  onReset,
  textBtnConfirmar = undefined,
  textBtnSecundario = undefined,
  onClickSecundario,
  estiloBoton,
  claseForm,
  etiquetaPrimaria = undefined,
  etiquetaSecundaria = undefined,
  loading = false,
  errorFetch = undefined,
  iconoChico,
  simple = false,
}: FormularioProp) {
  const { clase, claseBtnConfirmar, claseBtnSecundario } = useFormulario({
    estiloBoton,
    claseForm,
    iconoChico,
    hayTxtBtnConfirmar: textBtnConfirmar ? true : false,
    hayTxtBtnSecundario: textBtnSecundario ? true : false,
  });

  const handleSubmit = (e: BaseSyntheticEvent<object, any, any> | undefined) => {
    if (!e) return;
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  if (simple)
    return (
      <form className="formulario-simple" onSubmit={handleSubmit}>
        <>
          {children}
          {errorFetch && <Texto texto={errorFetch} error />}
        </>
      </form>
    );

  return (
    <div className={clase}>
      {titulo ? <Titulo titulo={titulo} /> : null}
      <form onSubmit={handleSubmit} onReset={onReset}>
        {children}
        <Botonera
          derecha
          children={
            <>
              {onReset ? (
                <Boton icono={<p>Reset</p>} reset secundario nuevoEstilo="btn-icono-chico" />
              ) : null}
              {onClickSecundario ? (
                <Boton
                  texto={textBtnSecundario && textBtnSecundario}
                  icono={!textBtnSecundario && <Arrow />}
                  secundario
                  titulo={etiquetaSecundaria}
                  onClick={onClickSecundario}
                  nuevoEstilo={claseBtnSecundario}
                />
              ) : null}
              <Boton
                texto={loading ? 'Proc...' : textBtnConfirmar && textBtnConfirmar}
                icono={!textBtnConfirmar && !loading && <Arrow />}
                submit={loading ? false : true}
                nuevoEstilo={claseBtnConfirmar}
                titulo={etiquetaPrimaria}
              />
            </>
          }
        />
        {errorFetch && <Texto texto={errorFetch} error />}
      </form>
    </div>
  );
}
export default Formulario;
