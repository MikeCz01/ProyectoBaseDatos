using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto_LucyCaceres.Models
{
    public class UsuarioVM
    {
        public string dni { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string genero { get; set; }
        public string email { get; set; }
        public string celular { get; set; }
        public string contrasena { get; set; }
        public string rol { get; set; }
        public Nullable<int> rolId { get; set; }
    }
}