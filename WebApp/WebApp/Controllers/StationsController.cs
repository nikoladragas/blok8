﻿using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Stations")]
    public class StationsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        private readonly IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;
        public StationsController(ApplicationUserManager userManager, IUnitOfWork uw)
        {
            UserManager = userManager;
            UnitOfWork = uw;
        }

        public StationsController() { }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: api/Stations
        public IQueryable<Station> GetStations()
        {
            return UnitOfWork.StationRepository.GetAll().AsQueryable();
        }

        // GET: api/Stations
        [Route("FindLine")]
        public IQueryable<string> GetLines(int id)
        {
            return UnitOfWork.StationRepository.FindLines(id).AsQueryable();
        }

        // GET: api/Stations/5
        [ResponseType(typeof(Station))]
        public IHttpActionResult GetStation(int id)
        {
            Station station = UnitOfWork.StationRepository.Get(id);
            if (station == null)
            {
                return NotFound();
            }

            return Ok(station);
        }

        // PUT: api/Stations/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutStation(int id, Station station)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != station.Id)
            {
                return BadRequest();
            }

            UnitOfWork.StationRepository.Entry(station, EntityState.Modified);

            try
            {
                UnitOfWork.StationRepository.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StationExists(id))
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

        // POST: api/Stations
        [Route("Add")]
        [ResponseType(typeof(Station))]
        public IHttpActionResult PostStation(Station station)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            UnitOfWork.StationRepository.Add(station);
            UnitOfWork.StationRepository.SaveChanges();
            Console.WriteLine(station.Id);
            return Ok(0);
        }

        // DELETE: api/Stations/5
        [Route("Delete")]
        [ResponseType(typeof(Station))]
        public IHttpActionResult DeleteStation(int id)
        {
            Station station = UnitOfWork.StationRepository.Get(id);
            if (station == null)
            {
                return NotFound();
            }

            UnitOfWork.StationRepository.Remove(station);
            UnitOfWork.StationRepository.SaveChanges();

            return Ok(station);
        }

        // DELETE: api/Stations/5
        [Route("Edit")]
        [ResponseType(typeof(Station))]
        public IHttpActionResult Edit(Station station, int id)
        {
            if (station == null)
            {
                return NotFound();
            }

            UnitOfWork.StationRepository.EditStation(station, id);
            UnitOfWork.StationRepository.SaveChanges();
            Station tempStation = UnitOfWork.StationRepository.Get(id);
            return Ok(tempStation);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                UnitOfWork.StationRepository.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StationExists(int id)
        {
            return db.Stations.Count(e => e.Id == id) > 0;
        }
    }
}