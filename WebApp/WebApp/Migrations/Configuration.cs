namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebApp.Models;
    using static WebApp.Models.Enums;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Controller"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Controller" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
            { 
                var user = new ApplicationUser() { Id = "appu", UserName = "appu@yahoo.com", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }

            if (!context.Items.Any(i => i.TicketType == TicketType.HourTicket))
            {
                var item = new Item()
                {
                    TicketType = TicketType.HourTicket
                };
                context.Items.Add(item);
            }

            if (!context.Items.Any(i => i.TicketType == TicketType.DayTicket))
            {
                var item = new Item()
                {
                    TicketType = TicketType.DayTicket
                };
                context.Items.Add(item);
            }

            if (!context.Items.Any(i => i.TicketType == TicketType.MounthTicket))
            {
                var item = new Item()
                {
                    TicketType = TicketType.MounthTicket
                };
                context.Items.Add(item);
            }

            if (!context.Items.Any(i => i.TicketType == TicketType.YearTicket))
            {
                var item = new Item()
                {
                    TicketType = TicketType.YearTicket
                };
                context.Items.Add(item);
            }

            if(!context.Pricelists.Any(p => p.Active == true))
            {
                var pricelist = new Pricelist()
                {
                    From = new DateTime(2018, 11, 11),
                    To = new DateTime(2019, 11, 29),
                    Active = true
                };
                context.Pricelists.Add(pricelist);
            }

            if (!context.Coefficients.Any(c => c.UserType == UserType.RegularUser))
            {
                var coefRegular = new Coefficient()
                {
                    UserType = UserType.RegularUser,
                    Coef = 1
                };
                context.Coefficients.Add(coefRegular);
            }

            if (!context.Coefficients.Any(c => c.UserType == UserType.Student))
            {
                var coefStudent = new Coefficient()
                {
                    UserType = UserType.Student,
                    Coef = 0.8
                };
                context.Coefficients.Add(coefStudent);
            }

            if (!context.Coefficients.Any(c => c.UserType == UserType.Retired))
            {
                var coefRetired = new Coefficient()
                {
                    UserType = UserType.Retired,
                    Coef = 0.7
                };
                context.Coefficients.Add(coefRetired);
            }

            var priceOfTimeTicket = 80;
            var priceOfDayTicket = 110;
            var priceOfMonthTicket = 1200;
            var priceOfYearTicket = 6000;

            foreach (var pricelist in context.Pricelists)
            {
                foreach (var item in context.Items)
                {
                    var pricelistItem = new PricelistItem()
                    {
                        IdPricelist = pricelist.Id,
                        IdItem = item.Id,
                        Price = 0
                    };

                    if (item.TicketType == TicketType.HourTicket)
                    {
                        pricelistItem.Price = priceOfTimeTicket;
                    }
                    else if (item.TicketType == TicketType.DayTicket)
                    {
                        pricelistItem.Price = priceOfDayTicket;
                    }
                    else if (item.TicketType == TicketType.MounthTicket)
                    {
                        pricelistItem.Price = priceOfMonthTicket;
                    }
                    else
                    {
                        pricelistItem.Price = priceOfYearTicket;
                    }

                    context.PricelistItems.Add(pricelistItem);
                }
            }
        }
    }
}
