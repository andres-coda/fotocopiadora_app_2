export const listaLibroPropuestaSeleccionable = [
  { nombre: 'Todo' },
  { nombre: 'Libros agrupados' },
  { nombre: 'Libros' },
];

export const normalizarLibroPropuesta = (elementos: string[]): string[] => {
  return [elementos[elementos.length - 1]];
};
