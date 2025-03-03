using Duende.IdentityServer.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Seguridad.Models.Contratos
{
    public class AmpliacionContrato
    {
        public int id { get; set; }

        [ForeignKey("Contrato")]
        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        public int contratoId { get; set; }
        public Contrato? contratoAmpliacionFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Date)]
        public DateTime fechaInicio { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Date)]
        public DateTime fechaFin { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal valor { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "El campo {0} debe ser un valor no negativo")]
        public int duracion { get; set; }
    }
}
