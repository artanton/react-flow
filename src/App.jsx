import { useCallback, useEffect, useState } from "react";
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
  useSaveNodesMutation,
  useSaveEdgeMutation,
  useUpdateNodesMutation,
  // useUpdateEdgeMutation,
  useDeleteNodeMutation,
  useDeleteEdgeMutation,
} from "./nodesAPI";
import Notiflix from "notiflix";
import { nanoid } from "@reduxjs/toolkit";
import { EdgeLabel } from "./edgeLabel";
// import { debounce } from "lodash";

// import {CustomNode} from './assets/componetns/customNode'
const nodeTypes = {
  outPut: OutputNode,
  textUpdater: TextUpdaterNode,
};

function Flow() {
  const { data: nds, refetch: refetchNodes } = useFetchNodesQuery();
  const { data: eds, refetch: refetchEdges } = useFetchEdgesQuery();
  const [saveNodes] = useSaveNodesMutation();
  const [saveEdge] = useSaveEdgeMutation();
  const [updateNodes] = useUpdateNodesMutation();
  //  const [updateEdge] =useUpdateEdgeMutation ();
  const [deleteNode] = useDeleteNodeMutation();
  const [deleteEdge] = useDeleteEdgeMutation();

  const [nodes, setNodes] = useState(nds);
  const [edges, setEdges] = useState(eds);

  useEffect(() => {
    if (nds) setNodes(nds);
    if (eds) setEdges(eds);
  }, [nds, eds]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const newNodePosition = () => {
    if (!nodes[0]) {
      return { x: 200, y: 200 };
    }
    return {
      x: nodes[0].position.x + 20 * nodes.length,
      y: nodes[0].position.y,
    };
  };

  const handleAddNodes = async () => {
    const newNode = {
      id: nanoid(),
      position: newNodePosition(),
      data: { label: `Node ${nodes.length + 1}` },
      type: "textUpdater",
      selected: false,
      dragging: false,
    };
    // setNodes((nodes) => [...nodes, newNode]);
    try {
      await saveNodes(newNode);
    } catch (error) {
      Notiflix.Notify.failure(error?.messege || "Something went wrong");
    } finally {
      refetchNodes();
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await Promise.all(
        nds
          .filter((nd) => !nodes.find((node) => node.id === nd.id))
          .map((nd) => deleteNode(nd.id))
      );

      await Promise.all(
        eds
          .filter((ed) => !edges.find((edge) => edge.id === ed.id))
          .map((ed) => deleteEdge(ed.id))
      );

      await Promise.all(
        nodes.map(async (node) => {
          const comparedNd = nds.find((nd) => nd.id === node.id);
          if (
            comparedNd.position !== node.position ||
            comparedNd.data.label !== node.data.label
          ) {
            return updateNodes({
              id: node.id,
              position: node.position,
              // data:{ lalel:node.data.label}
            });
          }
        })
      );

      await Promise.all(
        edges
          .filter((edge) => 
            
            !eds.find((ed) => ed.id === edge.id))
          .map(async (edge) => {
           
              const newEdge = {
              id: nanoid(),
              label: EdgeLabel(nodes, edge),
              source: `${edge.source}`,
              target: `${edge.target}`,
              sourceHandle: `${edge.sourceHandle || undefined}`,
              targetHandle: `${edge.targetHandle || undefined}`,
              animated: false,
              type: "step",
            };
            await saveEdge(newEdge);
           ;
          })
      );

      
    } catch (error) {
      Notiflix.Notify.failure(error.data.messege || "Something went wrong");
    }finally{
      refetchNodes();
      refetchEdges();}
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={handleAddNodes}>Add Node</button>
      <button onClick={onSubmit}>Save</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        deleteKeyCode={["Delete"]}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
      <Controls />
      {/* <CustomNode/> */}
      <Background variant="dots" color="black" gap={20} size={1} />
    </div>
  );
}

export default Flow;