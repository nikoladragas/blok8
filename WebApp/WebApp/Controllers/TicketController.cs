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
        [ResponseType(typeof(Ticket))]//price type name email
        public IHttpActionResult BuyTicket(string price, string type, string name, string email, string transactionId, string payerId, string payerEmail) 
        {
            TicketType ticketType;
            Enum.TryParse(type, out ticketType);
            int IdPricelistItem = UnitOfWork.PricelistRepository.getPricelistItem(ticketType);

            Ticket ticket = new Ticket()
            {
                Valid = true,
                IssueDate = DateTime.Now,
                Price = double.Parse(price),
                IdPricelistItem = IdPricelistItem,
                IdApplicationUser = null
            };

            if (name != null)
            {
                try
                {
                    ticket.IdApplicationUser = UnitOfWork.PricelistRepository.getIdByEmail(name);
                }
                catch
                {

                }
            }

            if(email != null)
                EmailSender.SendEmail(email, "Bus ticket purchase", String.Format("You have successfully bought a ticket.\nType: {0}\nPrice: {1} RSD", type, price));
            


            UnitOfWork.TicketRepository.Add(ticket);
            UnitOfWork.TicketRepository.SaveChanges();

            UnitOfWork.TicketRepository.AddPayPal(transactionId, payerEmail, payerEmail, ticket.Id);
            UnitOfWork.TicketRepository.SaveChanges();


            return Ok(200);
        }
    }
}
