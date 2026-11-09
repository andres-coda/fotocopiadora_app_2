import { FormularioEstiloProp } from "../modelo/formulario.interface"

const useFormulario = ({estiloBoton = '', claseForm = '', hayTxtBtnConfirmar = false, iconoChico = false, hayTxtBtnSecundario = false}:FormularioEstiloProp) => {
  const clase = [
    'formulario',
    claseForm
  ]
    .filter(Boolean)
    .join(' ');

  const claseBtnConfirmar = [
    !hayTxtBtnConfirmar && 'btn-icono-derecha',
    !hayTxtBtnConfirmar && 'btn-icono',
    !hayTxtBtnConfirmar && iconoChico && 'btn-icono-chico',
    estiloBoton
  ]
    .filter(Boolean)
    .join(' ');

  const claseBtnSecundario = [
    !hayTxtBtnSecundario && 'btn-icono',
    !hayTxtBtnSecundario && iconoChico && 'btn-icono-chico',
  ]
    .filter(Boolean)
    .join(' ');


    return {clase, claseBtnConfirmar, claseBtnSecundario}
}

export default useFormulario
