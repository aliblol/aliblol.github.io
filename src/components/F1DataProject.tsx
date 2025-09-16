import React, { useState, useEffect } from "react";
import P5Wrapper from "./P5Wrapper";

const F1DataProject: React.FC = () => {
    const [raceData, setRaceData] = useState<RaceData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRaceData = async () => {
            try {
                const response = await fetch(
                    // "/api/race-data/2024/Bahrain/R"
                    'https://ergast.com/api/f1/2024/1/results.json'
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: RaceData = await response.json();
                setRaceData(data);
            } catch (error) {
                console.error("Error fetching race data:", error);
                setError((error as Error).message);
            }
        };

        fetchRaceData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!raceData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{raceData.race}</h1>
            <P5Wrapper raceData={raceData} />
            {/* <p>Number of Laps: {raceData.laps}</p>
            <h2>Drivers</h2>
            <ul>
                {raceData.drivers.map((driver, index) => (
                    <li key={index}>
                        <h3>{driver.name}</h3>
                        <p>Lap Times: {driver.lapTimes.join(", ")}</p>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default F1DataProject;
