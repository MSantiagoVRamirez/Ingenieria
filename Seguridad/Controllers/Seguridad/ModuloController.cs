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
    public class ModuloController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public ModuloController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("insertar")]

        public async Task<IActionResult> insertar(Modulo modulo)
        {
            await _context.Modulo.AddAsync(modulo);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpGet]
        [Route("leer")]
        public async Task<ActionResult<IEnumerable<Modulo>>> leer()
        {
            var modulo = await _context.Modulo.ToListAsync();

            return Ok(modulo);
        }
        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int id)
        {
            Modulo modulo = await _context.Modulo.FindAsync(id);

            if (modulo == null)
            {
                return NotFound();
            }
            return Ok(modulo);
        }
        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(int id, Modulo modulo)
        {
            var ModuloExistente = await _context.Modulo.FindAsync(id);

            ModuloExistente!.nombre = modulo.nombre;
            ModuloExistente.estado = modulo.estado;


            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int id)
        {
            var ModuloBorrado = await _context.Modulo.FindAsync(id);

            _context.Modulo.Remove(ModuloBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
