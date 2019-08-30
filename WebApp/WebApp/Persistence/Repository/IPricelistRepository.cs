using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;
using static WebApp.Models.Enums;

namespace WebApp.Persistence.Repository
{
    public interface IPricelistRepository : IRepository<Pricelist, int>
    {
        int getPricelistItem(TicketType ticketType);
        string getIdByEmail(string email);
        Tuple<Pricelist, List<double>> getPrices();
        void editPricelist(int id, double hourTicket, double dayTicket, double monthTicket, double yearTicket);
        void addPricelist(DateTime to, double hourTicket, double dayTicket, double monthTicket, double yearTicket);
        void addPricelistItem(double hourTicket, double dayTicket, double monthTicket, double yearTicket);
    }
}
