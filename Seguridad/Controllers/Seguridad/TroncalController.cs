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
    //[ServiceFilter(typeof(PermisoAuthorizationFilter))]
    public class TroncalController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public TroncalController(IngenieriaContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("insertar")]

        public async Task<IActionResult> insertar(Troncal troncales)
        {
            await _context.Troncal.AddAsync(troncales);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("leer")]
        public async Task<ActionResult<IEnumerable<Troncal>>> leer()
        {
            var troncales = await _context.Troncal.ToListAsync();

            return Ok(troncales);
        }
        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int id)
        {
            Troncal troncales = await _context.Troncal.FindAsync(id);

            if (troncales == null)
            {
                return NotFound();
            }
            return Ok(troncales);
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(Troncal troncal)
        {
            var TroncalExistente = await _context.Troncal.FindAsync(troncal.id);
            if (TroncalExistente == null)
            {
                return NotFound();
            }
            TroncalExistente.nombre = troncal.nombre;

            try
            {
                _context.Troncal.Update(TroncalExistente);
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
        public async Task<IActionResult> eliminar(int id)
        {
            var troncalBorrado = await _context.Troncal.FindAsync(id);

            _context.Troncal.Remove(troncalBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
