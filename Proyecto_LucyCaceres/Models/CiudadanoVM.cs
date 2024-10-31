using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto_LucyCaceres.Models
{
    public class CiudadanoVM
    {
        public string dni { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public System.DateTime fechaNacimiento { get; set; }
        public Nullable<int> edad { get; set; }
        public string genero { get; set; }
        public string direccion { get; set; }
        public string celular { get; set; }
        public string tipoSanguineo { get; set; }
    }
}