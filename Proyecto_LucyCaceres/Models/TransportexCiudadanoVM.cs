using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Proyecto_LucyCaceres.Models
{
    public class TransportexCiudadanoVM
    {
        public int id { get; set; }
        public Nullable<int> idTransporte { get; set; }
        public string transporte { get; set; }
        public string ciudadanoId { get; set; }
        public string marca { get; set; }
        public string model { get; set; }
        public string placa { get; set; }
        public string ano { get; set; }
    }
}