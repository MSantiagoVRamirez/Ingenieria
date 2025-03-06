using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Seguridad.Models.Seguridad;

namespace Seguridad.Models.Contratos
{
    public class ODS
    {
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(250, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string descripcion { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal valorInical { get; set; }

        public int duracion { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Date)]
        public DateTime fechaInicio { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Date)]
        public DateTime fechaFin {  get; set; }

       
        [DataType(DataType.Date)]
        public DateTime? fechaInicioSuspension { get; set; }

        [DataType(DataType.Date)]
        public DateTime? fechaFinSuspension { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal valorActual { get; set; }

        public enum Estado
        {
            Pendiente,
            EnProceso,
            Completado,
            Cancelado
        }
        public Estado estado { get; set; }

        
        [ForeignKey("Usuario")]
        public int supervisorId { get; set; }
        public Usuario? supervisorODSFk { get; set; }

        [ForeignKey("Usuario")]
        public int solicitanteId { get; set; }
        public Usuario? solicitanteODSFk { get; set; }
        public enum Recurso
        {
            OPEX,
            CAPEX,
            Mixto
        }
        public Recurso recurso { get; set; }

        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string plantaSistema {  get; set; }

        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string conexoObra {  get; set; }

        [ForeignKey("Proyecto")]
        public int proyectoId { get; set; }
        public Proyecto? proyectoODSFk { get; set; }

        [ForeignKey("Troncal")]
        public int troncalId { get; set; }
        public Troncal? troncalODSFk { get; set; }

        [ForeignKey("Contrato")]
        public int contratoId { get; set; }
        public Contrato? contratoODSFk { get; set; }

        [ForeignKey("AmpliacionContrato")]
        public int? ampliacionContratoId { get; set; }
        public AmpliacionContrato? ampliacionConODSFk { get; set; }
    }
}
