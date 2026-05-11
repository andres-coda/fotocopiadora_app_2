import { BotonEstilosProp } from "../modelo/boton.interface";

type BtnTipo = 'submit' | 'button' | 'reset';

type textoBtnTipo = 'inverso' | 'nuevoEstilo' | undefined;

function useBoton({
  secundario,
  terciario,
  edit,
  cerrar,
  nuevoEstilo,
  submit,
  reset,
}: BotonEstilosProp) {

  const clase = [
    cerrar && 'cerrar terciario',
    !cerrar && terciario && 'terciario',
    !cerrar && !terciario && secundario && 'secundario',
    !cerrar && !terciario && !secundario && edit && 'edit',
    !cerrar && !terciario && !secundario && !edit && 'primario', // Caso por defecto
    nuevoEstilo,
  ]
    .filter(Boolean)
    .join(' ');

  const tipo: BtnTipo = submit ? 'submit' : reset ? 'reset' : 'button';

  const colorTexto: textoBtnTipo = !cerrar && !terciario && !secundario && !edit 
    ? 'inverso'
    : 'nuevoEstilo';

  return { clase, tipo, colorTexto }
}

export default useBoton