using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Seguridad.Filters;
using Seguridad.Models;
using Seguridad.Models.Contratos;
using Seguridad.Models.Seguridad;
using System.Diagnostics.Contracts;

namespace Contratos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[ServiceFilter(typeof(PermisoAuthorizationFilter))]
    public class ContratoController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public ContratoController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("insertar")]
        public async Task<IActionResult> insertar(Contrato contrato)
        {
            await _context.Contrato.AddAsync(contrato);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("lectura")]
        public async Task<ActionResult<IEnumerable<Usuario>>> lectura()
        {
            var contrato = await _context.Contrato
                .ToListAsync();

            return Ok(contrato);
        }


        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(int Id, Contrato contrato)
        {
            var ContratoExistente = await _context.Contrato.FindAsync(Id);

            ContratoExistente.numero = contrato.numero;
            ContratoExistente.empresaId = contrato.empresaId;
            ContratoExistente.usuarioAsignaId = contrato.usuarioAsignaId;
            ContratoExistente.usuarioContratistaId = contrato.usuarioContratistaId;
            ContratoExistente.valor = contrato.valor;
            ContratoExistente.duracion = contrato.duracion;
            ContratoExistente.fechaInicio = contrato.fechaInicio;
            ContratoExistente.fechaFin = contrato.fechaFin;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int Id)
        {
            var ContratoBorrado = await _context.Contrato.FindAsync(Id);

            _context.Contrato.Remove(ContratoBorrado);

            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("consultar")]
        public async Task<ActionResult<Usuario>> consultar(int id)
        {
            var contrato = await _context.Contrato .FindAsync(id);  

            if (contrato == null)
            {
                return NotFound();
            }

            return Ok(contrato);
        }
    }
}
