import React, { useRef, useEffect } from "react";
import p5 from "p5";

interface P5WrapperProps {
    raceData: RaceData;
}

const P5Wrapper: React.FC<P5WrapperProps> = ({ raceData }) => {
    const sketchRef = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
        const sketch = (p: p5) => {
            p.setup = () => {
                p.createCanvas(1200, 800);
                p.background(255);
            };

            p.draw = () => {
                p.background(255);
                p.fill(0);
                p.textSize(16);
                p.text(`Race: ${raceData.race}`, 10, 20);
                p.text(`Laps: ${raceData.laps}`, 10, 40);

                // Define colors for drivers
                const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF'];

                const drivers = raceData.drivers;
                const maxLapTime = Math.max(...drivers.flatMap(driver => driver.lapTimes.map(lapTime => lapTime ?? 0)));
                const minLapTime = Math.min(...drivers.flatMap(driver => driver.lapTimes.map(lapTime => lapTime ?? 0)));

                // Plot each driver's lap times
                drivers.forEach((driver, index) => {
                    p.stroke(colors[index % colors.length]);  // Assign each driver a unique color
                    p.noFill();

                    p.beginShape();
                    driver.lapTimes.forEach((lapTime, lapIndex) => {
                        const x = p.map(lapIndex, 0, raceData.laps, 50, 750);
                        const y = p.map(lapTime ?? 0, minLapTime, maxLapTime, 350, 50);  // Scale lap time to canvas
                        p.vertex(x, y);
                    });
                    p.endShape();

                    // Display driver name
                    p.fill(0);
                    p.text(driver.name, 760, 50 + 20 * index);
                });
            };
        };

        const p5Instance = new p5(sketch, sketchRef.current!);

        return () => {
            p5Instance.remove();
        };
    }, [raceData]);

    return <div ref={sketchRef}></div>;
};

export default P5Wrapper;