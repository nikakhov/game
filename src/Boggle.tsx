import React, { useRef, useState } from "react"
import { Board } from "./Board"

export const Boggle: React.FC = () => {
    const [time, setTime] = useState(10);
    return time ===10 ? (
        <button onClick={() => {
            setTime(9);
        }
        }>Start</button>
    ) : (<>
        Time: {time}
        <Board />
    </>
        );
}