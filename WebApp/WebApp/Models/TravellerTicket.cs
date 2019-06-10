using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class TravellerTicket
    {
        public int Id { get; set; }

        [ForeignKey("Traveller")]
        public int TravellerId { get; set; }
        public Traveller Traveller { get; set; }

        [ForeignKey("Ticket")]
        public int TicketId { get; set; }
        public Ticket Ticket { get; set; }
    }
}