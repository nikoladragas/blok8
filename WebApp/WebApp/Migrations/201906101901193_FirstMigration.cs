namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FirstMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserTickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ApplicationUserId = c.String(maxLength: 128),
                        TicketId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId)
                .ForeignKey("dbo.Tickets", t => t.TicketId, cascadeDelete: true)
                .Index(t => t.ApplicationUserId)
                .Index(t => t.TicketId);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IssueDate = c.DateTime(nullable: false),
                        Price = c.Int(nullable: false),
                        PricelistItemId = c.Int(nullable: false),
                        ApplicationUserId = c.String(maxLength: 128),
                        Valid = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId)
                .ForeignKey("dbo.PricelistItems", t => t.PricelistItemId, cascadeDelete: true)
                .Index(t => t.PricelistItemId)
                .Index(t => t.ApplicationUserId);
            
            CreateTable(
                "dbo.PricelistItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Cena = c.Double(nullable: false),
                        PricelistId = c.Int(nullable: false),
                        ItemId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Items", t => t.ItemId, cascadeDelete: true)
                .ForeignKey("dbo.Pricelists", t => t.PricelistId, cascadeDelete: true)
                .Index(t => t.PricelistId)
                .Index(t => t.ItemId);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Pricelists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        From = c.DateTime(),
                        To = c.DateTime(),
                        Active = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Coefficients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserType = c.Int(nullable: false),
                        CoefficientValue = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Number = c.Int(nullable: false),
                        Color = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.StationLines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LineId = c.Int(nullable: false),
                        StationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.LineId, cascadeDelete: true)
                .ForeignKey("dbo.Stations", t => t.StationId, cascadeDelete: true)
                .Index(t => t.LineId)
                .Index(t => t.StationId);
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Address = c.String(),
                        XCoordinate = c.Double(nullable: false),
                        YCoordinate = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AspNetUsers", "Name", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "BirthDate", c => c.DateTime());
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "UserType", c => c.Int(nullable: false));
            AddColumn("dbo.AspNetUsers", "Photo", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StationLines", "StationId", "dbo.Stations");
            DropForeignKey("dbo.StationLines", "LineId", "dbo.Lines");
            DropForeignKey("dbo.UserTickets", "TicketId", "dbo.Tickets");
            DropForeignKey("dbo.Tickets", "PricelistItemId", "dbo.PricelistItems");
            DropForeignKey("dbo.PricelistItems", "PricelistId", "dbo.Pricelists");
            DropForeignKey("dbo.PricelistItems", "ItemId", "dbo.Items");
            DropForeignKey("dbo.Tickets", "ApplicationUserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.UserTickets", "ApplicationUserId", "dbo.AspNetUsers");
            DropIndex("dbo.StationLines", new[] { "StationId" });
            DropIndex("dbo.StationLines", new[] { "LineId" });
            DropIndex("dbo.PricelistItems", new[] { "ItemId" });
            DropIndex("dbo.PricelistItems", new[] { "PricelistId" });
            DropIndex("dbo.Tickets", new[] { "ApplicationUserId" });
            DropIndex("dbo.Tickets", new[] { "PricelistItemId" });
            DropIndex("dbo.UserTickets", new[] { "TicketId" });
            DropIndex("dbo.UserTickets", new[] { "ApplicationUserId" });
            DropColumn("dbo.AspNetUsers", "Photo");
            DropColumn("dbo.AspNetUsers", "UserType");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "BirthDate");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "Name");
            DropTable("dbo.Stations");
            DropTable("dbo.StationLines");
            DropTable("dbo.Lines");
            DropTable("dbo.Coefficients");
            DropTable("dbo.Pricelists");
            DropTable("dbo.Items");
            DropTable("dbo.PricelistItems");
            DropTable("dbo.Tickets");
            DropTable("dbo.UserTickets");
        }
    }
}
