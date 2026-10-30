import { describe, it, expect } from 'vitest';
import { transformarComponente } from './componente';
import { ComponenteProp } from '../modelo/Entidades/libro/componente.interface';

const componente = (nombre: string): ComponenteProp => ({ id: nombre, nombre }) as ComponenteProp;

describe('transformarComponente', () => {
  it('une los nombres con coma', () => {
    expect(transformarComponente([componente('Libro'), componente('Cuadernillo')])).toBe(
      'Libro, Cuadernillo'
    );
  });

  it('devuelve string vacio cuando no hay componentes', () => {
    expect(transformarComponente([])).toBe('');
    expect(transformarComponente(undefined)).toBe('');
  });
});
