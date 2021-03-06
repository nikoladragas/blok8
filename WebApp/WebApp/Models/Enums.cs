﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Enums
    {
        public enum UserType
        {
            RegularUser = 0,
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

        public enum DayType
        {
            Weekday = 0,
            Weekend
        }

        public enum LineType
        {
            City = 0,
            Suburban
        }

        public enum RequestType
        {
            InProcess = 0,
            Activated,
            Declined,
        }
    }
}