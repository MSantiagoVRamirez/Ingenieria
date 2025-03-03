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
    public class AmpliacionContratoController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public AmpliacionContratoController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("insertar")]
        public async Task<IActionResult> insertar(AmpliacionContrato ampliacionContrato)
        {
            await _context.AmpliacionContrato.AddAsync(ampliacionContrato);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("lectura")]
        public async Task<ActionResult<IEnumerable<AmpliacionContrato>>> lectura()
        {
            var ampliacionContrato = await _context.AmpliacionContrato
            .Include(am => am.contratoAmpliacionFk)
            .ToListAsync();

            return Ok(ampliacionContrato);
        }
        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int id)
        {
            AmpliacionContrato ampliacionContrato = await _context.AmpliacionContrato
            .Include(am => am.contratoAmpliacionFk)
            .FirstOrDefaultAsync(am => am.id == id);

            if (ampliacionContrato == null)
            {
                return NotFound();
            }
            return Ok(ampliacionContrato);
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar(int id, AmpliacionContrato ampliacionContrato)
        {
            var AmpliacionContratoExistente = await _context.AmpliacionContrato.FindAsync(id);

            AmpliacionContratoExistente.contratoId = ampliacionContrato.contratoId;
            AmpliacionContratoExistente.fechaInicio = ampliacionContrato.fechaInicio;
            AmpliacionContratoExistente.fechaFin = ampliacionContrato.fechaFin;
            AmpliacionContratoExistente.valor = ampliacionContrato.valor;
            AmpliacionContratoExistente.duracion = ampliacionContrato.duracion;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int Id)
        {
            var AmpliacionContratoBorrado = await _context.AmpliacionContrato.FindAsync(Id);

            _context.AmpliacionContrato.Remove(AmpliacionContratoBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
