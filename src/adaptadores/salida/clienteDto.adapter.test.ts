import { describe, it, expect } from 'vitest';
import { clienteDtoAdapter } from './clienteDto.adapter';
import { formValuesCliente } from '../../modelo/Entidades/cliente/esqCliente.esquema';

const form = (over: formValuesCliente = {}): formValuesCliente => ({
  nombre: 'Ana',
  telefono: '11 15 1234-5678',
  email: 'ana@mail.com',
  ...over,
});

describe('clienteDto.adapter', () => {
  it('mapea nombre, telefono y email del formulario', () => {
    const dto = clienteDtoAdapter(form());

    expect(dto).toEqual({
      nombre: 'Ana',
      telefono: '+5491112345678',
      email: 'ana@mail.com',
    });
  });

  it('normaliza el telefono local al formato internacional de WhatsApp', () => {
    // El telefono tambien llega desde el formulario de pedido, que no pasa por
    // el esquema de cliente: el adapter tiene que normalizar igual.
    const dto = clienteDtoAdapter(form({ telefono: '221 15 123-4567' }));

    expect(dto.telefono).toBe('+5492211234567');
  });

  it('deja el telefono en undefined cuando el numero no alcanza', () => {
    // Mandar un numero inventado es peor que no mandarlo: el back guarda el
    // cliente sin telefono y se corrige despues.
    expect(clienteDtoAdapter(form({ telefono: '' })).telefono).toBeUndefined();
    expect(clienteDtoAdapter(form({ telefono: '123' })).telefono).toBeUndefined();
    expect(clienteDtoAdapter(form({ telefono: undefined })).telefono).toBeUndefined();
  });

  it('convierte a null el email undefined', () => {
    const dto = clienteDtoAdapter(form({ email: undefined }));

    expect(dto.email).toBeNull();
  });

  it('respeta el email vacio: solo undefined se traduce a null', () => {
    // El formulario arranca con email '' y el esquema lo acepta; el DTO lo
    // manda tal cual en vez de convertirlo en null.
    expect(clienteDtoAdapter(form({ email: '' })).email).toBe('');
  });

  it('no filtra campos que el DTO no debe mandar', () => {
    // El formulario puede traer mas datos del cliente (id, resumen, pedidos):
    // el body de alta/edicion solo lleva estos tres campos.
    const dto = clienteDtoAdapter(form());

    expect(Object.keys(dto).sort()).toEqual(['email', 'nombre', 'telefono']);
  });
});
