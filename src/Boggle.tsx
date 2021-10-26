import { useEffect, useState } from "react";
import { LetterDistribution } from "./LetterDistribution";
import { Square } from "./Square";

export const Boggle: React.FC = () => {
    const [boardState, setBoardState] = useState<string[][]>()

    useEffect(() => {
        const board = [];
        const size = 5;
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const die = LetterDistribution.splice(Math.floor(Math.random() * LetterDistribution.length), 1)[0];
                const character = die?.charAt(Math.floor(Math.random() * 6));
                row.push(character);
            }
            board.push(row);
        }
        console.log(board);
        setBoardState(board);
    }, []);
    return <>
        {
            boardState && boardState.map(row => {
                return <div>{row.map(letter => {
                    console.log(letter);
                    return <Square letter={letter} />
                })}</div>
            }
            )
        }
    </>;
}