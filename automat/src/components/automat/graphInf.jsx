const GraphInf=(props)=>{
    const points=props.points;
    const names=props.names;
    const symbols=props.symbols;
    const width=props.width;

    const x=810
    let y=50;
    const distance=20;
    return (
        <>
            <text x={x} y={y} fill="red">Automat: {names.automat}</text>
            {y+=distance}
            {points.map(point=>{
                y+=distance;
                return <text x={x} y={y} fill="red">{point.label} {point.state} : {point.meaning}</text>
            })}
            {y+=distance}
            {symbols.map(symbol=>{
                y+=distance;
                return <text x={x} y={y} fill="red">Symbol {symbol.name}: {symbol.label}</text>
            })}
            <line x1={x-10} y1={0} x2={x-10} y2={y+10} stroke="black" strokeWidth="2"></line>
            <line x1={x-10} y1={y+10} x2={width} y2={y+10} stroke="black" strokeWidth="2"></line>
        </>
    );
}
export default GraphInf