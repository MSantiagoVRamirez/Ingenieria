using System.ComponentModel.DataAnnotations;

namespace Seguridad.Models.Seguridad
{
    public class Troncal
    {
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }

    }
}
