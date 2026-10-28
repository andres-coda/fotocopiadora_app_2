import { useEffect, useState } from 'react';
import Texto from '../../../../componente-estilo/texto/texto';
import { RolUsuario, usuarioProps } from '../../../../modelo/usuario/Usuario.interface';
import useUsuariosApi from '../../../../servicio/usuario/useUsuariosApi';

const etiquetaRol = (rol: RolUsuario): string => {
  if (rol === 'admin') return 'Administrador';
  if (rol === 'super_admin') return 'Administrador general';
  return 'Operador';
};

interface Props {
  /** Sube cuando el alta confirma: obliga a volver a pedir la lista. */
  version: number;
}

/**
 * Listado de solo lectura de los usuarios de la empresa.
 * El alta vive en el modal (`UsuarioCrear`); aca no hay edicion porque el back
 * no expone un endpoint para que un admin edite a otro usuario.
 */
const UsuariosEmpresa = ({ version }: Props) => {
  const { obtenerUsuarios, responseUsuarios, loadingUsuarios, errorFetchUsuarios } =
    useUsuariosApi();

  // `useApiPaginado` limpia su `response` a los 3 segundos: si se leyera
  // directo, la lista desapareceria sola. Se copia a estado propio.
  const [usuarios, setUsuarios] = useState<usuarioProps[]>([]);

  useEffect(() => {
    obtenerUsuarios({ limite: 100, pagina: 1 });
    // `obtenerUsuarios` se recrea en cada render, asi que no va en las
    // dependencias: el disparador real es la version que sube el padre.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  useEffect(() => {
    if (responseUsuarios) setUsuarios(responseUsuarios.datos);
  }, [responseUsuarios]);

  if (errorFetchUsuarios) return <Texto texto={errorFetchUsuarios} error chica />;
  if (loadingUsuarios && usuarios.length === 0)
    return <Texto texto="Cargando usuarios..." chica />;
  if (usuarios.length === 0) return <Texto texto="Todavia no hay usuarios cargados" chica />;

  return (
    <div className="usuarios-lista">
      {usuarios.map(u => (
        <div key={u.id} className="usuarios-fila">
          <div className="usuarios-fila__datos">
            <Texto texto={u.nombre} negrita />
            <Texto texto={u.email || 'Sin email'} chica />
          </div>
          <Texto texto={etiquetaRol(u.role)} chica />
        </div>
      ))}
    </div>
  );
};

export default UsuariosEmpresa;
