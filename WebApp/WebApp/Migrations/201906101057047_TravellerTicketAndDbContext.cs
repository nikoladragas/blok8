namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TravellerTicketAndDbContext : DbMigration
    {
        public override void Up()
        {
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
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IssueDate = c.DateTime(nullable: false),
                        PricelistItemId = c.Int(nullable: false),
                        Valid = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PricelistItems", t => t.PricelistItemId, cascadeDelete: true)
                .Index(t => t.PricelistItemId);
            
            CreateTable(
                "dbo.TravellerTickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TravellerId = c.Int(nullable: false),
                        TicketId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Tickets", t => t.TicketId, cascadeDelete: true)
                .ForeignKey("dbo.Travellers", t => t.TravellerId, cascadeDelete: true)
                .Index(t => t.TravellerId)
                .Index(t => t.TicketId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TravellerTickets", "TravellerId", "dbo.Travellers");
            DropForeignKey("dbo.TravellerTickets", "TicketId", "dbo.Tickets");
            DropForeignKey("dbo.Tickets", "PricelistItemId", "dbo.PricelistItems");
            DropForeignKey("dbo.StationLines", "StationId", "dbo.Stations");
            DropForeignKey("dbo.StationLines", "LineId", "dbo.Lines");
            DropIndex("dbo.TravellerTickets", new[] { "TicketId" });
            DropIndex("dbo.TravellerTickets", new[] { "TravellerId" });
            DropIndex("dbo.Tickets", new[] { "PricelistItemId" });
            DropIndex("dbo.StationLines", new[] { "StationId" });
            DropIndex("dbo.StationLines", new[] { "LineId" });
            DropTable("dbo.TravellerTickets");
            DropTable("dbo.Tickets");
            DropTable("dbo.StationLines");
        }
    }
}
