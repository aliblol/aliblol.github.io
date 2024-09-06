interface Driver {
    name: string;
    lapTimes: (number | null)[];
}

interface RaceData {
    race: string;
    laps: number;
    drivers: Driver[];
}