export const Square: React.FC<{letter:string}> = (props) => {
    return <div style={{display:'inline-block', border: '1px solid black', width: '25px', height: '25px', fontSize:'20px'}}>{props.letter}</div>;
}