namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TimetableStationLineMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Days",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        dayType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LineName = c.String(),
                        LineType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.StationLines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IdStation = c.Int(nullable: false),
                        IdLine = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.IdLine, cascadeDelete: true)
                .ForeignKey("dbo.Stations", t => t.IdStation, cascadeDelete: true)
                .Index(t => t.IdStation)
                .Index(t => t.IdLine);
            
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
                "dbo.TimetableActives",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Start = c.DateTime(),
                        End = c.DateTime(),
                        Active = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Timetables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Departures = c.String(),
                        IdLine = c.Int(nullable: false),
                        IdDay = c.Int(nullable: false),
                        IdTimetableActive = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Days", t => t.IdDay, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.IdLine, cascadeDelete: true)
                .ForeignKey("dbo.TimetableActives", t => t.IdTimetableActive, cascadeDelete: true)
                .Index(t => t.IdLine)
                .Index(t => t.IdDay)
                .Index(t => t.IdTimetableActive);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Timetables", "IdTimetableActive", "dbo.TimetableActives");
            DropForeignKey("dbo.Timetables", "IdLine", "dbo.Lines");
            DropForeignKey("dbo.Timetables", "IdDay", "dbo.Days");
            DropForeignKey("dbo.StationLines", "IdStation", "dbo.Stations");
            DropForeignKey("dbo.StationLines", "IdLine", "dbo.Lines");
            DropIndex("dbo.Timetables", new[] { "IdTimetableActive" });
            DropIndex("dbo.Timetables", new[] { "IdDay" });
            DropIndex("dbo.Timetables", new[] { "IdLine" });
            DropIndex("dbo.StationLines", new[] { "IdLine" });
            DropIndex("dbo.StationLines", new[] { "IdStation" });
            DropTable("dbo.Timetables");
            DropTable("dbo.TimetableActives");
            DropTable("dbo.Stations");
            DropTable("dbo.StationLines");
            DropTable("dbo.Lines");
            DropTable("dbo.Days");
        }
    }
}
