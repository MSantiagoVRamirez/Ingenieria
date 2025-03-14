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
    public class OrdenCambioController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public OrdenCambioController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("insertar")]
        public async Task<IActionResult> insertar(OrdenCambio ordenCambio)
        {
            await _context.OrdenCambio.AddAsync(ordenCambio);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("Leer")]
        public async Task<ActionResult<IEnumerable<OrdenCambio>>> Leer()
        {
            var ordenCambio = await _context.OrdenCambio
            .ToListAsync();

            return Ok(ordenCambio);
        }
        [HttpGet]
        [Route("consultar")]
        public async Task<IActionResult> consultar(int id)
        {
            OrdenCambio ordenCambio = await _context.OrdenCambio.FindAsync(id);

            if (ordenCambio == null)
            {
                return NotFound();
            }
            return Ok(ordenCambio);
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(int Id, OrdenCambio ordenCambio)
        {
            var ordenCambioExistente = await _context.OrdenCambio.FindAsync(Id);

            ordenCambioExistente.odsId = ordenCambio.odsId;
            ordenCambioExistente.fechaInicio = ordenCambio.fechaInicio;
            ordenCambioExistente.fechaFin = ordenCambio.fechaFin;
            ordenCambioExistente.valor = ordenCambio.valor;
            ordenCambioExistente.duracion = ordenCambio.duracion;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> Eliminar(int Id)
        {
            var ordenCambioBorrado = await _context.OrdenCambio.FindAsync(Id);

            _context.OrdenCambio.Remove(ordenCambioBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
