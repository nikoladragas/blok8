export class Line{
    Id: number;
    LineName: string;
    LineType: string;
}

export class Departure{
    Id: number;
    Departures: string;
    IdLine: number;
    IdTimetableActive: number;
}

export class Station{
    Id: number;
    Name: string;
    Address: string;
    XCoordinate: number;
    YCoordinate: number;
    Exist: boolean = false;
}