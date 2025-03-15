using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Seguridad.Models.Seguridad;
using Seguridad.Service;
using System.Security.Claims;
using Seguridad.Models;

namespace Seguridad.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IngenieriaContext _context;
        private readonly IUsuarioService _usuarioService;

        public LoginController(IngenieriaContext context, IUsuarioService usuarioService)
        {
            _context = context;
            _usuarioService = usuarioService;
        }
        [HttpPost("registro")]
        public async Task<IActionResult> registroUsuario([FromBody] Usuario usuario)
        {
            // Verifica si el rol especificado existe
            var rolExistente = await _context.Rol.FindAsync(usuario.rolId);
            if (rolExistente == null)
            {
                return BadRequest("El rol especificado no existe.");
            }

            // Valida que la contraseña y la confirmación coincidan
            if (usuario.password != usuario.confirmPassword)
            {
                return BadRequest("Error: La contraseña no coincide.");
            }

            // Encripta la contraseña y configura otros datos
            usuario.password = Encriptar.EncriptarClave(usuario.password);
            usuario.confirmPassword = Encriptar.EncriptarClave(usuario.password);
            usuario.fechaCreacion = DateTime.Now;
            usuario.rolId = 1;
            usuario.rolUsuarioFk = rolExistente;

            // Agrega el usuario a la base de datos
            _context.Usuario.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(usuario);
        }

        [HttpPost("iniciarSesion")]
        public async Task<IActionResult> iniciarSesion([FromBody] IniciarSesionRequest request)
        {
            if (string.IsNullOrEmpty(request.usuario) || string.IsNullOrEmpty(request.password))
            {
                return BadRequest("Por favor, complete todos los campos.");
            }

            var usuario = await _usuarioService.GetUsuario(request.usuario, request.password);

            if (usuario == null)
            {
                return Unauthorized("Nombre de usuario o contraseña incorrectos.");
            }

            var rolId = usuario.rolId;
            var permisos = await _usuarioService.ObtenerPermisosPorRolId(rolId);

            // Crea los claims, incluyendo el ID del rol en lugar del nombre
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, usuario.usuario),
        new Claim(ClaimTypes.NameIdentifier, usuario.id.ToString()),
        new Claim("RoleId", rolId.ToString()) // Guarda el ID del rol en lugar del nombre del rol
    };

            // Agrega los permisos como claims
            foreach (var permiso in permisos)
            {
                claims.Add(new Claim("Permiso_" + permiso.moduloId, $"{permiso.leer}:{permiso.editar}:{permiso.insertar}:{permiso.eliminar}:{permiso.exportar}:{permiso.importar}"));
            }

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);

            return Ok(new { Message = "Inicio de sesión exitoso", usuario });
        }
        [HttpPost("cerrarSesion")]
        public async Task<IActionResult> cerrarSesion()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok(new { Message = "Sesión cerrada exitosamente" });
        }

    }
}
