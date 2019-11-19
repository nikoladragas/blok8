using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;
using static WebApp.Models.Enums;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Tickets")]
    public class TicketController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        private IUnitOfWork UnitOfWork;
        private ApplicationUserManager _userManager;
        public TicketController(ApplicationUserManager userManager, IUnitOfWork uw)
        {
            UserManager = userManager;
            UnitOfWork = uw;
        }

        public TicketController() { }

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

        // GET: api/Tickets/CalculatePrice
        [Route("CalculatePrice")]
        [ResponseType(typeof(double))]
        public IHttpActionResult GetPrice(TicketType ticketType, UserType userType)
        {
            return Ok(UnitOfWork.TicketRepository.GetPrice(ticketType, userType));

        }

        [Route("GetPricelist")]
        [ResponseType(typeof(string[]))]
        public IHttpActionResult GetPricelist()
        {
            return Ok(UnitOfWork.TicketRepository.GetAllPrices());
        }

        [Route("GetTicket")]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult GetTicket(int id)
        {
            if (UnitOfWork.TicketRepository.CheckTicket(id))
            {
                UnitOfWork.TicketRepository.SaveChanges();
                return Ok(200);
            }
            else
            {
                UnitOfWork.TicketRepository.SaveChanges();
                return Ok(204);
            }
        }

        [Route("BuyTicket")]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult BuyTicket(string[] param) //price type name email
        {
            TicketType ticketType;
            Enum.TryParse(param[1], out ticketType);
            int IdPricelistItem = UnitOfWork.PricelistRepository.getPricelistItem(ticketType);

            Ticket ticket = new Ticket()
            {
                Valid = true,
                IssueDate = DateTime.Now,
                Price = double.Parse(param[0]),
                IdPricelistItem = IdPricelistItem,
                IdApplicationUser = null
            };

            if (param[2] != null)
            {
                ticket.IdApplicationUser = UnitOfWork.PricelistRepository.getIdByEmail(param[2]);
            }
            if(param[3] != null)
                EmailSender.SendEmail(param[3], "Bus ticket purchase confirmation", "You have successfully bought a ticket");
            //else
            

            UnitOfWork.TicketRepository.Add(ticket);
            UnitOfWork.Complete();
            return Ok(ticket.Id);
        }
    }
}
