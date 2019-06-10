using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Traveller : User
    {
        public TravellerType TravellerType { get; set; }
        public string Photo { get; set; }
    }
}