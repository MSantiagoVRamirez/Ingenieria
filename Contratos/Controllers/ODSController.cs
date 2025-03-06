using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Seguridad.Filters;
using Seguridad.Models;
using Seguridad.Models.Contratos;
using Seguridad.Models.Seguridad;

namespace Contratos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ServiceFilter(typeof(PermisoAuthorizationFilter))]
    public class ODSController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public ODSController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("insertar")]
        public async Task<IActionResult> insertar(ODS ods)
        {
            await _context.ODS.AddAsync(ods);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("lectura")]
        public async Task<ActionResult<IEnumerable<Usuario>>> lectura()
        {
            var contrato = await _context.ODS
                .ToListAsync();

            return Ok(contrato);
        }

        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int id)
        {
            ODS oDS = await _context.ODS .FindAsync(id);

            if (oDS == null)
            {
                return NotFound();
            }
            return Ok(oDS);
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(int id, ODS oDS)
        {
            var odsExistente = await _context.ODS.FindAsync(id);

            odsExistente.nombre = oDS.nombre;
            odsExistente.descripcion = oDS.descripcion;
            odsExistente.valorInical = oDS.valorInical;
            odsExistente.duracion = oDS.duracion;
            odsExistente.fechaInicio = oDS.fechaInicio;
            odsExistente.fechaFin = oDS.fechaFin;
            odsExistente.fechaInicioSuspension = oDS.fechaInicioSuspension;
            odsExistente.fechaFinSuspension = oDS.fechaFinSuspension;
            odsExistente.valorActual = oDS.valorActual;
            odsExistente.estado = oDS.estado;
            odsExistente.supervisorId = oDS.supervisorId;
            odsExistente.solicitanteId = oDS.solicitanteId;
            odsExistente.recurso = oDS.recurso;
            odsExistente.plantaSistema = oDS.plantaSistema;
            odsExistente.conexoObra = oDS.conexoObra;
            odsExistente.proyectoId = oDS.proyectoId;
            odsExistente.troncalId = oDS.troncalId;
            odsExistente.contratoId = oDS.contratoId;
            odsExistente.ampliacionContratoId = oDS.ampliacionContratoId;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int id)
        {
            var ODSBorrado = await _context.ODS.FindAsync(id);

            _context.ODS.Remove(ODSBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
