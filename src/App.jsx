import { useCallback} from "react";
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

  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => {
      const updateNodes = applyNodeChanges(changes, nds);
      saveNode(updateNodes);
    },
    [nds, saveNode]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      const updateEdges = applyEdgeChanges(changes, eds);
      saveEdge(updateEdges);
    },
    [eds, saveEdge]
  );
  const onConnect = useCallback(
    (connection) => {
      const  newEdges = addEdge(connection, eds);
      saveEdge(newEdges);
    },
    [saveEdge, eds]
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
        nodes={nds}
        edges={eds}
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
