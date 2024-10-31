using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto_LucyCaceres.Models
{
    public class TipoDocumentoVM
    {
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public Nullable<decimal> precio { get; set; }
    }
}