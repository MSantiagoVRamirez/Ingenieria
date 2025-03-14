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
    public class ProyectoController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public ProyectoController(IngenieriaContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("insertar")]

        public async Task<IActionResult> insertar(Proyecto proyecto)
        {
            await _context.Proyecto.AddAsync(proyecto);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("leer")]
        public async Task<ActionResult<IEnumerable<Proyecto>>> leer()
        {
            var proyecto = await _context.Proyecto.ToListAsync();

            return Ok(proyecto);
        }
        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int Id)
        {
            Proyecto proyecto = await _context.Proyecto.FindAsync(Id);

            if (proyecto == null)
            {
                return NotFound();
            }
            return Ok(proyecto);
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(int Id, Proyecto proyecto)
        {
            var ProyectoExistente = await _context.Proyecto.FindAsync(Id);

            ProyectoExistente.nombre = proyecto.nombre;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int Id)
        {
            var ProyectoBorrado = await _context.Proyecto.FindAsync(Id);

            _context.Proyecto.Remove(ProyectoBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
