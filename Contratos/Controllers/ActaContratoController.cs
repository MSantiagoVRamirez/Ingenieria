using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Seguridad.Models;
using Seguridad.Models.Contratos;

namespace Contratos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ServiceFilter(typeof(PermisoAuthorizationFilter))]
    public class ActaContratoController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public ActaContratoController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("insertar")]
        public async Task<IActionResult> insertar(ActaContrato actas)
        {
            await _context.ActaContrato.AddAsync(actas);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("lectura")]
        public async Task<ActionResult<IEnumerable<ActaContrato>>> lectura()
        {
            var actas = await _context.ActaContrato
            .ToListAsync();

            return Ok(actas);
        }
        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int id)
        {
            ActaContrato actas = await _context.ActaContrato.FindAsync(id);

            if (actas == null)
            {
                return NotFound();
            }
            return Ok(actas);
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(int id, ActaContrato actas)
        {
            var ActaExistente = await _context.ActaContrato.FindAsync(id);

            ActaExistente.contratoId = actas.contratoId;
            ActaExistente.nombre = actas.nombre;
            ActaExistente.descripcion = actas.descripcion;
            ActaExistente.documento = actas.documento;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int Id)
        {
            var ActaContratosBorrado = await _context.ActaContrato.FindAsync(Id);

            _context.ActaContrato.Remove(ActaContratosBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
