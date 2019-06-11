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
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class CoefficientsController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        public IUnitOfWork UnitOfWork { get; set; }


        // GET: api/Coefficients
        public IQueryable<Coefficient> GetCoefficients()
        {
            return UnitOfWork.CoefficientRepository.GetAll().AsQueryable();
        }

        // GET: api/Coefficients/5
        [ResponseType(typeof(Coefficient))]
        public IHttpActionResult GetCoefficient(int id)
        {
            Coefficient coefficient = UnitOfWork.CoefficientRepository.Get(id);
            if (coefficient == null)
            {
                return NotFound();
            }

            return Ok(coefficient);
        }

        // PUT: api/Coefficients/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCoefficient(int id, Coefficient coefficient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != coefficient.Id)
            {
                return BadRequest();
            }

            UnitOfWork.CoefficientRepository.Entry(coefficient, EntityState.Modified);

            try
            {
                UnitOfWork.CoefficientRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoefficientExists(id))
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

        // POST: api/Coefficients
        [ResponseType(typeof(Coefficient))]
        public IHttpActionResult PostCoefficient(Coefficient coefficient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            UnitOfWork.CoefficientRepository.Add(coefficient);
            UnitOfWork.CoefficientRepository.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = coefficient.Id }, coefficient);
        }

        // DELETE: api/Coefficients/5
        [ResponseType(typeof(Coefficient))]
        public IHttpActionResult DeleteCoefficient(int id)
        {
            Coefficient coefficient = UnitOfWork.CoefficientRepository.Get(id);
            if (coefficient == null)
            {
                return NotFound();
            }

            UnitOfWork.CoefficientRepository.Remove(coefficient);
            UnitOfWork.CoefficientRepository.SaveChanges();

            return Ok(coefficient);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.CoefficientRepository.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CoefficientExists(int id)
        {
            return UnitOfWork.CoefficientRepository.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}