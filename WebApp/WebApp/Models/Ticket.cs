using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public DateTime IssueDate { get; set; }
        public int Price { get; set; }
        [ForeignKey("PricelistItem")]
        public int PricelistItemId { get; set; }
        public PricelistItem PricelistItem { get; set; }
        [ForeignKey("ApplicationUser")]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public bool Valid { get; set; }
    }
}