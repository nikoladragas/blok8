namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdminTransactionsMigration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Pricelists", "Version", c => c.Long(nullable: false));
            AddColumn("dbo.Timetables", "Version", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Timetables", "Version");
            DropColumn("dbo.Pricelists", "Version");
        }
    }
}
