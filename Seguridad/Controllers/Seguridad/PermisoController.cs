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
    [ServiceFilter(typeof(PermisoAuthorizationFilter))]
    public class PermisoController : ControllerBase
    {
        private readonly IngenieriaContext _context;

        public PermisoController(IngenieriaContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("lectura")]
        public async Task<ActionResult<IEnumerable<Permiso>>> lectura()
        {
            var permiso = await _context.Permiso.ToListAsync();

            return Ok(permiso);
        }

        [HttpGet]
        [Route("consulta")]
        public async Task<IActionResult> consulta(int id)
        {
            Permiso permiso = await _context.Permiso.FindAsync(id);

            if (permiso == null)
            {
                return NotFound();
            }
            return Ok(permiso);
        }

        [HttpPost]
        [Route("insertar")]
        public async Task<IActionResult> insertar(Permiso permisos)
        {
            await _context.Permiso.AddAsync(permisos);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete]
        [Route("eliminar")]
        public async Task<IActionResult> eliminar(int id)
        {
            var PermisoBorrado = await _context.Permiso.FindAsync(id);

            _context.Permiso.Remove(PermisoBorrado);
            await _context.SaveChangesAsync();

            return Ok();

        }
        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar(Permiso permiso)
        {
            // Verificar si el objeto permiso es nulo
            if (permiso == null)
            {
                return BadRequest(new
                {
                    Estado = "no",
                    Mensaje = "El objeto permiso no puede ser nulo"
                });
            }

            // Buscar el permiso existente por su ID
            var Existentepermiso = await _context.Permiso.FindAsync(permiso.id);

            // Verificar si el permiso existente fue encontrado
            if (Existentepermiso == null)
            {
                return NotFound(new
                {
                    Estado = "no",
                    Mensaje = "Permiso no encontrado"
                });
            }

            // Actualizar las propiedades del permiso existente
            Existentepermiso.lectura = permiso.lectura;
            Existentepermiso.editar = permiso.editar;
            Existentepermiso.consultar = permiso.consultar;
            Existentepermiso.insertar = permiso.insertar;
            Existentepermiso.eliminar = permiso.eliminar;
            Existentepermiso.exportar = permiso.exportar;
            Existentepermiso.importar = permiso.importar;

            // Guardar los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Retornar una respuesta exitosa
            return Ok(new
            {
                Estado = "ok",
                Mensaje = "Permiso actualizado correctamente"
            });
        }
    }
}
