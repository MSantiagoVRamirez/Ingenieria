using Seguridad.Models.Seguridad;

namespace Seguridad.Service
{
    public interface IUsuarioService
    {
        Task<Usuario?> GetUsuario(string nombreUsuario, string contraseña);
        Task<string?> GetRolNombrePorUsuario(int usuarioId);
        Task<List<Permiso>> ObtenerPermisosPorRolId(int rolId);
        Task<int> ObtenerModuloIdPorNombre(string nombreControlador);
        Task<Rol> ObtenerRolPorNombre(string rolNombre);
        Task<Permiso> ObtenerPermisoPorRolYModulo(int rolId, int moduloId);
    }
}


