import { useEffect, useState } from "react";
import { LetterDistribution } from "./LetterDistribution";
import { Square } from "./Square";
import { Dictionary } from "./Dictionary";
import { Points } from "./Points";

export const Board: React.FC = () => {
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
    function isAdjacent(adjacentTo: number[], square: number[]) {
        console.log(adjacentTo, square, 'adj')
            if (
                (square[0] === adjacentTo[0] || square[0] === adjacentTo[0] + 1 || square[0] === adjacentTo[0] - 1) &&
                (square[1] === adjacentTo[1] || square[1] === adjacentTo[1] + 1 || square[1] === adjacentTo[1] - 1)
            ) {
                return true;
            } else {
                return false;
            }
    }

    const currentlySelectedWord=selected.map(index2D => {
        const letter=boardState && boardState[index2D[0]][index2D[1]];
        if (letter==='Q'){
            return "QU";
        } else {
            return letter;
        }
    }).join('');
    /*Could be improved with binary search tree because the list is sorted*/
    const isInDictionary=Dictionary.indexOf(currentlySelectedWord)!==-1;
    const alreadySubmitted=submittedWords.indexOf(currentlySelectedWord)!==-1;
    return <>
        <p>Currently selected: {currentlySelectedWord}</p>
        <p>is {!isInDictionary && <b>not</b>} in dicionary</p>
        {
            boardState && boardState.map((row, i) => {
                return <div>{row.map((letter, j) => {
                    return <Square letter={letter} selected={selected.findIndex(element => element[0] === i && element[1] === j)!==-1} onClick={() => {
                        if (selected.length===0) {
                            setSelected([[i, j]]);
                            return;
                        }
                        const index = selected.findIndex(element => element[0] === i && element[1] === j);
                        if (index === -1 && isAdjacent(selected[selected.length-1], [i, j])) {
                            console.log(index, 'test')
                            setSelected([...selected, [i, j]])
                        }
                        if (index !== -1) {
                                setSelected([...selected.slice(0, index), ...selected.slice(index + 1)])
                            }
                        }} />
                })}</div>
            }
            )
        }
        <button disabled={alreadySubmitted} onClick={()=>{
            if (!isInDictionary) {
                setPoints(points-2);
            } else {
                const length=currentlySelectedWord.length>8? '8' : currentlySelectedWord.length;
                setPoints(points+Points[length]);
                setSubmittedWords([...submittedWords, currentlySelectedWord]);
            }
            setSelected([]);
        }}> Submit </button>
        <p>{alreadySubmitted && <b>has already been submitted</b>}</p>
        <p>Points {points}</p>
        <p>Submitted words:<br/> {submittedWords.map(word=><>{word}<br/></>)}</p>
    </>;
}