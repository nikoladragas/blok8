using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Coefficient
    {
        public int Id { get; set; }
        public TravellerType TravellerType { get; set; }
        public double CoefficientValue { get; set; }
    }
}