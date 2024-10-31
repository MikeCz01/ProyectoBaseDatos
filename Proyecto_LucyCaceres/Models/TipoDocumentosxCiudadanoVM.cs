using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto_LucyCaceres.Models
{
    public class TipoDocumentosxCiudadanoVM
    {
        public int id { get; set; }
        public string codigoDocumento { get; set; }
        public string ciudadanoId { get; set; }
        public bool? estadoExamenOral { get; set; }
        public bool? estadoExamenPractico { get; set; }
        public Nullable<System.DateTime> fechaEmision { get; set; }
        public Nullable<System.DateTime> fechaVencimiento { get; set; }
        public bool esRenovacion { get; set; }
        public Nullable<System.DateTime> fechaCita { get; set; }
        public byte[] examenMedico { get; set; }
        public byte[] examenVista { get; set; }
        public byte[] examenPsico { get; set; }
        public byte[] deposito { get; set; }
    }
}