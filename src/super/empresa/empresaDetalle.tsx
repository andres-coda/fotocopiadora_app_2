import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { appStore } from '../../redux/store';
// useNavigate not needed here.
import Texto from '../../componente-estilo/texto/texto';
import { ContenedorCentro } from '../../componente-estilo/centro/centroExterior';
import PerfilEmpresa from '../../privado/paginas/perfil/componente/perfilEmpresa';
import useEmpresaApi from '../../servicio/empresa/useEmpresaApi';
import useUsuariosApi from '../../servicio/usuario/useUsuariosApi';
import useUsuarioApi from '../../servicio/usuario/useUsuarioApi';
import { usuarioProps } from '../../modelo/usuario/Usuario.interface';
import { EmpresaProp } from '../../modelo/Entidades/empresa/empresa.interface';

const EmpresaDetalle = () => {
  const empresaRedux = useSelector((store: appStore) => store.empresa);
  const empresaSeleccionada: EmpresaProp | undefined = empresaRedux.datoSeleccionado;

  const { obtenerEmpresaById, responseEmpresa, loadingEmpresa, errorFetchEmpresa } = useEmpresaApi();
  const { obtenerUsuarios, responseUsuarios, loadingUsuarios, errorFetchUsuarios } = useUsuariosApi();
  const { cambiarRol } = useUsuarioApi();

  const [empresa, setEmpresa] = useState<EmpresaProp | undefined>(empresaSeleccionada);

  useEffect(() => {
    if (empresaSeleccionada?.id) {
      obtenerEmpresaById(empresaSeleccionada.id);
      obtenerUsuarios({ limite: 100, pagina: 1 });
    }
  }, []);

  useEffect(() => {
    if (responseEmpresa) setEmpresa(responseEmpresa);
  }, [responseEmpresa]);

  if (!empresaSeleccionada) {
    return (
      <ContenedorCentro>
        <Texto texto="No hay empresa seleccionada" />
      </ContenedorCentro>
    );
  }

  const usuariosDeEmpresa = responseUsuarios?.datos ?? [];

  return (
    <ContenedorCentro loading={loadingEmpresa} error={errorFetchEmpresa ?? undefined}>
      {empresa && (
        <>
          <PerfilEmpresa empresa={empresa} />
          <div style={{ marginTop: '1rem' }}>
            <Texto texto="Usuarios" mediana negrita />
            {loadingUsuarios && <Texto texto="Cargando usuarios..." />}
            {errorFetchUsuarios && <Texto texto={errorFetchUsuarios} error />}
            {usuariosDeEmpresa.map((u: usuarioProps) => (
              <UsuarioRoleRow
                key={u.id}
                usuario={u}
                onCambiarRol={(id, role) => cambiarRol(id, role)}
              />
            ))}
          </div>
        </>
      )}
    </ContenedorCentro>
  );
};

const UsuarioRoleRow = ({
  usuario,
  onCambiarRol,
}: {
  usuario: usuarioProps;
  onCambiarRol: (id: string, role: string) => void;
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
      <Texto texto={usuario.nombre} />
      <Texto texto={usuario.email} chica />
      <Texto texto={`(${usuario.role})`} chica />
      <select
        value={usuario.role}
        onChange={e => onCambiarRol(usuario.id, e.target.value)}
      >
        <option value="operador">Operador</option>
        <option value="admin">Administrador</option>
      </select>
    </div>
  );
};

export default EmpresaDetalle;