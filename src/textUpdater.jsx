import { memo, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

import { TextUpdaterLabel, TextNode } from './nodeStyled';
import { useUpdateNodesMutation } from './nodesAPI';

const leftStyle = { left: 10 };
const rightStyle = { left: 170 };



function TextUpdaterNode() {
  const [updateNodes]= useUpdateNodesMutation();
  const onChange = useCallback((evt) => {
    updateNodes(evt.target.value);
  }, [updateNodes]);

  return (
    <TextNode>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={leftStyle}
        
      />
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        style={rightStyle}
        
      />
      <div>
        <TextUpdaterLabel htmlFor="text">Text:</TextUpdaterLabel>
        <input id="text" name="text" onBlur={onChange}  />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        style={leftStyle}
        
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="d"
        style={rightStyle}
        
      />
    </TextNode>
  );
}

export default memo(TextUpdaterNode);