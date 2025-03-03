using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Seguridad.Models.Seguridad
{
    public class Usuario
    {
        public int id { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(50, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string usuario { get; set; } = null!;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Password)] // maxixmo 12 caracteres 
        public string password { get; set; } = null!;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [DataType(DataType.Password)] // maxixmo 12 caracteres 
        public string confirmPassword { get; set; } = null!;

        //[DataType(DataType.Url)]
        //public string? fotoPerfil { get; set; }

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string nombres { get; set; } = null!;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [MaxLength(100, ErrorMessage = "El campo {0} debe tener máximo {1} caracteres")]
        public string apellidos { get; set; } = null!;

        [Required(ErrorMessage = "El campo {0} es obligatorio")]
        [EmailAddress(ErrorMessage = "El campo {0} no es una dirección de correo válida")]
        public string correo { get; set; } = null!;

        [Phone(ErrorMessage = "El campo {0} no es un número de teléfono válido")]
        public string telefono { get; set; } = null!;


        [DataType(DataType.Date)]
        public DateTime? fechaCreacion { get; set; }

        [DataType(DataType.Date)]
        public DateTime? fechaExpiracion { get; set; }

        [ForeignKey("Empresa")]
        public int empresaId { get; set; }
        public Empresa? empresaUsuarioFk { get; set; }

        [ForeignKey("Rol")]
        public int rolId { get; set; }
        public Rol? rolUsuarioFk { get; set; }
    }
}
