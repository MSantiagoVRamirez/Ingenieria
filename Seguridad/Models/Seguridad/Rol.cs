using System.ComponentModel.DataAnnotations;

namespace Seguridad.Models.Seguridad
{
    public class Rol
    {
        public int id { get; set; }

        [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }
        public bool estado { get; set; }
    }
}
