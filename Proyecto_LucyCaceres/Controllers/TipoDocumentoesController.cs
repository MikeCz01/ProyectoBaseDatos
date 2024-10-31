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
    public class TipoDocumentoesController : ApiController
    {
        private TransitoEntities db = new TransitoEntities();

        // GET: api/TipoDocumentoes
        public IQueryable<TipoDocumentoVM> GetTipoDocumentos()
        {
            var tipDocs = db.TipoDocumentos.Select(tdoc => new TipoDocumentoVM
            {
                codigo = tdoc.codigo,
                descripcion = tdoc.descripcion,
                precio = tdoc.precio
            });

            return tipDocs;
        }

        // GET: api/TipoDocumentoes/5
        [ResponseType(typeof(TipoDocumento))]
        public IHttpActionResult GetTipoDocumento(string id)
        {
            TipoDocumento tipoDocumento = db.TipoDocumentos.Find(id);
            if (tipoDocumento == null)
            {
                return NotFound();
            }

            return Ok(tipoDocumento);
        }

        // PUT: api/TipoDocumentoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTipoDocumento(string id, TipoDocumento tipoDocumento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipoDocumento.codigo)
            {
                return BadRequest();
            }

            db.Entry(tipoDocumento).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoDocumentoExists(id))
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

        // POST: api/TipoDocumentoes
        [ResponseType(typeof(TipoDocumento))]
        public IHttpActionResult PostTipoDocumento(TipoDocumento tipoDocumento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TipoDocumentos.Add(tipoDocumento);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TipoDocumentoExists(tipoDocumento.codigo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tipoDocumento.codigo }, tipoDocumento);
        }

        // DELETE: api/TipoDocumentoes/5
        [ResponseType(typeof(TipoDocumento))]
        public IHttpActionResult DeleteTipoDocumento(string id)
        {
            TipoDocumento tipoDocumento = db.TipoDocumentos.Find(id);
            if (tipoDocumento == null)
            {
                return NotFound();
            }

            db.TipoDocumentos.Remove(tipoDocumento);
            db.SaveChanges();

            return Ok(tipoDocumento);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoDocumentoExists(string id)
        {
            return db.TipoDocumentos.Count(e => e.codigo == id) > 0;
        }
    }
}