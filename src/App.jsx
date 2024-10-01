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
  // useSaveNodeMutation,
  useSaveEdgeMutation,
  useUpdateNodeMutation,
  useUpdateEdgeMutation,
  // useDeleteNodeMutation,
  // useDeleteEdgeMutation,
} from "./nodesAPI";

// import {CustomNode} from './assets/componetns/customNode'
const nodeTypes = {
  outPut: OutputNode,
  textUpdater: TextUpdaterNode,
};

function Flow() {
  const { data: nds } = useFetchNodesQuery();
  const { data: eds } = useFetchEdgesQuery();
  // const [saveNode] = useSaveNodeMutation();
  const [saveEdge] = useSaveEdgeMutation();
 const [updateNode]= useUpdateNodeMutation();
 const [updateEdge] =useUpdateEdgeMutation ();
  // const [deleteNode] = useDeleteNodeMutation();
  // const [deleteEdge] = useDeleteEdgeMutation();

  const [nodes, setNodes] = useState(nds);
  const [edges, setEdges] = useState(eds);

  useEffect(() => {
    if (nds) setNodes(nds);
    if (eds) setEdges(eds);
  }, [nds, eds]);



  const onNodesChange = useCallback(
    async (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);

      setNodes(updatedNodes);
      // await updateNode(updatedNodes);
      for (const node of updatedNodes) {
        await updateNode({ id: node.id, position: node.position, data: node.data });
    }},
    [nodes, updateNode]
  );
  const onEdgesChange = useCallback(
    async (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      setEdges(updatedEdges);
      await updateEdge(updatedEdges);
    },
    [edges, updateEdge]
  );
  const onConnect = useCallback(
    async (connection) => {
      const newEdges = addEdge(connection, edges);
      setEdges(newEdges);
      await saveEdge(newEdges);
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
      {/* <button>Add node</button> */}
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


