import React, {useState} from 'react';

import Graph from './graph'
import HandlePoints from './handlingOfPoints'
import HandleEdges from './handlingOfEdges'

function Automat(){
    const initialData={
        'points':[
            {'id':0,'x':300,'y':400, 'state':'A'},
            {'id':1,'x':600,'y':400, 'state':'B'},
            {'id':2,'x':600,'y':100, 'state':'C'},
            {'id':3,'x':300,'y':100, 'state':'D'},
        ],
        'dataOfEdges':[
            {'id': 0,'startId':0,'endId':1,'symbols':'a'},
            {'id':1,'startId':1,'endId':2,'symbols':'b'}
        ]
    };
    const [graphData,setGraphData]=useState(initialData);
    const [textSVG, setTextSVG]=useState(initialData);

    const OnRemovePoint= (removedId)=>{
        const newGraph={
            'points': graphData.points.filter(point=>(point.id!==removedId)),
            'dataOfEdges': graphData.dataOfEdges.filter(dataOfEdge=>((dataOfEdge.startId!==removedId)&&(dataOfEdge.endId!==removedId)))
        }
        setGraphData(newGraph);
    }
    const HandleNewPoint=()=>{
        const id=graphData.points[graphData.points.length-1].id+1;
        const px=200;
        const py=200;
        const newPoint={'id':id,'x':px,'y':py,'state':""};
        const newGraph={
            'points':[...graphData.points,newPoint],
            'dataOfEdges':[...graphData.dataOfEdges]
        };
        setGraphData(newGraph);
    }
    const HandlePointChange=(pointId, input)=>{
        //Pripadu, ze index,py,px udavajici prazdnych retezcu, neprijimame
        const px=(input.split(" ")[0]!=="")?Number(input.split(" ")[0]):-1;
        const py=(input.split(" ")[1]!=="")?Number(input.split(" ")[1]):-1;
        //Pokud jeste neexistuje-li druhy, treti prvek po split
        //pak, ze px,py udavajici NaN
        //Nasledujici podminky resi vsechny tyto problemy
        if(px>=0 && py>=0 && px<1000 && py<600){
            const state=input.split(" ")[2];
            const newPoint={'id':pointId,'x':px,'y':py,'state':state};
            const newGraph={
                'points':[...graphData.points],
                'dataOfEdges':[...graphData.dataOfEdges]
            };
            for(let i=0;i<newGraph.points.length;i++){
                if(pointId===newGraph.points[i].id){
                    newGraph.points[i]=newPoint;
                }
            }
            setGraphData(newGraph);
        }
    }
    
    const OnRemoveEdge=(startId,endId)=>{
        const newGraph={
            'points':[...graphData.points],
            'dataOfEdges':graphData.dataOfEdges.filter(dataOfEdge=>((dataOfEdge.startId!==startId)||(dataOfEdge.endId!==endId)))
        }
        setGraphData(newGraph);
    }
    const HandleNewEdge=(input)=>{
        const id=(input.split(" ")[0]!=="")?Number(input.split(" ")[0]):-1;
        const startPointIndex= (input.split(" ")[1]!=="")?Number(input.split(" ")[1]):-1;
        const endPointIndex= (input.split(" ")[2]!=="")?Number(input.split(" ")[2]):-1;
        
        if(startPointIndex>=0&&endPointIndex>=0){
            let isExistedEdge=false;
            
            for(let i=0;i<graphData.dataOfEdges.length;i++){
                if(id===graphData.dataOfEdges[i].id){
                    isExistedEdge=true;
                }
                if(startPointIndex===graphData.dataOfEdges[i].startId&&endPointIndex===graphData.dataOfEdges[i].endId){
                    isExistedEdge=true;
                }
            }
            if(!isExistedEdge){
                const signaly=input.split(" ")[3];
                const newEdge={'id':id,'startId': startPointIndex,'endId':endPointIndex,'symbols':signaly};
                const newGraph={
                    'points':[...graphData.points],
                    'dataOfEdges':[...graphData.dataOfEdges,newEdge]
                };
                setGraphData(newGraph);
            }
        }
    }
    const HandleEdgeChange=(edgeId, input)=>{
        const startPointIndex= (input.split(" ")[0]!=="")?Number(input.split(" ")[0]):-1;
        const endPointIndex= (input.split(" ")[1]!=="")?Number(input.split(" ")[1]):-1;
        
        if(startPointIndex>=0&&endPointIndex>=0){
            const signaly=input.split(" ")[2];
            const newEdge={'id':edgeId,'startId': startPointIndex,'endId':endPointIndex,'symbols':signaly};
            const newGraph={
                'points':[...graphData.points],
                'dataOfEdges':[...graphData.dataOfEdges]
            };
            for(let i=0;i<newGraph.dataOfEdges.length;i++){
                if(edgeId===newGraph.dataOfEdges[i].id){
                    newGraph.dataOfEdges[i]=newEdge;
                }
            }
            setGraphData(newGraph);
        }
    }

    function exportSVG(e){
        console.log(document.getElementById("svg"));
        setTextSVG(document.getElementById("svg").innerHTML)
    }

    function importSVG(){
        // document.getElementById("svg").innerHTML = document.getElementById("text-svg").value;
    }

    return(
        <>
            <div className="container-fluid p-2 bg-primary text-white">
                <h1 className="text-center">My Automat Graph Editor</h1>
            </div>
            <div className ="row">
                <div className="col">
                    <br/>
                    <b>Vrcholy:</b>
                    <HandlePoints 
                        points={graphData.points} 
                        handlePointChange={HandlePointChange}
                        onRemovePoint={OnRemovePoint}
                        handleNewPoint={HandleNewPoint}
                    />
                    <br/>
                    <b>Hrany:</b>
                    <HandleEdges 
                        dataOfEdges= {graphData.dataOfEdges}
                        handleEdgeChange={HandleEdgeChange} 
                        onRemoveEdge={OnRemoveEdge}
                        handleNewEdge={HandleNewEdge}
                    />
                </div>
                <div className="col" id ="svg">
                    <Graph id="automat" graphData={graphData}/>
                </div>
                <button onClick={exportSVG}>Export svg</button>
                <button onClick={importSVG}>Import svg</button>
                <textarea name="" id="text-svg" cols="30" rows="10" value={textSVG} onChange={e => {setTextSVG(e.target.value)}}></textarea>
            </div>
        </>
    );
}

export default Automat