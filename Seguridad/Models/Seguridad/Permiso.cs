using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Reflection;

namespace Seguridad.Models.Seguridad
{
    public class Permiso
    {
        public int id { get; set; }

        [ForeignKey("Roles")]
        public int rolId { get; set; }

        public Rol? rolPermisoFk { get; set; }

        [ForeignKey("Modulos")]
        public int moduloId { get; set; }

        public Modulo? moduloPermisoFk { get; set; }

        public bool leer { get; set; }
        public bool editar { get; set; }
        public bool consultar { get; set; }
        public bool insertar { get; set; }
        public bool eliminar { get; set; }
        public bool exportar { get; set; }
        public bool importar { get; set; }
    }
}
