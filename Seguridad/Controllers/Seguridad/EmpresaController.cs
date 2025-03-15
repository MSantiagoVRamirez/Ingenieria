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
    public class EmpresaController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public EmpresaController(IngenieriaContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("insertar")]

        public async Task<IActionResult> insertar(Empresa empresa)
        {
            await _context.Empresa.AddAsync(empresa);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("leer")]
        public async Task<ActionResult<IEnumerable<Empresa>>> leer()
        {
            var empresa = await _context.Empresa.ToListAsync();

            return Ok(empresa);
        }
        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int id)
        {
            Empresa empresa = await _context.Empresa.FindAsync(id);

            if (empresa == null)
            {
                return NotFound();
            }
            return Ok(empresa);
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(Empresa empresa)
        {
            var EmpresaExistente = await _context.Empresa.FindAsync(empresa.id);
            if (EmpresaExistente == null)
            {
                return NotFound();
            }
            EmpresaExistente.nombre = empresa.nombre;
            EmpresaExistente.nit = empresa.nit;


            try
            {
                _context.Empresa.Update(EmpresaExistente);
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
            var EmpresaBorrado = await _context.Empresa.FindAsync(id);

            _context.Empresa.Remove(EmpresaBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
