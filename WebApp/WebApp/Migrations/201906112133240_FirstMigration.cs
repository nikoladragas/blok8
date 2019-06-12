namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FirstMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Coefficients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserType = c.Int(nullable: false),
                        Coef = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PricelistItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Price = c.Double(nullable: false),
                        IdPricelist = c.Int(nullable: false),
                        IdItem = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Items", t => t.IdItem, cascadeDelete: true)
                .ForeignKey("dbo.Pricelists", t => t.IdPricelist, cascadeDelete: true)
                .Index(t => t.IdPricelist)
                .Index(t => t.IdItem);
            
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
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IssueDate = c.DateTime(),
                        IdPricelistItem = c.Int(nullable: false),
                        IdApplicationUser = c.String(maxLength: 128),
                        Valid = c.Boolean(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.IdApplicationUser)
                .ForeignKey("dbo.PricelistItems", t => t.IdPricelistItem, cascadeDelete: true)
                .Index(t => t.IdPricelistItem)
                .Index(t => t.IdApplicationUser);
            
            AddColumn("dbo.AspNetUsers", "Name", c => c.String());
            AddColumn("dbo.AspNetUsers", "LastName", c => c.String());
            AddColumn("dbo.AspNetUsers", "Address", c => c.String());
            AddColumn("dbo.AspNetUsers", "DateOfBirth", c => c.DateTime());
            AddColumn("dbo.AspNetUsers", "Photo", c => c.String());
            AddColumn("dbo.AspNetUsers", "Activated", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "UserType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "IdPricelistItem", "dbo.PricelistItems");
            DropForeignKey("dbo.Tickets", "IdApplicationUser", "dbo.AspNetUsers");
            DropForeignKey("dbo.PricelistItems", "IdPricelist", "dbo.Pricelists");
            DropForeignKey("dbo.PricelistItems", "IdItem", "dbo.Items");
            DropIndex("dbo.Tickets", new[] { "IdApplicationUser" });
            DropIndex("dbo.Tickets", new[] { "IdPricelistItem" });
            DropIndex("dbo.PricelistItems", new[] { "IdItem" });
            DropIndex("dbo.PricelistItems", new[] { "IdPricelist" });
            DropColumn("dbo.AspNetUsers", "UserType");
            DropColumn("dbo.AspNetUsers", "Activated");
            DropColumn("dbo.AspNetUsers", "Photo");
            DropColumn("dbo.AspNetUsers", "DateOfBirth");
            DropColumn("dbo.AspNetUsers", "Address");
            DropColumn("dbo.AspNetUsers", "LastName");
            DropColumn("dbo.AspNetUsers", "Name");
            DropTable("dbo.Tickets");
            DropTable("dbo.Pricelists");
            DropTable("dbo.PricelistItems");
            DropTable("dbo.Items");
            DropTable("dbo.Coefficients");
        }
    }
}
