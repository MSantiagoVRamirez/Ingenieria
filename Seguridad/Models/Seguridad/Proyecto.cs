using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Seguridad.Models.Seguridad
{
    public class Proyecto
    {
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }

        [ForeignKey("Usuarios")]
        public int liderId { get; set; }
        public Usuario? liderProyectoFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(500, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [DataType(DataType.MultilineText)]
        public string descripcion { get; set; }
    }
}
