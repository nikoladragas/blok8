namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LineMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Pricelists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        From = c.DateTime(nullable: false),
                        To = c.DateTime(nullable: false),
                        Active = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Pricelists");
            DropTable("dbo.Lines");
        }
    }
}
