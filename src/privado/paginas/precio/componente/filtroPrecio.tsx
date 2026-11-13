import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appStore } from '../../../../redux/store';
import Formulario from '../../../../componente/formulario/formulario';
import InputCheckFueraForm from '../../../../componente/formulario/inputCheckFueraForm';
import Texto from '../../../../componente-estilo/texto/texto';
import { useModalContext } from '../../../../contexto/contextoModal';
import { cambiarFiltrosPrecio } from '../../../../redux/state/precio.state';
import { CategoriaProp } from '../../../../modelo/Entidades/precio/precio.interface';
import './filtroPrecio.css';

const FiltroPrecio = () => {
  const dispatch = useDispatch();
  const { setModal } = useModalContext();

  const categorias: CategoriaProp[] = useSelector((store: appStore) => store.categoria.datos);
  const filtrosActuales = useSelector((store: appStore) => store.precio.filtrosPrecio);

  const [seleccionadas, setSeleccionadas] = useState<string[]>(filtrosActuales.categorias);

  // Las bloqueadas ya viven en el lateral, y las que la empresa no usa no tienen
  // precios que filtrar. El modal ofrece el resto, las que si usan.
  const opciones = (categorias ?? [])
    .filter(categoria => !categoria.bloqueado && categoria.usada)
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
    .map(categoria => ({ nombre: categoria.id, texto: categoria.nombre }));

  const limpiarFiltros = () => {
    dispatch(cambiarFiltrosPrecio({ categorias: [] }));
    setSeleccionadas([]);
  };

  const onSubmit = async () => {
    dispatch(cambiarFiltrosPrecio({ categorias: seleccionadas }));
    setModal(false);
  };

  return (
    <Formulario
      claseForm="filtro-precio__form"
      onSubmit={onSubmit}
      textBtnConfirmar="Aplicar filtros"
      textBtnSecundario="Limpiar filtros"
      onClickSecundario={limpiarFiltros}
    >
      <div className="filtro-precio">
        <Texto texto="Categorías" mediana negrita />
        {opciones.length === 0 ? (
          <Texto texto="No hay categorías para filtrar" chica />
        ) : (
          <InputCheckFueraForm<string>
            lista={opciones}
            elementosSelect={seleccionadas}
            setelementosSelect={setSeleccionadas}
            nuevoEstilo="filtro-precio__lista"
          />
        )}
      </div>
    </Formulario>
  );
};

export default FiltroPrecio;
