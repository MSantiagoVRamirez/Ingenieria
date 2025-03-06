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
        [HttpGet]
        [Route("lectura")]
        public async Task<ActionResult<IEnumerable<Modulo>>> lectura()
        {
            var modulo = await _context.Modulo.ToListAsync();

            return Ok(modulo);
        }
        [HttpGet]
        [Route("consulta")]
        public async Task<IActionResult> consulta(int id)
        {
            Modulo modulo = await _context.Modulo.FindAsync(id);

            if (modulo == null)
            {
                return NotFound();
            }
            return Ok(modulo);
        }


        [HttpPost]
        [Route("insertar")]

        public async Task<IActionResult> insertar(Modulo modulo)
        {
            await _context.Modulo.AddAsync(modulo);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
