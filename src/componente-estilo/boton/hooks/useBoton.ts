import { BotonEstilosProp } from '../modelo/boton.interface';

type BtnTipo = 'submit' | 'button' | 'reset';

type textoBtnTipo = 'inverso' | 'nuevoEstilo' | undefined;

function useBoton({
  secundario,
  terciario,
  edit,
  cerrar,
  nuevoEstilo = '',
  submit,
  reset,
  btnFiltro,
}: BotonEstilosProp) {
  const clase = [
    btnFiltro && 'btn-filtro',
    !btnFiltro && cerrar && 'cerrar terciario',
    !btnFiltro && !cerrar && terciario && 'terciario',
    !btnFiltro && !cerrar && !terciario && secundario && 'secundario',
    !btnFiltro && !cerrar && !terciario && !secundario && edit && 'edit',
    !btnFiltro && !cerrar && !terciario && !secundario && !edit && 'primario', // Caso por defecto
    nuevoEstilo,
  ]
    .filter(Boolean)
    .join(' ');

  const tipo: BtnTipo = submit ? 'submit' : reset ? 'reset' : 'button';

  const colorTexto: textoBtnTipo =
    !btnFiltro && !cerrar && !terciario && !secundario && !edit ? 'inverso' : 'nuevoEstilo';

  return { clase, tipo, colorTexto };
}

export default useBoton;
