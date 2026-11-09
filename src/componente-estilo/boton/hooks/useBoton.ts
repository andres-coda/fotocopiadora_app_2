import { BotonEstilosProp } from '../modelo/boton.interface';

type BtnTipo = 'submit' | 'button' | 'reset';

type textoBtnTipo = 'inverso' | 'nuevoEstilo' | undefined;

function useBoton({
  secundario = false,
  terciario = false,
  edit = false,
  cerrar = false,
  nuevoEstilo = '',
  submit = false,
  reset = false,
  btnFiltro = false,
  hayTexto = false,
  iconoChico = false
}: BotonEstilosProp) {
  const clase = [
    'btn-general',
    btnFiltro && 'btn-filtro',
    !btnFiltro && cerrar && 'cerrar terciario',
    !btnFiltro && !cerrar && terciario && 'terciario',
    !btnFiltro && !cerrar && !terciario && secundario && 'secundario',
    !btnFiltro && !cerrar && !terciario && !secundario && edit && 'edit',
    !btnFiltro && !cerrar && !terciario && !secundario && !edit && 'primario', // Caso por defecto
    !hayTexto && 'btn-icono',
    !hayTexto && iconoChico && 'btn-icono-chico',
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
