using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;
using static WebApp.Models.Enums;

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

        public double[] GetAllPrices()
        {
            double[] ret = new double[12];
            double[] coef = new double[3];
            int pricelistId;
            int itemId;
            double price;

            foreach (Coefficient c in ((ApplicationDbContext)this.context).Coefficients)
                coef[(int)c.UserType] = c.Coef;

            pricelistId = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(c => c.Id).First();

            for (int i = 0; i < 4; i++)
            {
                itemId = ((ApplicationDbContext)this.context).Items.Where(s => s.TicketType == (TicketType)i).Select(s => s.Id).First();
                price = ((ApplicationDbContext)this.context).PricelistItems.Where(c => c.IdPricelist == pricelistId && c.IdItem == itemId).Select(c => c.Price).First();
                ret[i] = price;
            }

            ret[4] = Math.Round(ret[0] * coef[1]);
            ret[5] = Math.Round(ret[1] * coef[1]);
            ret[6] = Math.Round(ret[2] * coef[1]);
            ret[7] = Math.Round(ret[3] * coef[1]);
            ret[8] = Math.Round(ret[0] * coef[2]);
            ret[9] = Math.Round(ret[1] * coef[2]);
            ret[10] = Math.Round(ret[2] * coef[2]);
            ret[11] = Math.Round(ret[3] * coef[2]);

            return ret;
        }
    }
}