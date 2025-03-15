using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Seguridad.Filters;
using Seguridad.Models;
using Seguridad.Models.Seguridad;
using Seguridad.Service;

namespace Seguridad.Controllers.Seguridad
{
    [Route("api/[controller]")]
    [ApiController]
    //[ServiceFilter(typeof(PermisoAuthorizationFilter))]
    public class UsuarioController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public UsuarioController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("insertar")]
        public async Task<IActionResult> insertar([FromBody] Usuario usuario)
        {
            var rolExistente = await _context.Rol.FindAsync(usuario.rolId);
            if (rolExistente == null)
            {
                return BadRequest("El rol especificado no existe.");
            }

            usuario.password = Encriptar.EncriptarClave(usuario.password);
            usuario.confirmPassword = Encriptar.EncriptarClave(usuario.confirmPassword);
            usuario.fechaCreacion = DateTime.Now;

            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(usuario);
        }

        [HttpGet("leer")]
        public async Task<ActionResult<IEnumerable<Usuario>>> leer()
        {
            var usuario = await _context.Usuario
                .ToListAsync();

            return Ok(usuario);
        }

        [HttpGet("consultar")]
        public async Task<ActionResult<Usuario>> consultar(int id)
        {
            var usuario = await _context.Usuario
                .FirstOrDefaultAsync(u => u.id == id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        [HttpPut("editar")]
        public async Task<IActionResult> editar(int id, [FromBody] Usuario usuario)
        {
            var usuarioExistente = await _context.Usuario.FindAsync(id);
            if (usuarioExistente == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            usuarioExistente.usuario = usuario.usuario;
            usuarioExistente.password = Encriptar.EncriptarClave(usuario.password);
            usuarioExistente.confirmPassword = Encriptar.EncriptarClave(usuario.confirmPassword);
            usuarioExistente.nombres = usuario.nombres;
            usuarioExistente.apellidos = usuario.apellidos;
            usuarioExistente.correo = usuario.correo;
            usuarioExistente.telefono = usuario.telefono;
            usuarioExistente.fechaExpiracion = usuario.fechaExpiracion;
            usuarioExistente.empresaId = usuario.empresaId;
            usuarioExistente.rolId = usuario.rolId;

            await _context.SaveChangesAsync();
            return Ok("Usuario actualizado exitosamente.");
        }

        [HttpDelete("eliminar")]
        public async Task<IActionResult> eliminar(int id)
        {
            var usuarioBorrado = await _context.Usuario.FindAsync(id);
            if (usuarioBorrado == null)
            {
                return NotFound("Usuario no encontrado.");
            }

            _context.Usuario.Remove(usuarioBorrado);
            await _context.SaveChangesAsync();

            return Ok("Usuario eliminado exitosamente.");
        }
    }
}
