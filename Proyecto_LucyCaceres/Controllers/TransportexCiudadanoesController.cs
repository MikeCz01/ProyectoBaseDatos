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
    public class TransportexCiudadanoesController : ApiController
    {
        private TransitoEntities db = new TransitoEntities();

        // GET: api/TransportexCiudadanoes
        public IQueryable<TransportexCiudadanoVM> GetTipoDocumentosxCiudadano()
        {
            var tipDocxCiu = db.TransportexCiudadanoes.Select(traCiu => new TransportexCiudadanoVM
            {
                id = traCiu.id,
                ciudadanoId = traCiu.ciudadanoId,
                idTransporte = traCiu.idTransporte,
                transporte = traCiu.MediosTransporte.tipo + traCiu.MediosTransporte.categoria,
                placa = traCiu.placa,
                model = traCiu.model,
                marca = traCiu.marca,
                ano = traCiu.ano
            });

            return tipDocxCiu;
        }

        // GET: api/TransportexCiudadanoes/5
        [ResponseType(typeof(TransportexCiudadano))]
        public IHttpActionResult GetTransportexCiudadano(int id)
        {
            TransportexCiudadano transportexCiudadano = db.TransportexCiudadanoes.Find(id);
            if (transportexCiudadano == null)
            {
                return NotFound();
            }

            return Ok(transportexCiudadano);
        }

        [HttpGet]
        [Route("~/api/TransportexCiudadanoes/dni/{dni}")]
        public IQueryable<TransportexCiudadanoVM> GetTransportesCiudadano(string dni)
        {
            var tipDocxCiu = db.TransportexCiudadanoes.Where(x=> x.ciudadanoId == dni).Select(traCiu => new TransportexCiudadanoVM
            {
                id = traCiu.id,
                ciudadanoId = traCiu.ciudadanoId,
                idTransporte = traCiu.idTransporte,
                transporte = traCiu.MediosTransporte.tipo + "-"+ traCiu.MediosTransporte.categoria,
                placa = traCiu.placa,
                model = traCiu.model,
                marca = traCiu.marca,
                ano = traCiu.ano
            });

            return tipDocxCiu;
        }

        // PUT: api/TransportexCiudadanoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTransportexCiudadano(int id, TransportexCiudadano transportexCiudadano)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transportexCiudadano.id)
            {
                return BadRequest();
            }

            db.Entry(transportexCiudadano).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransportexCiudadanoExists(id))
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

        // POST: api/TransportexCiudadanoes
        [ResponseType(typeof(TransportexCiudadano))]
        public IHttpActionResult PostTransportexCiudadano(TransportexCiudadano transportexCiudadano)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TransportexCiudadanoes.Add(transportexCiudadano);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = transportexCiudadano.id }, transportexCiudadano);
        }

        // DELETE: api/TransportexCiudadanoes/5
        [ResponseType(typeof(TransportexCiudadano))]
        public IHttpActionResult DeleteTransportexCiudadano(int id)
        {
            TransportexCiudadano transportexCiudadano = db.TransportexCiudadanoes.Find(id);
            if (transportexCiudadano == null)
            {
                return NotFound();
            }

            db.TransportexCiudadanoes.Remove(transportexCiudadano);
            db.SaveChanges();

            return Ok(transportexCiudadano);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransportexCiudadanoExists(int id)
        {
            return db.TransportexCiudadanoes.Count(e => e.id == id) > 0;
        }
    }
}