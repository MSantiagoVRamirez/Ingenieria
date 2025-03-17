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
        public async Task<IActionResult> insertar(Usuario usuario)
        {
            var rolExistente = await _context.Rol.FindAsync(usuario.rolId);
            if (rolExistente == null)
            {
                return BadRequest("El rol especificado no existe.");
            }
            // Valida que la contraseña y la confirmación coincidan
            if (usuario.password != usuario.confirmPassword)
            {
                return BadRequest("Error: La contraseña no coincide.");
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
        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(Usuario usuario)
        {
            var usuarioExistente = await _context.Usuario.FindAsync(usuario.id);
            if (usuarioExistente == null)
            {
                return NotFound();
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

            try
            {
                _context.Usuario.Update(usuarioExistente);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {

                return StatusCode(500, "Error al actualizar el Usuario en la base de datos.");
            }
            return Ok();
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
