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
        [Route("Editar")]
        public async Task<IActionResult> editar(int id, Troncal troncales)
        {
            var TrocalExistente = await _context.Troncal.FindAsync(id);

            TrocalExistente.nombre = troncales.nombre;

            await _context.SaveChangesAsync();
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
