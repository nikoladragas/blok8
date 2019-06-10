namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CoeffContrItemMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Coefficients",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TravellerType = c.Int(nullable: false),
                        CoefficientValue = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Controllers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        RepeatPassword = c.String(),
                        BirthDate = c.DateTime(nullable: false),
                        Address = c.String(),
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
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Items");
            DropTable("dbo.Controllers");
            DropTable("dbo.Coefficients");
        }
    }
}
