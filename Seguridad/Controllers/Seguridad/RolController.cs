using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Seguridad.Filters;
using Seguridad.Models;
using Seguridad.Models.Seguridad;

namespace Seguridad.Controllers.Seguridad
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(PermisoAuthorizationFilter))]
    public class RolController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public RolController(IngenieriaContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("lectura")]
        public async Task<ActionResult<IEnumerable<Rol>>> lectura()
        {
            var rol = await _context.Rol.ToListAsync();

            return Ok(rol);
        }
        [HttpPost]
        [Route("insertar")]

        public async Task<IActionResult> insertar(Rol rol)
        {
            await _context.Rol.AddAsync(rol);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(Rol rol)
        {
            var rolExistente = await _context.Rol.FindAsync(rol.id);
            if (rolExistente == null)
            {
                return NotFound();
            }
            rolExistente.nombre = rol.nombre;
            rolExistente.estado = rol.estado;

            try
            {
                _context.Rol.Update(rolExistente);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {

                return StatusCode(500, "Error al actualizar el rol en la base de datos.");
            }
            return Ok();
        }
        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int Id)
        {
            var RolBorrado = await _context.Rol.FindAsync(Id);

            _context.Rol.Remove(RolBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
