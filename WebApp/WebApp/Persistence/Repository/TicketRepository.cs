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

       /* public void BuyTicket(TicketType ticketType, string email)
        {
            Ticket ticket = new Ticket();
            ticket.IssueDate = DateTime.Now;

            int pricelistId = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(c => c.Id).First();
            ticket.IdPricelistItem = ((ApplicationDbContext)this.context).Items.Where(s => s.TicketType == ticketType).Select(s => s.Id).First();

            ApplicationUser user = ((ApplicationDbContext)this.context).Users.Where(u => u.Email == email).First();

            ticket.IdApplicationUser = user.Id;
            ticket.Valid = true;
            ticket.Price = CalculatePrice(ticketType, user.UserType);

            ((ApplicationDbContext)this.context).Tickets.Add(ticket);
        }
        */
        public double GetPrice(Enums.TicketType ticketType, Enums.UserType userType)
        {
            int pricelistId = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(c => c.Id).First();
            int itemId = ((ApplicationDbContext)this.context).Items.Where(s => s.TicketType == ticketType).Select(s => s.Id).First();
            double cena = ((ApplicationDbContext)this.context).PricelistItems.Where(c => c.IdPricelist == pricelistId && c.IdItem == itemId).Select(c => c.Price).First();
            double coef = ((ApplicationDbContext)this.context).Coefficients.Where(k => k.UserType == userType).Select(k => k.Coef).First();
            return Math.Round(cena * coef, 2);
        }

        public string[] GetAllPrices()
        {
            double[] ret = new double[14];
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

            string[] ret2 = new string[16];
            for (int i = 0; i < 12; i++)
                ret2[i] = ret[i].ToString();

            ret2[12] = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(f => f.From).First().ToString();
            ret2[13] = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).Select(f => f.To).First().ToString();
            ret2[14] = pricelistId.ToString();
            ret2[15] = ((ApplicationDbContext)this.context).Pricelists.Where(c => c.Active == true).First().Version.ToString();

            return ret2;
        }

        public bool CheckTicket(int id)
        {
            Ticket ticket = ((ApplicationDbContext)this.context).Tickets.Where(t => t.Id == id).First();
            PricelistItem pricelistItem = ((ApplicationDbContext)this.context).PricelistItems.Where(pi => pi.Id == ticket.IdPricelistItem).First();
            TicketType ticketType = ((ApplicationDbContext)this.context).Items.Where(i => i.Id == pricelistItem.IdItem).Select(s => s.TicketType).First();
            long ticks = DateTime.Now.Ticks;

            if (ticketType == TicketType.HourTicket)
            {
                if ((ticks - ticket.IssueDate.Value.Ticks) < 36000000000)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }
            else if (ticketType == TicketType.DayTicket)
            {
                if (ticket.IssueDate.Value.Year == DateTime.Now.Year && ticket.IssueDate.Value.Month == DateTime.Now.Month && ticket.IssueDate.Value.Day == DateTime.Now.Day)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }
            else if (ticketType == TicketType.MonthTicket)
            {
                if (ticket.IssueDate.Value.Year == DateTime.Now.Year && ticket.IssueDate.Value.Month == DateTime.Now.Month)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }
            else if (ticketType == TicketType.YearTicket)
            {
                if (ticket.IssueDate.Value.Year == DateTime.Now.Year)
                {
                    return true;
                }
                else
                {
                    ((ApplicationDbContext)this.context).Tickets.Where(i => i.Id == id).First().Valid = false;
                    return false;
                }
            }

            return false;
        }
    }
}