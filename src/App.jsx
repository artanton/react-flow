import {
   useCallback,
  useEffect,
    useState } from "react";
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  Background,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// import initialNodes from "./nodes.json";
// import initialEdges from "./edges.json";

import OutputNode from "./nodeOutput";
import TextUpdaterNode from "./textUpdater";
import {
  useFetchNodesQuery,
  useFetchEdgesQuery,
  // useSaveNodesMutation,
  // useSaveEdgeMutation,
  useUpdateNodesMutation,
  // useUpdateEdgeMutation,
  // useDeleteNodeMutation,
  // useDeleteEdgeMutation,
} from "./nodesAPI";
// import { debounce } from "lodash";

// import {CustomNode} from './assets/componetns/customNode'
const nodeTypes = {
  outPut: OutputNode,
  textUpdater: TextUpdaterNode,
};

function Flow() {
  const { data: nds } = useFetchNodesQuery();
  const { data: eds } = useFetchEdgesQuery();
  // const [saveNodes] = useSaveNodesMutation();
//   const [saveEdge] = useSaveEdgeMutation();
 const [updateNodes]= useUpdateNodesMutation();
//  const [updateEdge] =useUpdateEdgeMutation ();
  // const [deleteNode] = useDeleteNodeMutation();
  // const [deleteEdge] = useDeleteEdgeMutation();

  const [nodes, setNodes] = useState(nds);
  const [edges, setEdges] = useState(eds);


  useEffect(() => {
    if (nds) setNodes(nds);
    if (eds) setEdges(eds);
  }, [nds, eds]);

  // const updateNodeDebounced = 
  //   debounce(async (updatedNodes) => {
  //     await updateNode(updatedNodes);
  //   }, 1000
  // );



  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

 
  console.log("nds:",nds);
  console.log("nodse:", nodes);
  console.log("eds:", eds);
  // updateNode({ id: node.id, position: node.position, data: node.data })

  const onSubmit = async(e)=>{  
    
    e.preventDefault()
    try {
     nodes.forEach((node)=>  updateNodes({ id: node.id, patch:{position: node.position, data: node.data} }))
      
    } catch (error) {
      console.log(error.messege);
    }
  }

  // const handleAddNodes = () => {
  //   const newNode = {
  //     id: `${nodes.length + 1}`,
  //     position: { x: Math.random() * 200, y: Math.random() * 200 },
  //     data: { label: `Node ${nodes.length + 1}` },
  //   };
  //   setNodes((nds) => addNodes(newNode, nds));
  // };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={onSubmit} >Save</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
      <Controls />
      {/* <CustomNode/> */}
      <Background variant="dots" color="yellow" gap={10} size={1} />
    </div>
  );
}

export default Flow;


