export const EdgeLabel=(nodes,edge)=>{
   
    const sourceLabel = nodes.find((node)=>node.id===edge.source).data.label;    
    const targetLabel = nodes.find((node)=>node.id===edge.target).data.label;
   return `${sourceLabel} to ${targetLabel}`;
}