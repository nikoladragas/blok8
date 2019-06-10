namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedContexts : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Admins",
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PricelistItems", "PricelistId", "dbo.Pricelists");
            DropForeignKey("dbo.PricelistItems", "ItemId", "dbo.Items");
            DropIndex("dbo.PricelistItems", new[] { "ItemId" });
            DropIndex("dbo.PricelistItems", new[] { "PricelistId" });
            DropTable("dbo.PricelistItems");
            DropTable("dbo.Admins");
        }
    }
}
