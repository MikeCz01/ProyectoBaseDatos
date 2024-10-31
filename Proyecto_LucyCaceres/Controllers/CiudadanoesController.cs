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
    public class CiudadanoesController : ApiController
    {
        private TransitoEntities db = new TransitoEntities();

        // GET: api/Ciudadanoes
        public IQueryable<CiudadanoVM> GetCiudadanos()
        {
            var roles = db.Ciudadanos.Select(ciu => new CiudadanoVM
            {
                dni = ciu.dni,
                nombre = ciu.nombre,
                apellido = ciu.apellido,
                fechaNacimiento = ciu.fechaNacimiento,
                edad = ciu.edad,
                genero = ciu.genero,
                direccion = ciu.direccion,
                celular = ciu.celular,
                tipoSanguineo = ciu.tipoSanguineo
            });
            return roles;
        }

        // GET: api/Ciudadanoes/5
        [ResponseType(typeof(Ciudadano))]
        public IHttpActionResult GetCiudadano(string id)
        {
            Ciudadano ciudadano = db.Ciudadanos.Find(id);
            if (ciudadano == null)
            {
                return NotFound();
            }

            var ciudadanoVm = new CiudadanoVM
            {
                dni = ciudadano.dni,
                nombre = ciudadano.nombre,
                apellido = ciudadano.apellido,
                fechaNacimiento = ciudadano.fechaNacimiento,
                edad = ciudadano.edad,
                genero = ciudadano.genero,
                direccion = ciudadano.direccion,
                celular = ciudadano.celular,
                tipoSanguineo = ciudadano.tipoSanguineo
            };
            return Ok(ciudadanoVm);
        }

        // PUT: api/Ciudadanoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCiudadano(string id, Ciudadano ciudadano)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ciudadano.dni)
            {
                return BadRequest();
            }

            db.Entry(ciudadano).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CiudadanoExists(id))
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

        // POST: api/Ciudadanoes
        [ResponseType(typeof(Ciudadano))]
        public IHttpActionResult PostCiudadano(Ciudadano ciudadano)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (db.Ciudadanos.Any(a=> a.dni == ciudadano.dni))
            {
                return BadRequest(ModelState);
            }

            db.Ciudadanos.Add(ciudadano);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CiudadanoExists(ciudadano.dni))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = ciudadano.dni }, ciudadano);
        }

        // DELETE: api/Ciudadanoes/5
        [ResponseType(typeof(Ciudadano))]
        public IHttpActionResult DeleteCiudadano(string id)
        {
            Ciudadano ciudadano = db.Ciudadanos.Find(id);
            if (ciudadano == null)
            {
                return NotFound();
            }

            db.Ciudadanos.Remove(ciudadano);
            db.SaveChanges();

            return Ok(ciudadano);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CiudadanoExists(string id)
        {
            return db.Ciudadanos.Count(e => e.dni == id) > 0;
        }
    }
}