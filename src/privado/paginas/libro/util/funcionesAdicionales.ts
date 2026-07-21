export const listaLibroPropuestaSeleccionable = [{ nombre: 'Todo' }, { nombre: 'Propuestas' }, { nombre: 'Libros' }];

export const normalizarLibroPropuesta = (elementos: string[]): string[] => {
  return [elementos[elementos.length - 1]];
}