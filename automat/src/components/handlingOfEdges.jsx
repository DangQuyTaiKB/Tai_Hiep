import Accordion from 'react-bootstrap/Accordion'
import CloseButton from 'react-bootstrap/CloseButton'

const HandleEdges=(props)=>{
    const edges=props.edges;
    //!symbols cach nhau boi dau ',' do <StateTransitionTable>
    //o ham HandleEdgeChange, symbols la bat buoc, neu k xay ra loi o <StateTransitionTable>
    return(
        <>
            <b>2. Hrany:</b>
            
            <table className="table table-primary table-hover table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Znaky</th>
                        <th>[S,E]</th>
                        <th>Zmen</th>
                        <th>Vymaz</th>
                    </tr>
                </thead>
                <tbody>
                    {edges.map(edge=>(
                        <tr>
                            <td>{edge.id}</td>
                            <td>{edge.symbols}</td>
                            <td>[{edge.startId}, {edge.endId}]</td>
                            <td><input type="search" placeholder ="StartId EndId Znaky" onChange={(e)=>props.handleEdgeChange(edge.id,e.target.value)}/></td>
                            <td><CloseButton className="btn btn-primary btn-sm" onClick={()=>props.onRemoveEdge(edge.id)}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <label>Nová Hrana: 
                <input type="search" placeholder ="StartId EndId Znaky" name = "Nova Hrana" onChange={(e)=>props.handleNewEdge(e.target.value)}/>
            </label>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Poznámky</Accordion.Header>
                    <Accordion.Body>
                    <em>- Znaky jsou oddeleny carkami</em>
                    <br/>
                    <em>- Hrana není vytvořená, když startId nebo endId neexistuje.</em>
                    <br/>
                    <em>- Pokud upravíme hranu, kde již existuje dvojice čísel [S, E], změna nejde</em>
                    <br/>
                    <em>- Pokud vytvoříme hranu, která [S, E] odpovídá stávající hraně, nahradí starou hranu.</em>
                    <br/>
                    <em>- Znak můžeme použít, i když nebyl deklarován v sekci 3. znaky, ale to nedoporučuji.</em>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
           
        </>
    );
}
export default HandleEdges

