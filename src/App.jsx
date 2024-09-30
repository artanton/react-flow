import { useCallback, useState} from "react";
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
  useSaveNodeMutation,
  useSaveEdgeMutation,
  // useDeleteNodeMutation,
  // useDeleteEdgeMutation,
} from "./nodesAPI";

// import {CustomNode} from './assets/componetns/customNode'
const nodeTypes = {
  outPut: OutputNode,
  textUpdater: TextUpdaterNode,
};

function Flow() {
  const { data: nds} = useFetchNodesQuery();
  const { data: eds} = useFetchEdgesQuery();
  const [saveNode] = useSaveNodeMutation();
  const [saveEdge] = useSaveEdgeMutation();
  // const [deleteNode] = useDeleteNodeMutation();
  // const [deleteEdge] = useDeleteEdgeMutation();

  const [nodes, setNodes] = useState(nds);
  const [edges, setEdges] = useState(eds);
  

  const onNodesChange = useCallback(
   async (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
     
        setNodes(updatedNodes);  
        await saveNode(updatedNodes);
    },
    [nodes, saveNode]
  );
  const onEdgesChange = useCallback(
    async (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      
        setEdges(updatedEdges);
      await saveEdge(updatedEdges);
    },
    [edges, saveEdge]
  );
  const onConnect = useCallback(
    async (connection) => {
      const  newEdges = addEdge(connection, edges);
      setEdges(newEdges);
      saveEdge(newEdges);
    },
    [saveEdge, edges]
  );

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
      <button>Add node</button>
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
      <Background variant="lines" color="yellow" gap={50} size={1} />
    </div>
  );
}

export default Flow;
