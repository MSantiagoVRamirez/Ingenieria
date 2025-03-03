using Microsoft.EntityFrameworkCore;
using Seguridad.Models;
using Seguridad.Models.Seguridad;
using System.Data;

namespace Seguridad.Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IngenieriaContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UsuarioService(IngenieriaContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<Usuario?> GetUsuario(string nombreUsuario, string contraseña)
        {
            string contraseñaEncriptada = Encriptar.EncriptarClave(contraseña);

            var usuario = await _context.Usuario
                .Include(u => u.rolUsuarioFk)
                .FirstOrDefaultAsync(u => u.usuario == nombreUsuario && u.password == contraseñaEncriptada);

            return usuario;
        }
        public async Task<string?> GetRolNombrePorUsuario(int usuarioId)
        {
            var usuario = await _context.Usuario
                .Include(u => u.rolUsuarioFk)
                .FirstOrDefaultAsync(u => u.id == usuarioId);

            return usuario?.rolUsuarioFk?.nombre;
        }
        public async Task<List<Permiso>> ObtenerPermisosPorRolId(int rolId)
        {
            return await _context.Permiso
                .Where(p => p.rolId == rolId)
                .ToListAsync();
        }
        public async Task<int> ObtenerModuloIdPorNombre(string nombreControlador)
        {

            var modulo = await _context.Modulo
                .FirstOrDefaultAsync(m => m.nombre == nombreControlador);

            return modulo?.id ?? 0;
        }
        public async Task<Rol> ObtenerRolPorNombre(string rolNombre)
        {
            if (string.IsNullOrEmpty(rolNombre))
            {
                return null;
            }


            var rol = await _context.Rol
                .FirstOrDefaultAsync(r => r.nombre == rolNombre);

            return rol;
        }
        public async Task<Permiso> ObtenerPermisoPorRolYModulo(int rolId, int moduloId)
        {
            // Realiza la consulta para buscar el permiso específico basado en rolId y moduloId
            var permiso = await _context.Permiso
                .FirstOrDefaultAsync(p => p.rolId == rolId && p.moduloId == moduloId);

            return permiso;
        }
    }
}
