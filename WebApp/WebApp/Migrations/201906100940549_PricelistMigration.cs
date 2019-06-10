namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PricelistMigration : DbMigration
    {
        public override void Up()
        {
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
            
            CreateTable(
                "dbo.Travellers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TravellerType = c.Int(nullable: false),
                        Photo = c.String(),
                        Name = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        RepeatPassword = c.String(),
                        BirthDate = c.DateTime(nullable: false),
                        Address = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Travellers");
            DropTable("dbo.Stations");
        }
    }
}
