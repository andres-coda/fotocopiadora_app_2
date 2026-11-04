import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoriaProp } from '../../modelo/Entidades/precio/precio.interface';
import { ReduxSimple } from '../modelo/reduxContext.interface';
import { estadoInicialSimple } from '../utils/reduxInicial';

export type CategoriaState = ReduxSimple<CategoriaProp, 'categorias'>;

const initialState: CategoriaState = estadoInicialSimple<CategoriaProp, 'categorias'>('categorias');

export const categoriaSlice = createSlice({
  name: 'categoria',
  initialState,
  reducers: {
    setCategorias: (state, action: PayloadAction<CategoriaProp[]>) => {
      state.categorias = action.payload;
      state.cargaInicial = true;
    },
    setCargaInicialCategorias: (state, action: PayloadAction<boolean>) => {
      state.cargaInicial = action.payload;
    },
    setErrorCategorias: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoadingCategorias: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetCategorias: () => estadoInicialSimple<CategoriaProp, 'categorias'>('categorias'),
  },
});

export const {
  setCategorias,
  setCargaInicialCategorias,
  setErrorCategorias,
  setLoadingCategorias,
  resetCategorias,
} = categoriaSlice.actions;

export default categoriaSlice.reducer;