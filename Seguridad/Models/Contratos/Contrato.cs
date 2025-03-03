using Seguridad.Models.Seguridad;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Seguridad.Models.Contratos
{
    public class Contrato
    {
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string numero { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(500, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        [DataType(DataType.MultilineText)]
        public string objeto { get; set; }

        [ForeignKey("Empresa")]
        public int empresaId { get; set; }
        public Empresa? empresaContratoFk { get; set; }

        [ForeignKey("Usuario")]
        public int usuarioAsignaId { get; set; }
        public Usuario? usuarioAsignaConFk { get; set; }

        [ForeignKey("Usuario")]
        public int usuarioContratistaId { get; set; }
        public Usuario? usuarioContratistaFk { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal valor { get; set; }

        public int duracion { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Date)]
        public DateTime fechaInicio { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Date)]
        public DateTime fechaFin { get; set; }

    }
}
