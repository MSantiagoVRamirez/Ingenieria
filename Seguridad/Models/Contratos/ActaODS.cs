using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Seguridad.Models.Contratos
{
    public class ActaODS
    {
        public int id { get; set; }

        [ForeignKey("ODS")]
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public int odsId { get; set; }
        public ODS? actaOdsFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(500, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [DataType(DataType.MultilineText)]
        public string descripcion { get; set; }

        [DataType(DataType.Url)]
        public string? documento { get; set; }
    }
}
