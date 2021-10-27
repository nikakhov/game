import { useEffect, useState } from "react";
import { LetterDistribution } from "./LetterDistribution";
import { Square } from "./Square";
import { Dictionary } from "./Dictionary";
import { Points } from "./Points";

export const Boggle: React.FC = () => {
    const [boardState, setBoardState] = useState<string[][]>()
    const [selected, setSelected] = useState<number[][]>([]);
    const [points, setPoints]=useState<number>(0);
    const [submittedWords, setSubmittedWords]=useState<string[]>([]);
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
    function isAdjacent(adjacentTo: number[][], square: number[]) {
        return adjacentTo.some(element => {
            if (
                (square[0] === element[0] || square[0] === element[0] + 1 || square[0] === element[0] - 1) &&
                (square[1] === element[1] || square[1] === element[1] + 1 || square[1] === element[1] - 1)
            ) {
                return true;
            }
        })
    }

    const currentlySelectedWord=selected.map(index2D => boardState && boardState[index2D[0]][index2D[1]]).join('');
    /*Could be improved with binary search tree because the list is sorted*/
    const isInDictionary=Dictionary.indexOf(currentlySelectedWord)!==-1;
    const alreadySubmitted=submittedWords.indexOf(currentlySelectedWord)!==-1;
    return <>
        <p>Currently selected: {currentlySelectedWord}</p>
        <p>is {!isInDictionary && <b>not</b>} in dicionary</p>
        <p>{alreadySubmitted && <b>has already been submitted</b>}</p>
        <p>Points {points}</p>
        <p>Submitted words:<br/> {submittedWords.map(word=><>{word}<br/></>)}</p>
        {
            boardState && boardState.map((row, i) => {
                return <div>{row.map((letter, j) => {
                    return <Square letter={letter} selected={selected.findIndex(element => element[0] === i && element[1] === j)!==-1} onClick={() => {
                        if (selected.length===0) {
                            setSelected([[i, j]]);
                            return;
                        }
                        const index = selected.findIndex(element => element[0] === i && element[1] === j);
                        if (index === -1 && isAdjacent(selected, [i, j])) {
                            setSelected([...selected, [i, j]])
                        } else {
                                setSelected([...selected.slice(0, index), ...selected.slice(index + 1)])
                            }
                        }} />
                })}</div>
            }
            )
        }
        <button disabled={!isInDictionary || alreadySubmitted} onClick={()=>{
            const length=currentlySelectedWord.length>8? '8' : currentlySelectedWord.length;
            console.log("length", length);
            setPoints(points+Points[length]);
            setSubmittedWords([...submittedWords, currentlySelectedWord]);
            setSelected([]);
        }}> Submit </button>
    </>;
}