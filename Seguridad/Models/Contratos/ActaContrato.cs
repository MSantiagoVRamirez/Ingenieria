using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Seguridad.Models.Contratos
{
    public class ActaContrato
    {
        public int id { get; set; }

        [ForeignKey("Contrato")]
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public int contratoId { get; set; }
        public Contrato? actaContratoFk { get; set; }

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
