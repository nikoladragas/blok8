using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public enum UserType
    {
        Regular = 0,
        Student,
        Retired
    }

    public enum TicketType
    {
        HourTicket = 0,
        DayTicket,
        MonthTicket,
        YearTicket
    }
}