using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Proyecto_LucyCaceres.Controllers
{
    public class DigitadorController : Controller
    {
        // GET: Digitador
        public ActionResult Index()
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
        public ActionResult Ciudadano()
        {
            return View();
        }
    }
}