using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Proyecto_LucyCaceres;
using Proyecto_LucyCaceres.Models;

namespace Proyecto_LucyCaceres.Controllers
{
    public class MediosTransportesController : ApiController
    {
        private TransitoEntities db = new TransitoEntities();

        // GET: api/MediosTransportes
        public IQueryable<MediosTransporteVM> GetTipoDocumentos()
        {
            var medTrans = db.MediosTransportes.Select(medT => new MediosTransporteVM
            {
                id = medT.id,
                descripcion = medT.descripcion,
                tipo = medT.tipo,
                categoria = medT.categoria
            });

            return medTrans;
        }

        // GET: api/MediosTransportes/5
        [ResponseType(typeof(MediosTransporte))]
        public IHttpActionResult GetMediosTransporte(int id)
        {
            MediosTransporte mediosTransporte = db.MediosTransportes.Find(id);
            if (mediosTransporte == null)
            {
                return NotFound();
            }

            return Ok(mediosTransporte);
        }

        // PUT: api/MediosTransportes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMediosTransporte(int id, MediosTransporte mediosTransporte)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mediosTransporte.id)
            {
                return BadRequest();
            }

            db.Entry(mediosTransporte).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MediosTransporteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/MediosTransportes
        [ResponseType(typeof(MediosTransporte))]
        public IHttpActionResult PostMediosTransporte(MediosTransporte mediosTransporte)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MediosTransportes.Add(mediosTransporte);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = mediosTransporte.id }, mediosTransporte);
        }

        // DELETE: api/MediosTransportes/5
        [ResponseType(typeof(MediosTransporte))]
        public IHttpActionResult DeleteMediosTransporte(int id)
        {
            MediosTransporte mediosTransporte = db.MediosTransportes.Find(id);
            if (mediosTransporte == null)
            {
                return NotFound();
            }

            db.MediosTransportes.Remove(mediosTransporte);
            db.SaveChanges();

            return Ok(mediosTransporte);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MediosTransporteExists(int id)
        {
            return db.MediosTransportes.Count(e => e.id == id) > 0;
        }
    }
}