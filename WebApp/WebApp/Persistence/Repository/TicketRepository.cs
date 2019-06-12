using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TicketRepository : Repository<Ticket, int>, ITicketRepository
    {
        public TicketRepository(DbContext context) : base(context)
        {
        }

        public double CalculatePrice(Enums.TicketType ticketType, Enums.UserType userType)
        {
            int pricelistId = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(c => c.Id).First();
            int itemId = ((ApplicationDbContext)this.context).Items.Where(s => s.TicketType == ticketType).Select(s => s.Id).First();
            double cena = ((ApplicationDbContext)this.context).PricelistItems.Where(c => c.IdPricelist == pricelistId && c.IdItem == itemId).Select(c => c.Price).First();
            double coef = ((ApplicationDbContext)this.context).Coefficients.Where(k => k.UserType == userType).Select(k => k.Coef).First();
            return Math.Round(cena * coef, 2);
        }
    }
}