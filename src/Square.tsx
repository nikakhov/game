export const Square: React.FC<{ letter: string, onClick: ()=>void, selected: boolean }> = (props) => {
    return <div onClick={props.onClick} style={{
        display: 'inline-block',
        border: '1px solid black',
        width: '25px',
        height: '25px',
        fontSize: '20px',
        backgroundColor: props.selected ? "gray" : undefined
    }}>
        {props.letter}
    </div>;
}