using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Proyecto_LucyCaceres.Controllers
{
    public class OficialController : Controller
    {
        // GET: Oficial
        public ActionResult Index()
        {
            return View();
        } 
        
        public ActionResult Usuario()
        {
            return View();
        }
        public ActionResult MediosTrasporte()
        {
            return View();
        }
        public ActionResult TipoDocumentos()
        {
            return View();
        } 
        
        public ActionResult MediosTrasporteCiudadano()
        {
            return View();
        }
        public ActionResult TipoDocumentosCiudadano()
        {
            return View();
        }
    }
}