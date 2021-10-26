import { useEffect, useState } from "react";
import { LetterDistribution } from "./LetterDistribution";
import { Square } from "./Square";

export const Boggle: React.FC = () => {
    const [boardState, setBoardState] = useState<string[][]>()
    const [selected, setSelected]=useState<number[][]>([]);
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
    console.log(selected);
    return <>
    <p>Currently selected: {selected.map(index2D=>boardState && boardState[index2D[0]][ index2D[1]])}</p>
        {
            boardState && boardState.map((row, i) => {
                return <div>{row.map((letter, j) => {
                    return <Square letter={letter} onClick={()=>{
                        const index=selected.findIndex(element=>element[0]===i && element[1]===j);
                        if (index===-1) {
                            setSelected([...selected, [i,j]])
                        } else {
                            setSelected([...selected.slice(0, index), ...selected.slice(index+1)])
                        }
                    }}/>
                })}</div>
            }
            )
        }
    </>;
}