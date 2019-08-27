export class Line{
    Id: number;
    LineName: string;
    LineType: string;
}

export class Departure{
    id: number;
    Departures: string;
    IdLine: number;
    IdTimetableActive: number;
}