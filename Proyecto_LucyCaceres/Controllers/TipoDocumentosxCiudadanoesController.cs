using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Proyecto_LucyCaceres.Models;
using System.Diagnostics;
using System.Threading.Tasks;


namespace Proyecto_LucyCaceres.Controllers
{
    public class TipoDocumentosxCiudadanoesController : ApiController
    {
        private TransitoEntities db = new TransitoEntities();
        // GET: api/TipoDocumentosxCiudadanoes
        public IQueryable<TipoDocumentosxCiudadanoVM> GetTipoDocumentosxCiudadano()
        {
            var tipDocxCiu = db.TipoDocumentosxCiudadanoes.Select(tipCiu => new TipoDocumentosxCiudadanoVM
            {
                id = tipCiu.id,
                codigoDocumento = tipCiu.codigoDocumento,
                ciudadanoId = tipCiu.ciudadanoId,
                estadoExamenOral = tipCiu.estadoExamenOral,
                estadoExamenPractico = tipCiu.estadoExamenPractico,
                fechaEmision = tipCiu.fechaEmision,
                fechaVencimiento = tipCiu.fechaVencimiento,
                esRenovacion = tipCiu.esRenovacion,
                fechaCita = tipCiu.fechaCita,
                examenMedico = tipCiu.examenMedico,
                examenVista = tipCiu.examenVista,
                examenPsico = tipCiu.examenPsico,
                deposito = tipCiu.deposito
            });

            return tipDocxCiu;
        }

        // GET: api/TipoDocumentosxCiudadanoes/5
        [ResponseType(typeof(TipoDocumentosxCiudadano))]
        public IHttpActionResult GetTipoDocumentosxCiudadano(int id)
        {
            TipoDocumentosxCiudadano tipoDocumentosxCiudadano = db.TipoDocumentosxCiudadanoes.Find(id);
            if (tipoDocumentosxCiudadano == null)
            {
                return NotFound();
            }

            return Ok(tipoDocumentosxCiudadano);
        }

        // PUT: api/TipoDocumentosxCiudadanoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTipoDocumentosxCiudadano(int id, TipoDocumentosxCiudadano tipoDocumentosxCiudadano)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipoDocumentosxCiudadano.id)
            {
                return BadRequest();
            }

            db.Entry(tipoDocumentosxCiudadano).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoDocumentosxCiudadanoExists(id))
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

        /*// POST: api/TipoDocumentosxCiudadanoes
        [ResponseType(typeof(TipoDocumentosxCiudadano))]
        public IHttpActionResult PostTipoDocumentosxCiudadano(TipoDocumentosxCiudadano tipoDocumentosxCiudadano)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool existe = db.TipoDocumentosxCiudadanoes.Any(a=> a.ciudadanoId == tipoDocumentosxCiudadano.ciudadanoId && a.codigoDocumento == tipoDocumentosxCiudadano.codigoDocumento);
            if (existe)
            {
                return NotFound();
            }
            ByteArrayImageConversion firmaConversion = new ByteArrayImageConversion(tipoDocumentosxCiudadano.examenMedico.ToString());

            tipoDocumentosxCiudadano.examenMedico = firmaConversion.ContentByteArray;
            db.TipoDocumentosxCiudadanoes.Add(tipoDocumentosxCiudadano);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tipoDocumentosxCiudadano.id }, tipoDocumentosxCiudadano);
        }*/

        [HttpPost]
        [ResponseType(typeof(TipoDocumentosxCiudadano))]
        public async Task<IHttpActionResult> PostTipoDocumentosxCiudadano()
        {
            if(!Request.Content.IsMimeMultipartContent())
    {
                return StatusCode(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            var tipoDocumentosxCiudadano = new TipoDocumentosxCiudadano();

            foreach (var content in provider.Contents)
            {
                if (content.Headers.ContentDisposition.Name.Trim('"') == "ciudadanoId")
                {
                    tipoDocumentosxCiudadano.ciudadanoId = await content.ReadAsStringAsync();
                }

                if (content.Headers.ContentDisposition.Name.Trim('"') == "codigoDocumento")
                {
                    tipoDocumentosxCiudadano.codigoDocumento = await content.ReadAsStringAsync();
                }

                if (content.Headers.ContentDisposition.Name.Trim('"') == "esRenovacion")
                {
                    var esRenovacion = await content.ReadAsStringAsync();
                    tipoDocumentosxCiudadano.esRenovacion = esRenovacion == "1" ? true : false;
                }

                if (content.Headers.ContentDisposition.Name.Trim('"') == "examenMedico" && content.Headers.ContentDisposition.FileName != null)
                {
                    tipoDocumentosxCiudadano.examenMedico = await content.ReadAsByteArrayAsync();
                }

                if (content.Headers.ContentDisposition.Name.Trim('"') == "examenVista" && content.Headers.ContentDisposition.FileName != null)
                {
                    tipoDocumentosxCiudadano.examenVista = await content.ReadAsByteArrayAsync();
                }

                if (content.Headers.ContentDisposition.Name.Trim('"') == "examenPsico" && content.Headers.ContentDisposition.FileName != null)
                {
                    tipoDocumentosxCiudadano.examenPsico = await content.ReadAsByteArrayAsync();
                }
                if (content.Headers.ContentDisposition.Name.Trim('"') == "deposito" && content.Headers.ContentDisposition.FileName != null)
                {
                    tipoDocumentosxCiudadano.deposito = await content.ReadAsByteArrayAsync();
                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TipoDocumentosxCiudadanoes.Add(tipoDocumentosxCiudadano);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tipoDocumentosxCiudadano.id }, tipoDocumentosxCiudadano);
        }


        // DELETE: api/TipoDocumentosxCiudadanoes/5
        [ResponseType(typeof(TipoDocumentosxCiudadano))]
        public IHttpActionResult DeleteTipoDocumentosxCiudadano(int id)
        {
            TipoDocumentosxCiudadano tipoDocumentosxCiudadano = db.TipoDocumentosxCiudadanoes.Find(id);
            if (tipoDocumentosxCiudadano == null)
            {
                return NotFound();
            }

            db.TipoDocumentosxCiudadanoes.Remove(tipoDocumentosxCiudadano);
            db.SaveChanges();

            return Ok(tipoDocumentosxCiudadano);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoDocumentosxCiudadanoExists(int id)
        {
            return db.TipoDocumentosxCiudadanoes.Count(e => e.id == id) > 0;
        }
    }
}