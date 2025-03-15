using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Seguridad.Filters;
using Seguridad.Models;
using Seguridad.Models.Contratos;

namespace Contratos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ServiceFilter(typeof(PermisoAuthorizationFilter))]
    public class ActaODSController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public ActaODSController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("insertar")]
        public async Task<IActionResult> insertar(ActaODS actasODS)
        {
            await _context.ActaODS.AddAsync(actasODS);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("leer")]
        public async Task<ActionResult<IEnumerable<ActaODS>>> Leer()
        {
            var actasODS = await _context.ActaODS.ToListAsync();

            return Ok(actasODS);
        }
        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int id)
        {
            ActaODS actasODS = await _context.ActaODS .FindAsync(id);

            if (actasODS == null)
            {
                return NotFound();
            }
            return Ok(actasODS);
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(int id, ActaODS actasODS)
        {
            var ActaODSExistente = await _context.ActaODS.FindAsync(id);

            ActaODSExistente.odsId = actasODS.odsId;
            ActaODSExistente.nombre = actasODS.nombre;
            ActaODSExistente.descripcion = actasODS.descripcion;
            ActaODSExistente.documento  = actasODS.documento;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int id)
        {
            var ActaODSBorrado = await _context.ActaODS.FindAsync(id);

            _context.ActaODS.Remove(ActaODSBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
